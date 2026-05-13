import { after, NextRequest, NextResponse } from "next/server"

// const SHEETDB_URL  = "https://sheetdb.io/api/v1/qcu9zy4i090fj"
const SUPABASE_URL   = "https://rrtuzqjbgxouwzserwjp.supabase.co/rest/v1/orders"
const SUPABASE_DRAFT = "https://rrtuzqjbgxouwzserwjp.supabase.co/rest/v1/drafts"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydHV6cWpiZ3hvdXd6c2Vyd2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTc3MjUsImV4cCI6MjA5MzY3MzcyNX0.P2U5ruvLYFbKfv10s27lFT0afhVdrnMRBTFmkWNn7G8"
const SALEURA_URL  = "https://api.saleura.com/v1/webhooks/orders/biz_knfejjdd/UG9dW1w4a9v7VPilXqzl4ACghmZT5krZS9T4KEQElugH6hXp"

// In-memory IP rate limit — max 3 orders per IP
const ipCount = new Map<string, number>()

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  const count = ipCount.get(ip) ?? 0
  if (count >= 3) {
    // return NextResponse.json({ ok: false, error: "limit" }, { status: 429 })
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

  // ── Save to Supabase (primary backup) ──
  fetch(SUPABASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(order),
  }).catch((err) => console.error("[order] Supabase error:", err))

  // ── Also send to SheetDB ──
  // fetch(SHEETDB_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     data: [{ ...order, note: "", delivery_note: "" }]
  //   }),
  // }).catch((err) => console.error("[order] SheetDB error:", err))

  // ── Send to Saleura after response, then delete draft on success ──
  after(async () => {
    const res = await fetch(SALEURA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone.trim(),
        recipient: name ?? "",
        address: city ?? "",
        city: city ?? "",
        cod: total,
        products: String(skus).split(",").map((entry: string) => {
          const [sku, q] = entry.trim().split(":")
          return { sku: sku.trim(), quantity: q ? parseInt(q) : (qty ?? 1) }
        }),
      }),
    }).catch((err) => { console.error("[order] Saleura error:", err); return null })

    // remove draft if order was sent to Saleura successfully
    if (res?.ok) {
      await fetch(`${SUPABASE_DRAFT}?phone=eq.${encodeURIComponent(phone.trim())}`, {
        method: "DELETE",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        },
      }).catch((err) => console.error("[order] draft cleanup error:", err))
    }
  })

  return NextResponse.json({ ok: true })
}
