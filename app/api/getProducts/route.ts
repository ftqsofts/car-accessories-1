import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { name, niche } = await req.json()

  if (!name?.trim() || name.trim().toLowerCase() === "client") {
    return NextResponse.json({ gender: "unknown" })
  }

  try {
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: `Is the Moroccan name "${name.trim()}" male or female? Reply with only one word: male, female, or unknown.`,
        },
      ],
    })

    const gender = (msg.content[0] as { text: string }).text.trim().toLowerCase()
    const normalized = gender === "female" ? "female" : gender === "male" ? "male" : "unknown"

    return NextResponse.json({ gender: normalized, niche })
  } catch {
    return NextResponse.json({ gender: "unknown" })
  }
}
