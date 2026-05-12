"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "176TSC"
const PRICE_1 = 165
const PRICE_2 = 270
const SAVING = PRICE_1 * 2 - PRICE_2


type OrderForm = { name: string; city: string; phone: string; _hp?: string }

export default function VcClPage() {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [loading, setLoading] = useState(false)
  const [formPassed, setFormPassed] = useState(false)
  const [qty, setQty] = useState(1)
  const formRef = useRef<HTMLElement>(null)
  const price = qty === 2 ? PRICE_2 : PRICE_1
  const draftId = useRef<number | null>(null)
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  const saveDraft = (f: OrderForm, q: number, p: number) => {
    if (!f.phone.trim() || f.phone.trim().length < 10) return
    if (draftTimer.current) clearTimeout(draftTimer.current)
    draftTimer.current = setTimeout(async () => {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draftId.current, phone: f.phone.trim(), full_name: f.name, address: f.city, sku: PRODUCT_SKU, qte: q, price: p }),
      }).catch(() => null)
      if (res?.ok) {
        const data = await res.json().catch(() => null)
        if (data?.id) draftId.current = data.id
      }
    }, 1500)
  }

  const deleteDraft = () => {
    if (!draftId.current) return
    fetch("/api/draft", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: draftId.current }),
    }).catch(() => null)
    draftId.current = null
  }

  useEffect(() => {
    const check = () => {
      if (!formRef.current) return
      const rect = formRef.current.getBoundingClientRect()
      setFormPassed(rect.bottom < 0 || rect.top > window.innerHeight)
    }
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [])

  // Lazy-load second video only when scrolled into view
  useEffect(() => {
    const el = video2Ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.src = "/products/cleaner-4-in-1-inboxing-2.mp4"
        el.load()
        obs.disconnect()
      }
    }, { rootMargin: "200px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
    deleteDraft()
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus: PRODUCT_SKU, qty, total: price }),
    }).catch(() => null)
    const params = new URLSearchParams({ name: form.name, phone: form.phone, city: form.city, skus: PRODUCT_SKU, qty: String(qty), total: String(price), pack: "vc-cl" })
    router.push(`/thank-you?${params}`)
  }

  return (
    <div className="min-h-screen text-gray-900" dir="rtl" style={{ backgroundColor: "#f8fafc", fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <style>{`
        @keyframes btnPulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(232,184,109,0.5); } 50% { transform: scale(1.03); box-shadow: 0 0 0 14px rgba(232,184,109,0); } }
        @keyframes btnBounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .btn-pulse { animation: btnPulse 2s ease-in-out infinite; }
      `}</style>


      {/* ══ HERO — image 1 ══ */}
      <div style={{ backgroundColor: "#0b0b0b", lineHeight: 0, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/1.webp"
          alt="مكنسة كهربائية 6 في 1"
          className="w-full h-auto block"
          width={800}
          height={2400}
          fetchPriority="high"
          decoding="async"
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, #0b0b0b)" }} />
      </div>

      {/* ══ VIDEO SECTION — black bg, seamless with hero ══ */}
      <div style={{ backgroundColor: "#0b0b0b", lineHeight: 0, marginTop: "-5px" }} className="px-4 pb-8 pt-2">
        <div className="max-w-lg mx-auto rounded-2xl border-2 border-gray-500 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/JpCQxc8s29Q6GGnEv8h6O0EQW0UKFWDeflYQn9sh.gif" alt="شفط الأوساخ" style={{ width: "100%", height: 500, objectFit: "cover", display: "block" }} />
        </div>
      </div>

      {/* ── Wave: black → white ── */}
      <div style={{ lineHeight: 0, backgroundColor: "#0b0b0b", marginTop: "-1px", marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ ORDER FORM 1 ══ */}
      <section ref={formRef} className="px-5 mb-12 py-8" id="order-form" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-lg mx-auto">


          <div style={{ background: "#fff", borderRadius: 10, padding: "10px 0 18px", marginTop: 10 }}>
            {/* qty offers */}
            <div style={{ marginBottom: 16 }}>
              {[
                { q: 1, label: "أسبيراتور 6 في 1 — وحدة", price: PRICE_1 },
                { q: 2, label: "اثنان بسعر خاص", price: PRICE_2, badge: `وفر ${SAVING} درهم` },
              ].map((opt) => (
                <div key={opt.q} onClick={() => setQty(opt.q)} style={{
                  position: "relative", padding: "20px 15px", borderRadius: 6, marginBottom: 15,
                  border: qty === opt.q ? "1px solid #1E3A8A" : "1px solid #d1d1d1",
                  background: qty === opt.q ? "#EFF6FF" : "#fff", cursor: "pointer",
                }}>
                  {opt.badge && (
                    <span style={{
                      position: "absolute", top: 0, insetInlineEnd: 0, transform: "translateY(-10px)",
                      background: "#0F172A", color: "#fff", fontSize: 14, fontWeight: 700,
                      padding: "2.5px 10px", borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
                      marginInlineEnd: 15,
                    }}>{opt.badge}</span>
                  )}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, position: "relative", border: qty === opt.q ? "1px solid #1E3A8A" : "1px solid #d1d1d1" }}>
                      {qty === opt.q && <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1E3A8A", position: "absolute", top: 3, left: 3 }} />}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexGrow: 1, alignItems: "center", gap: 4, marginInlineStart: 10 }}>
                      <span style={{ color: "#000", fontSize: 16, fontWeight: 800 }}>{opt.label}</span>
                      <span style={{ color: "#000", fontSize: 18, fontWeight: 800, whiteSpace: "nowrap" }}>{opt.price} درهم</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

              {/* phone */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", marginBottom: 4, direction: "rtl" }}>
                  رقم الهاتف <span style={{ color: "#dc3545", marginRight: 4 }}>*</span>
                </label>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <span style={{ width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>
                  </span>
                  <input type="tel" value={form.phone} onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
                    placeholder="رقم الهاتف" dir="rtl"
                    style={{ flex: 1, height: 45, fontSize: 16, padding: "5px 15px", border: `1px solid ${errors.phone ? "#e20000" : "#c0c0c0"}`, borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
                  />
                </div>
                {errors.phone && <p style={{ color: "#e20000", fontSize: 14, margin: "4px 0 0", textAlign: "right" }}>{errors.phone}</p>}
              </div>

              {/* name */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 15, fontWeight: 700, display: "block", marginBottom: 4, direction: "rtl" }}>الاسم الكامل</label>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <span style={{ width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
                  </span>
                  <input type="text" value={form.name} onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
                    placeholder="الاسم الكامل" dir="rtl"
                    style={{ flex: 1, height: 45, fontSize: 16, padding: "5px 15px", border: "1px solid #c0c0c0", borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
                  />
                </div>
              </div>

              {/* city */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 15, fontWeight: 700, display: "block", marginBottom: 4, direction: "rtl" }}>المدينة</label>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <span style={{ width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                  </span>
                  <input type="text" value={form.city} onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
                    placeholder="المدينة" dir="rtl"
                    style={{ flex: 1, height: 45, fontSize: 16, padding: "5px 15px", border: "1px solid #c0c0c0", borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: "100%", minHeight: 50, background: "#ffd200", color: "#fff", fontSize: 18, fontWeight: 700,
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
                ) : <><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" viewBox="0 0 16 16" style={{ marginLeft: 10 }}><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg><span style={{ color: "#fff" }}>اطلب الآن</span></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Wave: white → black ── */}
      <div className="hidden" style={{ lineHeight: 0, backgroundColor: "#0b0b0b", marginTop: "0px", marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ IMAGE 2 — dark ══ */}
      <div className="hidden" style={{ backgroundColor: "#0b0b0b", lineHeight: 0, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/2-2.webp"
          alt="قوية الشفط — مكنسة 6 في 1"
          className="w-full h-auto block"
          width={800}
          height={2400}
          loading="lazy"
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, #0b0b0b)" }} />
      </div>

      {/* ── Wave: black → white ── */}
      <div className="hidden" style={{ lineHeight: 0, backgroundColor: "#0b0b0b", marginTop: "-1px", marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ ORDER FORM 2 ══ */}
      <section className="px-5 py-8 hidden" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-lg mx-auto">
          <h2 className="text-center font-black text-xl mb-3">اطلب الآن وتوصلك خلال 24 ساعة ✔️</h2>
          <p className="text-center text-red-500 font-black text-sm mb-6">⏳ العرض سينتهي خلال ساعات قليلة</p>
          <div className="flex flex-col gap-4 mb-2">
            <button type="button" onClick={() => setQty(1)} className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all shadow-md active:scale-95" style={{ border: qty === 1 ? "2px solid #E8B86D" : "2px solid #d1d5db", background: qty === 1 ? "#fdf8ee" : "#ffffff" }}>
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: qty === 1 ? "2px solid #E8B86D" : "2px solid #d1d5db" }}>{qty === 1 && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#E8B86D" }} />}</div>
              <span className="flex-1 text-right font-black text-base text-gray-900">مكنسة 6 في 1 — وحدة</span>
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_1} درهم</span>
            </button>
            <button type="button" onClick={() => setQty(2)} className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all shadow-md active:scale-95" style={{ border: qty === 2 ? "2px solid #E8B86D" : "2px solid #d1d5db", background: qty === 2 ? "#fdf8ee" : "#ffffff" }}>
              <span className="absolute -top-3 right-3 text-black text-xs font-black px-2 py-1 rounded" style={{ background: "#E8B86D" }}>وفر {SAVING} درهم</span>
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: qty === 2 ? "2px solid #E8B86D" : "2px solid #d1d5db" }}>{qty === 2 && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#E8B86D" }} />}</div>
              <div className="flex-1 text-right">
                <p className="font-black text-base text-gray-900">اثنان بسعر خاص</p>
                <p className="text-gray-400 text-xs mt-0.5">وحدة للدار + وحدة للطوموبيل</p>
              </div>
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_2} درهم</span>
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ border: "3.5px dashed #E8B86D", boxShadow: "0 4px 24px rgba(232,184,109,0.15)" }}>
            <div className="px-5 py-3 text-center" style={{ background: "#030712" }}>
              <p className="font-black text-lg" style={{ color: "#E8B86D", animation: "pulse 1.5s ease-in-out infinite" }}>للطلب ادخل معلوماتك اسفله 👇</p>
              <p className="text-white/60 font-bold text-sm mt-1">توصيل مجاني + الدفع عند الاستلام ✅</p>
            </div>
            <div className="px-5 pb-8 pt-6" style={{ background: "#ffffff" }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">الاسم الكامل <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.name} onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, qty, price) }} placeholder="الاسم الكامل" className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none text-right transition-colors" onFocus={e => e.target.style.borderColor = "#E8B86D"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.city} onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, qty, price) }} placeholder="مثلاً: كازا، الرباط..." className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none text-right transition-colors" onFocus={e => e.target.style.borderColor = "#E8B86D"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">رقم التيليفون <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, qty, price) }} placeholder="06XXXXXXXX" className="w-full bg-gray-50 border-2 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none text-right transition-colors" style={{ borderColor: errors.phone ? "#ef4444" : "#e5e7eb" }} onFocus={e => { if (!errors.phone) e.target.style.borderColor = "#E8B86D" }} onBlur={e => { if (!errors.phone) e.target.style.borderColor = "#e5e7eb" }} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold text-right">{errors.phone}</p>}
                </div>
                <button type="submit" disabled={loading} className="w-full py-5 rounded-2xl font-black text-lg text-black transition-all duration-200 active:scale-95" style={{ background: "#E8B86D", boxShadow: "0 4px 20px rgba(232,184,109,0.4)", animation: loading ? "none" : "btnPulse 1.5s ease-in-out infinite" }}>
                  {loading ? (<span className="flex items-center justify-center gap-2"><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>جاري إرسال طلبيتك...</span>) : `اطلب الان — عرض محدود`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      <div className="px-4 pb-8 pt-2">
        <div className="max-w-lg mx-auto rounded-2xl overflow-hidden">
          <video
            ref={video2Ref}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster=""
            style={{ width: "100%", height: 500, objectFit: "cover", objectPosition: "center center", display: "block" }}
          />
        </div>
      </div>

      {/* ══ REVIEWS ══ */}
      <section className="max-w-lg mx-auto px-4 pb-6" style={{ backgroundColor: "#f8fafc" }}>
        <h2 className="text-gray-900 font-black text-2xl mt-12 text-center mb-5">عملائنا راضون</h2>
        {["/reviews/reviews-1.webp"].map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="رأي زبون" className="w-full border border-gray-200 h-auto rounded-2xl shadow-sm" width={800} height={600} loading="lazy" />
        ))}
      </section>

      {/* ══ TRUST BADGES ══ */}
      <div className="max-w-lg mx-auto px-4 py-8" style={{ backgroundColor: "#f8fafc" }}>
        <h2 className="text-gray-900 font-black text-2xl text-center mb-6">الضمانات والاسترجاع</h2>
        <div className="flex flex-col gap-3">
          {[
            { img: "/icons/waraico.webp", title: "ضمان المنتج", sub: "ضمان لمدة 30 يوم — ماعجبكيش كنرجعو ليك الفلوس" },
            { img: "/icons/codincon.webp", title: "جرب عاد خلصي", sub: "ماغادي تخلصي حتى شي حتى توصلك المنتج وتفحصيه" },
            { img: "/icons/cussup.webp", title: "خدمة ما بعد البيع", sub: "فريق العملاء تحت تصرفك طيلة أيام الأسبوع" },
            { img: "/icons/shipico.webp", title: "شحن سريع وموثوق", sub: "كنشحنو لجميع المدن خلال 24h إلى 48h" },
          ].map((item, i) => (
            <div key={i} className="px-5 py-6 bg-white rounded-2xl text-center" style={{ border: "1px solid #b9c9dd", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-16 w-auto mx-auto mb-3 object-contain" />
              <p className="text-gray-900 font-black text-base mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>


      
        {/* ══ WHATSAPP CTA ══ */}
        <section className="max-w-lg mx-auto hidden px-4 pb-12">
          <div className="bg-gray-900 rounded-3xl p-6 text-center space-y-4">
            <p className="text-white font-black text-xl">عندك سؤال؟ تواصل معنا مباشرة</p>
            <p className="text-white/50 text-sm">فريقنا مساند ليك على واتساب</p>
            <a
              href="https://wa.me/212728214523?text=Salam"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-lg text-white active:scale-95 transition-all shadow-lg"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white shrink-0">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.649 4.942 1.883 7.115L2 30l7.115-1.863A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.88-1.603l-.42-.25-4.223 1.106 1.13-4.115-.274-.434A11.559 11.559 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.338-8.607c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.9 1.129-1.103 1.362-.203.232-.406.26-.754.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.203-.347-.022-.535.152-.708.156-.155.347-.406.52-.61.174-.202.232-.347.347-.578.116-.232.058-.435-.029-.61-.087-.174-.783-1.887-1.073-2.585-.283-.678-.57-.586-.783-.597l-.667-.012c-.232 0-.61.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.367 1.42 3.599c.174.232 2.454 3.747 5.946 5.254.831.359 1.48.573 1.986.733.834.265 1.594.228 2.194.138.669-.1 2.055-.84 2.345-1.651.29-.812.29-1.507.203-1.651-.086-.145-.318-.232-.666-.406z" />
              </svg>
              تواصل معنا على واتساب
            </a>
          </div>
        </section>

      {/* ══ FOOTER ══ */}
      <footer className="px-5 py-8 mb-18 text-center" style={{ backgroundColor: "#f1f5f9", borderTop: "1px solid #b9c9dd" }}>
        <div className="inline-flex items-center gap-2 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ background: "#fdf8ee", border: "1px solid #E8B86D", color: "#92712a" }}>
          🚚 توصيل مجاني لجميع مدن المغرب
        </div>
        <p className="text-gray-400 text-xs">© 2025 Storecoma — جميع الحقوق محفوظة</p>
        <div className="relative z-10 pb-2 mx-auto mt-4 w-max text-center">
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" loading="lazy" />
        </div>
      </footer>

      {/* ══ STICKY BUTTON ══ */}
      {formPassed && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full text-black font-black text-base py-4 rounded-2xl active:scale-95"
            style={{ background: "#E8B86D", boxShadow: "0 4px 24px rgba(232,184,109,0.5)", animation: "btnBounce 1.2s ease-in-out infinite" }}
          >
            🔥  اطلب الان — الدفع عند الاستلام
          </button>
        </div>
      )}
    </div>
  )
}