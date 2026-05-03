"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "176TSC"
const PRICE_1 = 165
const PRICE_2 = 265

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

  useEffect(() => {
    const check = () => {
      if (!formRef.current) return
      setFormPassed(formRef.current.getBoundingClientRect().bottom < 0)
    }
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
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


      {/* ══ HERO — LP image ══ */}
      <div style={{ backgroundColor: "#0b0b0b", lineHeight: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/vacuum-4in-1-lp.webp"
          alt="أقوى أسبيراتور محمولة 4 في 1"
          className="w-full h-auto block"
          width={800}
          height={2400}
          fetchPriority="high"
          decoding="sync"
        />
      </div>

      {/* ── Wave edge: dark → light ── */}
      <div style={{ lineHeight: 0, marginTop: "-2px", backgroundColor: "#0b0b0b" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#f1f5f9" />
        </svg>
      </div>

      {/* ══ IN USE GALLERY — light ══ */}
      <div className="px-2 py-8 mt-[-2px]" style={{ backgroundColor: "#f1f5f9" }}>
        {/* Video in use */}
        <div className="max-w-lg mx-auto mt-4 rounded-2xl overflow-hidden" style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
          <video
            src="/products/cleaner-4-in-1-window-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ width: "100%", height: 500, objectFit: "cover", objectPosition: "center center", display: "block" }}
          />
        </div>
      </div>

      {/* ══ ORDER FORM ══ */}
      <section ref={formRef} className="px-5 py-8" id="order-form" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-lg mx-auto">

          {/* ── QTY SELECTOR ── */}
          <p className="text-center text-gray-900 font-black text-lg mb-3">اختاري الكمية 👇</p>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {/* 1 unit */}
            <button
              type="button"
              onClick={() => setQty(1)}
              className="rounded-2xl p-4 text-center transition-all active:scale-95"
              style={{
                border: qty === 1 ? "2px solid #2563eb" : "2px solid #e2e8f0",
                background: qty === 1 ? "#eff6ff" : "#f8fafc",
                boxShadow: qty === 1 ? "0 0 0 4px rgba(37,99,235,0.1)" : "none",
              }}
            >
              <p className="text-gray-900 font-black text-base">1️⃣ وحدة</p>
              <p className="text-blue-600 font-black text-2xl mt-1">{PRICE_1} درهم</p>
              {qty === 1 && <p className="text-blue-600 text-xs mt-1 font-bold">✓ محدد</p>}
            </button>
            {/* 2 units */}
            <button
              type="button"
              onClick={() => setQty(2)}
              className="rounded-2xl p-4 text-center transition-all active:scale-95 relative"
              style={{
                border: qty === 2 ? "2px solid #2563eb" : "2px solid #e2e8f0",
                background: qty === 2 ? "#eff6ff" : "#f8fafc",
                boxShadow: qty === 2 ? "0 0 0 4px rgba(37,99,235,0.1)" : "none",
              }}
            >
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">وفري 65 درهم</span>
              <p className="text-gray-900 font-black text-base">🛒 محتاجة جوج؟</p>
              <p className="text-gray-500 text-xs mt-1">وحدة للدار + وحدة للطوموبيل</p>
              <p className="text-blue-600 font-black text-2xl mt-1">{PRICE_2} درهم</p>
              {qty === 2 && <p className="text-blue-600 text-xs mt-1 font-bold">✓ محدد</p>}
            </button>
          </div>

          <p className="text-center text-red-500 font-black text-sm mb-3">⏳ الكمية محدودة و العرض سينتهي خلال ساعات قليلة</p>
          <div className="rounded-3xl overflow-hidden" style={{ border: "2.5px dashed #2563eb", boxShadow: "0 4px 24px rgba(37,99,235,0.12)" }}>
            <div className="px-5 py-5 text-center" style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}>
              <p className="text-blue-700 font-black text-xl">للطلب ادخلي معلوماتك اسفله 👇</p>
              <p className="text-gray-600 font-bold text-sm mt-1">توصيل مجاني + الدفع عند الاستلام ✅</p>
            </div>
            <div className="px-5 pb-8 pt-6" style={{ background: "#ffffff" }}>
              <form onSubmit={handleSubmit} className="space-y-5 py-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">الاسم الكامل <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="كتبي اسمك هنا..."
                    className="w-full rounded-xl px-4 py-4 text-gray-900 text-base outline-none transition-colors focus:border-blue-500"
                    style={{ background: "#f8fafc", border: "2px solid #cbd5e1" }} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="مثلاً: كازا، الرباط..."
                    className="w-full rounded-xl px-4 py-4 text-gray-900 text-base outline-none transition-colors focus:border-blue-500"
                    style={{ background: "#f8fafc", border: "2px solid #cbd5e1" }} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">رقم التيليفون <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06XXXXXXXX"
                    className="w-full rounded-xl px-4 py-4 text-gray-900 text-base outline-none transition-colors focus:border-blue-500"
                    style={{ background: "#f8fafc", border: errors.phone ? "2px solid #ef4444" : "2px solid #cbd5e1" }} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
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
                  ) : `طلبيه دابا — ${price} درهم `}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <img
        src="/products/cleaner-4-in-1-preview.webp"
        alt="مكونات اللاسبيراتور 4 في 1"
        className="w-full h-auto mt-12"
        width={800}
        height={600}
        loading="lazy"
      />

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
            <div key={i} className="px-5 py-6 bg-white rounded-2xl text-center" style={{ border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-16 w-auto mx-auto mb-3 object-contain" />
              <p className="text-gray-900 font-black text-base mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer className="px-5 py-8 mb-18 text-center" style={{ backgroundColor: "#f1f5f9", borderTop: "1px solid #e2e8f0" }}>
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
            🔥 طلبيه دابا — الدفع عند الاستلام
          </button>
        </div>
      )}
    </div>
  )
}