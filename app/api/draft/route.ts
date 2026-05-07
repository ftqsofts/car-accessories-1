import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = "https://rrtuzqjbgxouwzserwjp.supabase.co/rest/v1"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydHV6cWpiZ3hvdXd6c2Vyd2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTc3MjUsImV4cCI6MjA5MzY3MzcyNX0.P2U5ruvLYFbKfv10s27lFT0afhVdrnMRBTFmkWNn7G8"
const SB = { "Content-Type": "application/json", "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }

export async function POST(req: NextRequest) {
  const { id, phone, full_name, address, sku, qte, price } = await req.json()
  const payload = { phone, full_name, address, sku, qte, price }

  if (id) {
    // Update existing draft
    await fetch(`${SUPABASE_URL}/drafts?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...SB, "Prefer": "return=minimal" },
      body: JSON.stringify({ ...payload, updated_at: new Date().toISOString() }),
    })
    return NextResponse.json({ id })
  } else {
    // Create new draft
    const res = await fetch(`${SUPABASE_URL}/drafts`, {
      method: "POST",
      headers: { ...SB, "Prefer": "return=representation" },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    return NextResponse.json({ id: data?.[0]?.id ?? null })
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ ok: true })
  await fetch(`${SUPABASE_URL}/drafts?id=eq.${id}`, {
    method: "DELETE",
    headers: SB,
  })
  return NextResponse.json({ ok: true })
}
