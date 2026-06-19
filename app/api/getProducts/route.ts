import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const MAX_REQUESTS_PER_DAY = 5
const WINDOW_MS = 24 * 60 * 60 * 1000

// In-memory IP rate limit — max 5 requests per IP per 24h
const ipHits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (hits.length >= MAX_REQUESTS_PER_DAY) {
    ipHits.set(ip, hits)
    return true
  }
  hits.push(now)
  ipHits.set(ip, hits)
  return false
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ gender: "unknown", reason: "rate_limited" }, { status: 429 })
  }

  const { name } = await req.json()

  if (!name?.trim() || name.trim().toLowerCase() === "client") {
    return NextResponse.json({ gender: "unknown" })
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ gender: "unknown", reason: "no_api_key" })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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
  } catch (err) {
    return NextResponse.json({ gender: "unknown", reason: "error", error: String(err) })
  }
}
