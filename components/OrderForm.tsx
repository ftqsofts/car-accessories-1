"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

export type QtyOption = {
  q: number
  label: string
  price: number
  oldPrice?: number
  badge?: string
}

type Props = {
  sku: string
  pack: string                  // used in /thank-you?pack=...
  options: QtyOption[]          // pass a single-item array for no-qty-selector pages
  btnLabel?: string             // default: "اطلب الآن"
  btnColor?: string             // default: #ffd200
}

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

export default function OrderForm({ sku, pack, options, btnLabel = "اطلب الآن", btnColor = "#ffd200" }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [loading, setLoading] = useState(false)
  const [qty, setQty] = useState(options[0].q)

  const draftId = useRef<number | null>(null)
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const price = options.find(o => o.q === qty)?.price ?? options[0].price

  const saveDraft = (f: OrderForm, q: number, p: number) => {
    if (!f.phone.trim() || f.phone.trim().length < 10) return
    if (draftTimer.current) clearTimeout(draftTimer.current)
    draftTimer.current = setTimeout(async () => {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draftId.current, phone: f.phone.trim(), full_name: f.name, address: f.city, sku, qte: q, price: p }),
      }).catch(() => null)
      if (res?.ok) {
        const data = await res.json().catch(() => null)
        if (data?.id) draftId.current = data.id
      }
    }, 1500)
  }

  const validate = () => {
    const e: Partial<OrderForm> = {}
    if (!form.phone.trim()) e.phone = "رقم الهاتف مطلوب"
    else if (!/^[0-9+\s]{9,15}$/.test(form.phone.trim())) e.phone = "رقم الهاتف غير صحيح"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (form._hp) return
    setLoading(true)
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus: sku, qty, total: price }),
    }).catch(() => null)
    const params = new URLSearchParams({ name: form.name, phone: form.phone, city: form.city, skus: sku, qty: String(qty), total: String(price), pack })
    router.push(`/thank-you?${params}`)
  }

  const iconWrap: React.CSSProperties = {
    width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0",
    borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }

  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "10px 18px 18px", marginTop: 10 }}>

      {/* qty selector — hidden when only one option */}
      {options.length > 1 && (
        <div style={{ marginBottom: 16 }}>
          {options.map((opt) => (
            <div key={opt.q} onClick={() => setQty(opt.q)} style={{
              position: "relative", padding: "20px 15px", borderRadius: 6, marginBottom: 15, cursor: "pointer",
              border: qty === opt.q ? "1px solid #1E3A8A" : "1px solid #d1d1d1",
              background: qty === opt.q ? "#EFF6FF" : "#fff",
            }}>
              {opt.badge && (
                <span style={{
                  position: "absolute", top: 0, insetInlineEnd: 0, transform: "translateY(-10px)",
                  background: "#0F172A", color: "#fff", fontSize: 14, fontWeight: 700,
                  padding: "2.5px 10px", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, marginInlineEnd: 15,
                }}>{opt.badge}</span>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, position: "relative", border: qty === opt.q ? "1px solid #1E3A8A" : "1px solid #d1d1d1" }}>
                  {qty === opt.q && <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1E3A8A", position: "absolute", top: 3, left: 3 }} />}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexGrow: 1, alignItems: "center", gap: 4, marginInlineStart: 10 }}>
                  <span style={{ color: "#000", fontSize: 16, fontWeight: 800 }}>{opt.label}</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ color: "#000", fontSize: 18, fontWeight: 800, whiteSpace: "nowrap" }}>{opt.price} درهم</span>
                    {opt.oldPrice && <span style={{ color: "#aaa", fontSize: 13, fontWeight: 700, textDecoration: "line-through", whiteSpace: "nowrap" }}>{opt.oldPrice} درهم</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

        {/* phone */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", marginBottom: 4, direction: "rtl" }}>
            رقم الهاتف <span style={{ color: "#dc3545", marginRight: 4 }}>*</span>
          </label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <span style={iconWrap}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>
            </span>
            <input type="tel" value={form.phone}
              onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
              placeholder="رقم الهاتف" dir="rtl"
              style={{ flex: 1, height: 45, fontSize: 18, padding: "5px 15px", border: `1px solid ${errors.phone ? "#e20000" : "#c0c0c0"}`, borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
            />
          </div>
          {errors.phone && <p style={{ color: "#e20000", fontSize: 14, margin: "4px 0 0", textAlign: "right" }}>{errors.phone}</p>}
        </div>

        {/* name */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 15, fontWeight: 700, display: "block", marginBottom: 4, direction: "rtl" }}>الاسم الكامل</label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <span style={iconWrap}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
            </span>
            <input type="text" value={form.name}
              onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
              placeholder="الاسم الكامل" dir="rtl"
              style={{ flex: 1, height: 50, fontSize: 18, padding: "5px 15px", border: "1px solid #c0c0c0", borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
            />
          </div>
        </div>

        {/* city */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 15, fontWeight: 700, display: "block", marginBottom: 4, direction: "rtl" }}>المدينة</label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <span style={iconWrap}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
            </span>
            <input type="text" value={form.city}
              onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
              placeholder="المدينة" dir="rtl"
              style={{ flex: 1, height: 50, fontSize: 18, padding: "5px 15px", border: "1px solid #c0c0c0", borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
            />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          width: "100%", minHeight: 50, background: btnColor, color: "#fff", fontSize: 18, fontWeight: 700,
          border: "none", borderRadius: 6, display: "flex", justifyContent: "center", alignItems: "center",
          margin: "20px 0", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 2px 7px rgba(0,0,0,0.18)",
          animation: loading ? "none" : "btnPulse 0.82s cubic-bezier(.36,.07,.19,.97) infinite",
        }}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg className="animate-spin" style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              جاري إرسال طلبيتك...
            </span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" viewBox="0 0 16 16" style={{ marginLeft: 10 }}><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
              <span style={{ color: "#fff" }}>{btnLabel} — {price} درهم</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}