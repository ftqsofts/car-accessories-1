import { NextRequest, NextResponse } from "next/server"
import { appendFileSync, mkdirSync } from "fs"
import { join } from "path"

const SHEETDB_URL = "https://sheetdb.io/api/v1/qcu9zy4i090fj"
const ORDERS_FILE = join(process.cwd(), "data", "orders.jsonl")

function saveOrderLocally(order: Record<string, unknown>) {
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true })
    appendFileSync(ORDERS_FILE, JSON.stringify(order) + "\n", "utf8")
  } catch (err) {
    console.error("[order] local save error:", err)
  }
}

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

  const order = {
    date_order: now,
    full_name: name ?? "",
    phone: phone.trim(),
    address: city ?? "",
    sku: skus,
    qte: qty,
    price: total,
  }

  saveOrderLocally(order)

  try {
    const res = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{ ...order, note: "", delivery_note: "" }]
      }),
    })
    const body = await res.text()
    saveOrderLocally({ _sheetdb_status: res.status, _sheetdb_response: body, _for_phone: phone.trim() })
  } catch (err) {
    saveOrderLocally({ _sheetdb_error: String(err), _for_phone: phone.trim() })
    console.error("[order] SheetDB error:", err)
  }

  return NextResponse.json({ ok: true })
}
