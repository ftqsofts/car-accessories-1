import { NextRequest, NextResponse } from "next/server"
import { existsSync, readFileSync } from "fs"
import { join } from "path"

const ORDERS_FILE = join(process.cwd(), "data", "orders.jsonl")
const SECRET = process.env.ORDERS_SECRET ?? "admin123"

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  if (token !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  if (!existsSync(ORDERS_FILE)) {
    return NextResponse.json([])
  }

  const lines = readFileSync(ORDERS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => { try { return JSON.parse(l) } catch { return null } })
    .filter(Boolean)

  // Group order lines with their sheetdb response line
  const orders: { order: Record<string, unknown>; sheetdb?: Record<string, unknown> }[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line._sheetdb_status !== undefined || line._sheetdb_error !== undefined) continue
    const next = lines[i + 1]
    const hasResponse = next && (next._sheetdb_status !== undefined || next._sheetdb_error !== undefined)
    orders.push({ order: line, sheetdb: hasResponse ? next : undefined })
    if (hasResponse) i++
  }

  // Sort by date desc
  orders.sort((a, b) => {
    const da = new Date(a.order.date_order as string).getTime()
    const db = new Date(b.order.date_order as string).getTime()
    return db - da
  })

  return NextResponse.json(orders)
}
