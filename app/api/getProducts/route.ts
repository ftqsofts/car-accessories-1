import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  const { name } = await req.json()

  if (!name?.trim() || name.trim().toLowerCase() === "client") {
    return NextResponse.json({ gender: "unknown" })
  }

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: `Is the Moroccan name "${name.trim()}" male or female? Reply with only one word: male, female, or unknown.`,
        },
      ],
    })

    const text = res.choices[0]?.message?.content?.trim().toLowerCase() ?? ""
    const gender = text === "female" ? "female" : text === "male" ? "male" : "unknown"

    return NextResponse.json({ gender })
  } catch {
    return NextResponse.json({ gender: "unknown" })
  }
}
