import { NextRequest, NextResponse } from "next/server"

const SHEETDB_URL = "https://sheetdb.io/api/v1/qcu9zy4i090fj"

// In-memory IP rate limit — max 3 orders per IP
const ipCount = new Map<string, number>()

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  const count = ipCount.get(ip) ?? 0
  if (count >= 3) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 })
  }
  ipCount.set(ip, count + 1)

  const { name, phone, city, skus, qty, total } = await req.json()

  if (!phone?.trim()) {
    return NextResponse.json({ ok: false, error: "phone required" }, { status: 400 })
  }

  const now = new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })

  try {
    await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          date_order: now,
          full_name: name ?? "",
          phone: phone.trim(),
          address: city ?? "",
          sku: skus,
          qte: qty,
          price: total,
          note: "",
          delivery_note: "",
        }]
      }),
    })
  } catch (err) {
    console.error("[order] SheetDB error:", err)
  }

  return NextResponse.json({ ok: true })
}
