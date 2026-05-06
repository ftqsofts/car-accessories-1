"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "176TSC"
const PRICE_1 = 160
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
          src="/products/vacuum-4in-1-lp-3.webp"
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


          <h2 className="text-center font-black text-xl mb-3">
            سبيراتور بجودة مزيانة، ومعاه ضمان شهر كامل باش تجربيه ✔️
          </h2>

          <p className="text-center text-red-500 font-black text-sm mb-3">⏳ العرض سينتهي خلال ساعات قليلة</p>

          
          {/* ── QTY SELECTOR ── */}
          {/* <p className="text-center text-gray-900 font-black text-lg mb-3">اختاري الكمية 👇</p> */}
          <div className="flex flex-col gap-4 mb-6">
            {/* 1 unit */}
            <button
              type="button"
              onClick={() => setQty(1)}
              className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all active:scale-95"
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
              <span className="flex-1 text-right font-black text-base text-gray-900">أسبيراتور 4 في 1 — وحدة</span>
              {/* Price */}
              <span className="shrink-0 font-black text-lg text-gray-900">{PRICE_1} درهم</span>
            </button>

            {/* 2 units */}
            <button
              type="button"
              onClick={() => setQty(2)}
              className="relative w-full flex items-center gap-3 px-4 py-5 rounded-xl transition-all active:scale-95"
              style={{
                border: qty === 2 ? "2px solid #1e3a8a" : "2px solid #d1d5db",
                background: qty === 2 ? "#eff6ff" : "#ffffff",
              }}
            >
              {/* Discount badge */}
              <span className="absolute -top-3 right-3 text-white text-xs font-black px-2 py-1 rounded" style={{ background: "#0f172a" }}>وفري 60 درهم</span>
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

          <div className="rounded-3xl overflow-hidden" style={{ border: "2.5px dashed #2563eb", boxShadow: "0 4px 24px rgba(37,99,235,0.12)" }}>
            <div className="px-5 py-5 text-center" style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}>
              <p className="text-blue-700 font-black text-xl">للطلب ادخلي معلوماتك اسفله 👇</p>
              <p className="text-gray-600 font-bold text-sm mt-1">توصيل مجاني + الدفع عند الاستلام ✅</p>
            </div>
            <div className="px-5 pb-8 pt-6" style={{ background: "#ffffff" }}>
              <form onSubmit={handleSubmit} className="space-y-5 py-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">الاسم الكامل <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "2px solid #cbd5e1", background: "#ffffff" }}>
                    <span className="px-3 font-black flex items-center justify-center self-stretch" style={{ background: "#f1f5f9", borderLeft: "2px solid #e2e8f0" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664h10z"/></svg>
                    </span>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="الاسم الكامل"
                      className="flex-1 px-4 py-4 text-gray-900 text-base outline-none bg-transparent text-right"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "2px solid #cbd5e1", background: "#ffffff" }}>
                    <span className="px-3 font-black flex items-center justify-center self-stretch" style={{ background: "#f1f5f9", borderLeft: "2px solid #e2e8f0" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                    </span>
                    <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="مثلاً: كازا، الرباط..."
                      className="flex-1 px-4 py-4 text-gray-900 text-base outline-none bg-transparent text-right"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-black text-right">رقم التيليفون <span className="text-red-500">*</span></label>
                  <div className="flex items-center rounded-xl overflow-hidden" style={{ border: errors.phone ? "2px solid #ef4444" : "2px solid #cbd5e1", background: "#ffffff" }}>
                    <span className="px-3 font-black flex items-center justify-center self-stretch" style={{ background: "#f1f5f9", borderLeft: "2px solid #e2e8f0" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/></svg>
                    </span>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="06XXXXXXXX"
                      className="flex-1 px-4 py-4 text-gray-900 text-base outline-none bg-transparent text-right"
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
                  ) : `طلبيه دابا — ${price} درهم `}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div style={{ backgroundColor: "#f8fafc" }} className="px-1 pt-10 pb-6 hidden">
        <p className="text-blue-600 text-xs font-black tracking-widest uppercase text-center mb-1">شنو كاين فالعلبة؟</p>
        <p className="text-gray-900 font-black text-center mb-4" style={{ fontSize: "clamp(1.1rem, 5vw, 1.4rem)" }}>كل شي اللي محتاجاه كاين</p>
        <img
          src="/products/cleaner-4-in-1-package.jpg"
          alt="محتويات علبة الأسبيراتور 4 في 1"
          className="w-full h-auto rounded-2xl"
          width={800}
          height={600}
          loading="lazy"
          style={{ border: "1px solid #e2e8f0" }}
        />
      </div>

      {/* ══ REVIEWS ══ */}
      <section className="max-w-lg mx-auto px-4 pb-6 hidden" style={{ backgroundColor: "#f8fafc" }}>
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