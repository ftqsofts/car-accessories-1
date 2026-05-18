import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL   = "https://rrtuzqjbgxouwzserwjp.supabase.co/rest/v1"
const SUPABASE_KEY   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydHV6cWpiZ3hvdXd6c2Vyd2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTc3MjUsImV4cCI6MjA5MzY3MzcyNX0.P2U5ruvLYFbKfv10s27lFT0afhVdrnMRBTFmkWNn7G8"
const SALEURA_URL    = "https://api.saleura.com/v1/webhooks/orders/biz_knfejjdd/UG9dW1w4a9v7VPilXqzl4ACghmZT5krZS9T4KEQElugH6hXp"
const SB_HEADERS     = { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" }

export async function GET(req: NextRequest) {
  // Only allow Vercel cron or requests with the correct authorization header
  const isVercelCron = req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`
  const isExternalCron = req.headers.get("x-cron-key") === "1cbc0d6db60bd3a894d934f6da2e9570"
  if (!isVercelCron && !isExternalCron) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  // Fetch drafts older than 5 minutes
  const cutoff = new Date(Date.now() - 5 * 60 * 1000).toISOString()
  const res = await fetch(
    `${SUPABASE_URL}/drafts?updated_at=lt.${cutoff}&select=*`,
    { headers: SB_HEADERS }
  ).catch(() => null)

  if (!res?.ok) {
    return NextResponse.json({ ok: false, error: "failed to fetch drafts" }, { status: 500 })
  }


  const drafts: Array<{
    id: number
    phone: string
    full_name: string
    address: string
    sku: string
    qte: number
    price: number
  }> = await res.json()

  if (!drafts.length) {
    return NextResponse.json({ ok: true, sent: 0, message: "no pending drafts" })
  }

  // Fetch phones that already placed a real order — skip those drafts
  const ordersRes = await fetch(
    `${SUPABASE_URL}/orders?select=phone`,
    { headers: SB_HEADERS }
  ).catch(() => null)
  const orders: Array<{ phone: string }> = ordersRes?.ok ? await ordersRes.json() : []
  const orderedPhones = new Set(orders.map(o => o.phone.trim()))

  let sent = 0
  let failed = 0

  await Promise.all(drafts.map(async (draft) => {
    // skip if this phone already has a confirmed order
    if (orderedPhones.has(draft.phone.trim())) {
      await fetch(`${SUPABASE_URL}/drafts?id=eq.${draft.id}`, {
        method: "DELETE",
        headers: SB_HEADERS,
      }).catch(() => null)
      return
    }

    const saleuraRes = await fetch(SALEURA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: draft.phone,
        recipient: draft.full_name?.trim() || "client",
        address: draft.address ?? "-",
        city: draft.address ?? "-",
        cod: draft.price,
        allow_duplicated_orders: false,
        products: String(draft.sku).split(",").map((entry: string) => {
          const [sku, q] = entry.trim().split(":")
          return { sku: sku.trim(), quantity: q ? parseInt(q) : (draft.qte ?? 1) }
        }),
      }),
    }).catch(() => null)

    if (saleuraRes?.ok) {
      // Delete draft on success
      await fetch(`${SUPABASE_URL}/drafts?id=eq.${draft.id}`, {
        method: "DELETE",
        headers: SB_HEADERS,
      }).catch(() => null)
      sent++
    } else {
      failed++
    }
  }))

  return NextResponse.json({ ok: true, sent, failed, total: drafts.length })
}