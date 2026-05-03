"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "176TSC"
const PRICE_1 = 175
const PRICE_2 = 275

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
    <div className="min-h-screen text-gray-900" dir="rtl" style={{ backgroundColor: "#f8fafc", fontFamily: "Cairo, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        @keyframes btnPulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); } 50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(37,99,235,0); } }
        @keyframes btnBounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .btn-pulse { animation: btnPulse 2s ease-in-out infinite; }
      `}</style>

      {/* ══ COD BANNER — top of page ══ */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <Image src="/resources/cod-header-banner.webp" alt="توصيل مجاني — الدفع عند الاستلام" width={800} height={60} className="w-auto h-[45px]" priority />
      </div>

      {/* ══ HERO — dark ══ */}
      <section className="relative flex flex-col items-center text-center overflow-hidden" style={{ paddingTop: "2.5rem", paddingBottom: "0", backgroundColor: "#000000" }}>
        {/* Glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />

        {/* Logo */}
        <div className="relative z-10 pb-2">
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" priority />
        </div>

        <span className="bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full mb-4">🔥 الأكثر طلباً في المغرب</span>

        <h1 className="font-black leading-tight mb-4 text-white" style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}>
          أقوى أسبيراتور محمولة 4 في 1
        </h1>
        <p className="text-white/70 text-lg font-bold mb-6 leading-relaxed">
          نقي دارك وطوموبيلتك في دقائق وبلا مجهود — بقوة شفط خيالية كتوصل لـ <span className="text-blue-400 font-black">9000PA</span>
        </p>

        {/* Product image */}
        <div className="relative w-full max-w-sm mx-auto mb-8">
          <img
            src="/products/vacuum-4in-1-preview.webp"
            alt="لاسبيراتور 4 في 1"
            className="w-full h-auto rounded-3xl relative z-10"
            fetchPriority="high"
            decoding="sync"
          />
        </div>

        {/* Breakdown image with title */}
        <div className="w-full mt-2">
          <p className="text-blue-400 text-xs font-black tracking-widest uppercase text-center mb-1">شنو كاين فيها؟</p>
          <p className="text-white font-black text-xl text-center mb-3" style={{ fontSize: "clamp(1.2rem, 6vw, 1.6rem)" }}>هادا ماشي السبيراتور العادي هاد الموديل راه مجرّب ومعروف بالقوة ديالو</p>
          <img src="/products/vc-cl-features.webp" alt="" className="w-full h-auto block mb-0" />
        </div>

      </section>

      {/* ── Wave edge: dark → light ── */}
      <div style={{ lineHeight: 0, marginTop: "-2px", backgroundColor: "#000000" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#f1f5f9" />
        </svg>
      </div>

      {/* ══ IN USE GALLERY — light ══ */}
      <div className="px-5 pt-2 pb-8" style={{ backgroundColor: "#f1f5f9" }}>
        <p className="text-blue-600 text-xs font-black tracking-widest uppercase text-center mb-1">شوفيه فالواقع</p>
        <p className="text-gray-900 font-black text-center mb-5" style={{ fontSize: "clamp(1.2rem, 6vw, 1.6rem)" }}>يستعمل فكل بلاصة</p>
        <div className="max-w-lg mx-auto grid grid-cols-2 hidden gap-3">
          <div className="rounded-2xl overflow-hidden aspect-square bg-gray-200 flex flex-col items-center justify-center" style={{ border: "1px solid #e2e8f0" }}>
            <span className="text-4xl">🏠</span>
            <p className="text-gray-400 text-xs mt-2 font-bold">صورة الدار</p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square bg-gray-200 flex flex-col items-center justify-center" style={{ border: "1px solid #e2e8f0" }}>
            <span className="text-4xl">🚗</span>
            <p className="text-gray-400 text-xs mt-2 font-bold">صورة الطوموبيل</p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square bg-gray-200 flex flex-col items-center justify-center" style={{ border: "1px solid #e2e8f0" }}>
            <span className="text-4xl">🪣</span>
            <p className="text-gray-400 text-xs mt-2 font-bold">صورة الزربية</p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square bg-gray-200 flex flex-col items-center justify-center" style={{ border: "1px solid #e2e8f0" }}>
            <span className="text-4xl">🛋️</span>
            <p className="text-gray-400 text-xs mt-2 font-bold">صورة الكنابي</p>
          </div>
        </div>

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
          {/* <video
            src="/products/cleaner-4-in-1-window.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: "center center", display: "block" }}
          /> */}
        </div>
      </div>

      {/* ══ ORDER FORM ══ */}
      <section ref={formRef} className="px-5 py-8" id="order-form" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-lg mx-auto">

          {/* ── QTY SELECTOR ── */}
          <p className="text-center text-gray-900 font-black text-lg mb-3">اختاري الكمية 👇</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
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
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">وفري 75 درهم</span>
              <p className="text-gray-900 font-black text-base">🛒 محتاجة جوج؟</p>
              <p className="text-gray-500 text-[11px] mt-1">وحدة للدار + وحدة للطوموبيل</p>
              <p className="text-blue-600 font-black text-2xl mt-1">{PRICE_2} درهم</p>
              {qty === 2 && <p className="text-blue-600 text-xs mt-1 font-bold">✓ محدد</p>}
            </button>
          </div>

          <p className="text-center text-red-500 font-black text-sm mb-3">⏳ الكمية محدودة و العرض سينتهي خلال ساعات قليلة</p>
          <div className="rounded-3xl overflow-hidden" style={{ border: "2.5px dashed #2563eb", boxShadow: "0 4px 24px rgba(37,99,235,0.12)" }}>
            <div className="px-5 py-5 text-center" style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe" }}>
              <p className="text-blue-700 font-black text-xl" style={{ animation: "btnPulse 1.5s ease-in-out infinite" }}>للطلب ادخلي معلوماتك اسفله 👇</p>
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
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}
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

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/products/cleaner-4-in-1-preview.webp"
        alt="مكونات اللاسبيراتور 4 في 1"
        className="w-full h-auto mt-12"
      />

      {/* ══ REVIEWS ══ */}
      <section className="max-w-lg mx-auto px-4 pb-6" style={{ backgroundColor: "#f8fafc" }}>
        <h2 className="text-gray-900 font-black text-2xl mt-12 text-center mb-5">عملائنا راضون</h2>
        {["/reviews/reviews-1.webp"].map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="رأي زبون" className="w-full border border-gray-200 h-auto rounded-2xl shadow-sm" />
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
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" priority />
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