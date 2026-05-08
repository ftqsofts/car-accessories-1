"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "176TSC"
const PRICE_1 = 145
const PRICE_2 = 250
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
    if (!f.phone.trim() || f.phone.trim().length < 8) return
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
        @keyframes btnPulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); } 50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(37,99,235,0); } }
        @keyframes btnBounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .btn-pulse { animation: btnPulse 2s ease-in-out infinite; }
      `}</style>


      {/* ══ HERO — image 1 ══ */}
      <div style={{ backgroundColor: "#0b0b0b", lineHeight: 0, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/1-3.webp"
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
          <video
            src="/products/cleaner-4-in-1-car.mp4"
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

      {/* ── Wave: black → white ── */}
      <div style={{ lineHeight: 0, backgroundColor: "#0b0b0b", marginTop: "-1px", marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ ORDER FORM 1 ══ */}
      <section ref={formRef} className="px-5 mb-12 py-8" id="order-form" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-lg mx-auto">


          <h2 className="text-center font-black text-xl mb-3">
            سبيراتور بجودة مزيانة، ومعاه ضمان شهر كامل ✔️
          </h2>

          <p className="text-center text-red-500 font-black text-sm mb-12">⏳ العرض سينتهي خلال ساعات قليلة</p>

          
          {/* ── QTY SELECTOR ── */}
          {/* <p className="text-center text-gray-900 font-black text-lg mb-3">اختاري الكمية 👇</p> */}
          <div className="flex flex-col gap-4 mb-2">
            {/* 1 unit */}
            <button
              type="button"
              onClick={() => setQty(1)}
              className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all shadow-md active:scale-95"
              style={{
                border: qty === 1 ? "2px solid #1e3a8a" : "2px solid #d1d5db",
                background: qty === 1 ? "#eff6ff" : "#ffffff",
              }}
            >
              {/* Radio dot */}
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: qty === 1 ? "2px solid #1e3a8a" : "2px solid #d1d5db" }}>
                {qty === 1 && <div className="w-2.5 h-2.5 rounded-full bg-blue-900" />}
              </div>
              {/* Title */}
              <span className="flex-1 text-right font-black text-base text-gray-900">أسبيراتور 6 في 1 — وحدة</span>
              {/* Price */}
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_1} درهم</span>
            </button>

            {/* 2 units */}
            <button
              type="button"
              onClick={() => setQty(2)}
              className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all shadow-md active:scale-95"
              style={{
                border: qty === 2 ? "2px solid #1e3a8a" : "2px solid #d1d5db",
                background: qty === 2 ? "#eff6ff" : "#ffffff",
              }}
            >
              {/* Discount badge */}
              <span className="absolute -top-3 right-3 text-white text-xs font-black px-2 py-1.5 rounded" style={{ background: "#0f172a" }}>وفر {SAVING} درهم</span>
              {/* Radio dot */}
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: qty === 2 ? "2px solid #1e3a8a" : "2px solid #d1d5db" }}>
                {qty === 2 && <div className="w-2.5 h-2.5 rounded-full bg-blue-900" />}
              </div>
              {/* Title + sub */}
              <div className="flex-1 text-right">
                <p className="font-black text-base text-gray-900">اثنان بسعر خاص</p>
                <p className="text-gray-400 text-xs mt-0.5">وحدة للدار + وحدة للطوموبيل</p>
              </div>
              {/* Price */}
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_2} درهم</span>
            </button>
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ border: "1px dashed #2563eb", boxShadow: "0 4px 24px rgba(37,99,235,0.12)" }}>
            <div className="px-5 py-2 text-center" style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}>
              <p className="text-blue-700 font-black text-lg">للطلب ادخل معلوماتك اسفله 👇</p>
              <p className="text-gray-600 font-bold text-sm mt-1">توصيل مجاني + الدفع عند الاستلام ✅</p>
            </div>
            <div className="px-5 pb-8 pt-6" style={{ background: "#ffffff" }}>
              <form onSubmit={handleSubmit} className="space-y-4 ">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">الاسم الكامل <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "2px solid #b5c1da", background: "#ffffff" }}>
                    <span className="px-3 flex items-center justify-center self-stretch" style={{ background: "#b9c9dd", borderLeft: "2px solid #b5c1da" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#252525" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664h10z"/></svg>
                    </span>
                    <input type="text" value={form.name} onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
                      placeholder="الاسم الكامل"
                      className="flex-1 px-4 py-3 text-gray-900 text-base outline-none bg-transparent text-right placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "2px solid #b5c1da", background: "#ffffff" }}>
                    <span className="px-3 flex items-center justify-center self-stretch" style={{ background: "#b9c9dd", borderLeft: "2px solid #b5c1da" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#252525" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                    </span>
                    <input type="text" value={form.city} onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
                      placeholder="مثلاً: كازا، الرباط..."
                      className="flex-1 px-4 py-3 text-gray-900 text-base outline-none bg-transparent text-right placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">رقم التيليفون <span className="text-red-500">*</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: errors.phone ? "2px solid #ef4444" : "2px solid #b5c1da", background: "#ffffff" }}>
                    <span className="px-3 flex items-center justify-center self-stretch" style={{ background: errors.phone ? "#fee2e2" : "#b9c9dd", borderLeft: errors.phone ? "2px solid #fca5a5" : "2px solid #b5c1da" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={errors.phone ? "#ef4444" : "#252525"} viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/></svg>
                    </span>
                    <input type="tel" value={form.phone} onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
                      placeholder="06XXXXXXXX"
                      className="flex-1 px-4 py-3 text-gray-900 text-base outline-none bg-transparent text-right placeholder:text-gray-400"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold text-right">{errors.phone}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-black text-lg text-white transition-all duration-200 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)", animation: loading ? "none" : "btnPulse 1.5s ease-in-out infinite" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      جاري إرسال طلبيتك...
                    </span>
                  ) : `اطلب الان — عرض محدود`}
                </button>
              </form>
            </div>
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
            <button type="button" onClick={() => setQty(1)} className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all shadow-md active:scale-95" style={{ border: qty === 1 ? "2px solid #1e3a8a" : "2px solid #d1d5db", background: qty === 1 ? "#eff6ff" : "#ffffff" }}>
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: qty === 1 ? "2px solid #1e3a8a" : "2px solid #d1d5db" }}>{qty === 1 && <div className="w-2.5 h-2.5 rounded-full bg-blue-900" />}</div>
              <span className="flex-1 text-right font-black text-base text-gray-900">مكنسة 6 في 1 — وحدة</span>
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_1} درهم</span>
            </button>
            <button type="button" onClick={() => setQty(2)} className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all shadow-md active:scale-95" style={{ border: qty === 2 ? "2px solid #1e3a8a" : "2px solid #d1d5db", background: qty === 2 ? "#eff6ff" : "#ffffff" }}>
              <span className="absolute -top-3 right-3 text-white text-xs font-black px-2 py-1 rounded" style={{ background: "#0f172a" }}>وفر {SAVING} درهم</span>
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: qty === 2 ? "2px solid #1e3a8a" : "2px solid #d1d5db" }}>{qty === 2 && <div className="w-2.5 h-2.5 rounded-full bg-blue-900" />}</div>
              <div className="flex-1 text-right">
                <p className="font-black text-base text-gray-900">اثنان بسعر خاص</p>
                <p className="text-gray-400 text-xs mt-0.5">وحدة للدار + وحدة للطوموبيل</p>
              </div>
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_2} درهم</span>
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ border: "1px dashed #2563eb", boxShadow: "0 4px 24px rgba(37,99,235,0.12)" }}>
            <div className="px-5 py-2 text-center" style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}>
              <p className="text-blue-700 font-black text-lg">للطلب ادخل معلوماتك اسفله 👇</p>
              <p className="text-gray-600 font-bold text-sm mt-1">توصيل مجاني + الدفع عند الاستلام ✅</p>
            </div>
            <div className="px-5 pb-8 pt-6" style={{ background: "#ffffff" }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">الاسم الكامل <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "2px solid #b5c1da", background: "#ffffff" }}>
                    <span className="px-3 flex items-center justify-center self-stretch" style={{ background: "#b9c9dd", borderLeft: "2px solid #b5c1da" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#252525" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664h10z"/></svg>
                    </span>
                    <input type="text" value={form.name} onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, qty, price) }} placeholder="الاسم الكامل" className="flex-1 px-4 py-3 text-gray-900 text-base outline-none bg-transparent text-right placeholder:text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "2px solid #b5c1da", background: "#ffffff" }}>
                    <span className="px-3 flex items-center justify-center self-stretch" style={{ background: "#b9c9dd", borderLeft: "2px solid #b5c1da" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#252525" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                    </span>
                    <input type="text" value={form.city} onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, qty, price) }} placeholder="مثلاً: كازا، الرباط..." className="flex-1 px-4 py-3 text-gray-900 text-base outline-none bg-transparent text-right placeholder:text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">رقم التيليفون <span className="text-red-500">*</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: errors.phone ? "2px solid #ef4444" : "2px solid #b5c1da", background: "#ffffff" }}>
                    <span className="px-3 flex items-center justify-center self-stretch" style={{ background: errors.phone ? "#fee2e2" : "#b9c9dd", borderLeft: errors.phone ? "2px solid #fca5a5" : "2px solid #b5c1da" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={errors.phone ? "#ef4444" : "#252525"} viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/></svg>
                    </span>
                    <input type="tel" value={form.phone} onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, qty, price) }} placeholder="06XXXXXXXX" className="flex-1 px-4 py-3 text-gray-900 text-base outline-none bg-transparent text-right placeholder:text-gray-400" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold text-right">{errors.phone}</p>}
                </div>
                <button type="submit" disabled={loading} className="w-full py-5 rounded-2xl font-black text-lg text-white transition-all duration-200 active:scale-95" style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)", animation: loading ? "none" : "btnPulse 1.5s ease-in-out infinite" }}>
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
        <section className="max-w-lg mx-auto px-4 pb-12">
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
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ border: "1px solid #bfdbfe" }}>
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
            className="w-full text-white font-black text-base py-4 rounded-2xl active:scale-95"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)", animation: "btnBounce 1.2s ease-in-out infinite" }}
          >
            🔥  اطلب الان — الدفع عند الاستلام
          </button>
        </div>
      )}
    </div>
  )
}