"use client"

import { useEffect, useState } from "react"

type OrderEntry = {
  order: Record<string, unknown>
  sheetdb?: Record<string, unknown>
}

const TOKEN = "admin123"

export default function OrdersListPage() {
  const [orders, setOrders] = useState<OrderEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/orders?token=${TOKEN}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else setOrders(data)
      })
      .catch(() => setError("فشل التحميل"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-lg">جاري التحميل...</div>
  )
  if (error) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400 text-lg">{error}</div>
  )

  const total = orders.length
  const failed = orders.filter(o => o.sheetdb?._sheetdb_error || (o.sheetdb?._sheetdb_status && Number(o.sheetdb._sheetdb_status) >= 400)).length
  const ok = orders.filter(o => o.sheetdb?._sheetdb_status && Number(o.sheetdb._sheetdb_status) < 400).length

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8" dir="rtl" style={{ fontFamily: "Cairo, sans-serif" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black mb-1">قائمة الطلبيات</h1>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">المجموع: <span className="text-white font-black">{total}</span></span>
            <span className="text-green-400">نجح: <span className="font-black">{ok}</span></span>
            <span className="text-red-400">فشل: <span className="font-black">{failed}</span></span>
            <span className="text-gray-400">بدون رد: <span className="text-white font-black">{total - ok - failed}</span></span>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="text-center text-gray-500 py-20">لا توجد طلبيات بعد</div>
        )}

        <div className="flex flex-col gap-3">
          {orders.map((entry, i) => {
            const o = entry.order
            const s = entry.sheetdb
            const isError = s?._sheetdb_error || (s?._sheetdb_status && Number(s._sheetdb_status) >= 400)
            const isOk = s?._sheetdb_status && Number(s._sheetdb_status) < 400
            const noResponse = !s

            return (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${isError ? "#7f1d1d" : isOk ? "#14532d" : "#374151"}`, background: "#111827" }}>
                {/* Status bar */}
                <div className="px-4 py-2 flex items-center gap-3 text-xs font-black" style={{ background: isError ? "#450a0a" : isOk ? "#052e16" : "#1f2937" }}>
                  <span className={isError ? "text-red-400" : isOk ? "text-green-400" : "text-gray-400"}>
                    {isError ? "❌ فشل SheetDB" : isOk ? "✅ وصل SheetDB" : "⏳ بدون رد"}
                  </span>
                  {s?._sheetdb_status != null && <span className="text-gray-400">HTTP {String(s._sheetdb_status)}</span>}
                  <span className="mr-auto text-gray-500">{String(o.date_order ?? "")}</span>
                </div>

                {/* Order info */}
                <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm border-b border-gray-800">
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">الاسم</p>
                    <p className="font-black">{String(o.full_name || "—")}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">الهاتف</p>
                    <p className="font-black text-blue-400">{String(o.phone || "—")}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">المدينة</p>
                    <p className="font-black">{String(o.address || "—")}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">SKU / كمية / سعر</p>
                    <p className="font-black">{String(o.sku)} × {String(o.qte)} — <span className="text-green-400">{String(o.price)} درهم</span></p>
                  </div>
                </div>

                {/* SheetDB response */}
                {s && (
                  <div className="px-4 py-2 text-xs text-gray-500">
                    <span className="text-gray-600 ml-2">SheetDB response:</span>
                    <span className={isError ? "text-red-400" : "text-gray-400"}>
                      {String(s._sheetdb_response ?? s._sheetdb_error ?? "")}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
