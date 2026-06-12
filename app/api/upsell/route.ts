import { NextRequest, NextResponse } from "next/server"

const SALEURA_URL = "https://api.saleura.com/v1/webhooks/orders/biz_knfejjdd/UG9dW1w4a9v7VPilXqzl4ACghmZT5krZS9T4KEQElugH6hXp"

export async function POST(req: NextRequest) {
  const { phone, sku, price } = await req.json()

  if (!phone?.trim() || !sku?.trim()) {
    return NextResponse.json({ ok: false, error: "phone and sku required" }, { status: 400 })
  }

  try {
    const res = await fetch(SALEURA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone.trim(),
        cod: price,
        allow_duplicated_orders: true,
        products: [{ sku: sku.trim(), quantity: 1 }],
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      return NextResponse.json({ ok: false, error: body }, { status: res.status })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
