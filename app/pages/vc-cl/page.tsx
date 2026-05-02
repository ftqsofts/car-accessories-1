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
    <div className="min-h-screen text-white" dir="rtl" style={{ backgroundColor: "#000000", fontFamily: "Cairo, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        @keyframes btnPulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0.5); } 50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(59,130,246,0); } }
        @keyframes glow { 0%,100% { text-shadow: 0 0 20px rgba(255,255,255,0.3); } 50% { text-shadow: 0 0 40px rgba(255,255,255,0.7), 0 0 80px rgba(59,130,246,0.4); } }
        @keyframes btnBounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .btn-pulse { animation: btnPulse 2s ease-in-out infinite; }
        .glow-text { animation: glow 3s ease-in-out infinite; }
      `}</style>

      {/* ══ COD BANNER — top of page ══ */}
        <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
            <Image src="/resources/cod-header-banner.webp" alt="توصيل مجاني — الدفع عند الاستلام" width={800} height={60} className="w-auto h-[45px]" priority />
        </div>

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center text-center px-5 overflow-hidden" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        {/* Logo */}
        <div className="relative z-10 pb-2">
            <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" priority />
        </div>
        {/* Glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />

        <span className="bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full mb-4">🔥 الأكثر طلباً في المغرب</span>

        <h1 className="glow-text font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}>
          أقوى أسبيراتور محمولة 4 في 1
        </h1>
        <p className="text-white/70 text-lg font-bold mb-6 leading-relaxed">
          نقي دارك وطوموبيلتك في دقائق وبلا مجهود — بقوة شفط خيالية كتوصل لـ <span className="text-blue-400 font-black">9000PA</span>
        </p>

        {/* Product image with glow */}
        <div className="relative w-full max-w-sm mx-auto mb-8">
          <img
            src="/products/vacuum-4in-1-preview.webp"
            alt="لاسبيراتور 4 في 1"
            className="w-full h-auto rounded-3xl relative z-10"
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        
        {/* breakdown image with title */}
        <div className="w-full mt-4">
          <p className="text-blue-400 text-xs font-black tracking-widest uppercase text-center mb-1">شنو كاين فيها؟</p>
          <p className="text-white font-black text-xl text-center mb-3" style={{ fontSize: "clamp(1.2rem, 6vw, 1.6rem)" }}>هادا ماشي السبيراتور العادي هاد الموديل راه مجرّب ومعروف بالقوة ديالو</p>
          
          <img src="/products/vc-cl-features.webp" alt="" className="w-full h-auto block" />

        </div>
      </section>

      {/* ══ IN USE GALLERY ══ */}
      <div className="px-5 pt-2 pb-8" style={{ backgroundColor: "#030712" }}>
        <p className="text-blue-400 text-xs font-black tracking-widest uppercase text-center mb-1">شوفيه فالواقع</p>
        <p className="text-white font-black text-center mb-5" style={{ fontSize: "clamp(1.2rem, 6vw, 1.6rem)" }}>يستعمل فكل بلاصة</p>
        <div className="max-w-lg mx-auto grid grid-cols-2 hidden gap-3">
          {/* slot 1 */}
          <div className="rounded-2xl overflow-hidden aspect-square bg-white/5 flex flex-col items-center justify-center relative" style={{ border: "1px solid rgba(59,130,246,0.15)" }}>
            {/* replace src below with your real image */}
            {/* <img src="/products/in-use-salon.jpg" className="w-full h-full object-cover" alt="تنظيف الصالون" /> */}
            <span className="text-4xl">🏠</span>
            <p className="text-white/30 text-xs mt-2 font-bold">صورة الدار</p>
          </div>
          {/* slot 2 */}
          <div className="rounded-2xl overflow-hidden aspect-square bg-white/5 flex flex-col items-center justify-center relative" style={{ border: "1px solid rgba(59,130,246,0.15)" }}>
            {/* <img src="/products/in-use-car.jpg" className="w-full h-full object-cover" alt="تنظيف الطوموبيل" /> */}
            <span className="text-4xl">🚗</span>
            <p className="text-white/30 text-xs mt-2 font-bold">صورة الطوموبيل</p>
          </div>
          {/* slot 3 */}
          <div className="rounded-2xl overflow-hidden aspect-square bg-white/5 flex flex-col items-center justify-center relative" style={{ border: "1px solid rgba(59,130,246,0.15)" }}>
            {/* <img src="/products/in-use-carpet.jpg" className="w-full h-full object-cover" alt="تنظيف الزربية" /> */}
            <span className="text-4xl">🪣</span>
            <p className="text-white/30 text-xs mt-2 font-bold">صورة الزربية</p>
          </div>
          {/* slot 4 */}
          <div className="rounded-2xl overflow-hidden aspect-square bg-white/5 flex flex-col items-center justify-center relative" style={{ border: "1px solid rgba(59,130,246,0.15)" }}>
            {/* <img src="/products/in-use-sofa.jpg" className="w-full h-full object-cover" alt="تنظيف الكراسي" /> */}
            <span className="text-4xl">🛋️</span>
            <p className="text-white/30 text-xs mt-2 font-bold">صورة الكنابي</p>
          </div>
        </div>

        {/* Video in use */}
        <div className="max-w-lg mx-auto mt-4 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(59,130,246,0.2)", boxShadow: "0 0 30px rgba(59,130,246,0.1)" }}>
          <video
            src="/products/cleaner-4-in-1-window.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: "center center", display: "block" }}
          />
        </div>
      </div>

      {/* ══ ORDER FORM ══ */}
      <section ref={formRef} className="px-5 py-8" id="order-form" style={{ backgroundColor: "#030712" }}>
        <div className="max-w-lg mx-auto">

          {/* ── QTY SELECTOR ── */}
          <p className="text-center text-white font-black text-lg mb-3">اختاري الكمية 👇</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* 1 unit */}
            <button
              type="button"
              onClick={() => setQty(1)}
              className="rounded-2xl p-4 text-center transition-all active:scale-95"
              style={{
                border: qty === 1 ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.1)",
                background: qty === 1 ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
                boxShadow: qty === 1 ? "0 0 20px rgba(59,130,246,0.2)" : "none",
              }}
            >
              <p className="text-white font-black text-base">1️⃣ وحدة</p>
              <p className="text-blue-400 font-black text-2xl mt-1">{PRICE_1} درهم</p>
              {qty === 1 && <p className="text-blue-400 text-xs mt-1 font-bold">✓ محدد</p>}
            </button>
            {/* 2 units */}
            <button
              type="button"
              onClick={() => setQty(2)}
              className="rounded-2xl p-4 text-center transition-all active:scale-95 relative"
              style={{
                border: qty === 2 ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.1)",
                background: qty === 2 ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
                boxShadow: qty === 2 ? "0 0 20px rgba(59,130,246,0.2)" : "none",
              }}
            >
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">وفري 75 درهم</span>
              <p className="text-white font-black text-base">🛒 محتاجة جوج؟</p>
              <p className="text-white/40 text-[11px] mt-1">وحدة للدار + وحدة للطوموبيل</p>
              <p className="text-blue-400 font-black text-2xl mt-1">{PRICE_2} درهم</p>
              {qty === 2 && <p className="text-blue-400 text-xs mt-1 font-bold">✓ محدد</p>}
            </button>
          </div>

          <p className="text-center text-red-400 font-black text-sm mb-3">⏳ الكمية محدودة و العرض سينتهي خلال ساعات قليلة</p>
          <div className="rounded-3xl overflow-hidden" style={{ border: "2.5px dashed rgba(59,130,246,0.6)", boxShadow: "0 0 40px rgba(59,130,246,0.1)" }}>
            <div className="px-5 py-5 text-center" style={{ background: "rgba(59,130,246,0.1)", borderBottom: "1px solid rgba(59,130,246,0.2)" }}>
              <p className="text-blue-300 font-black text-xl" style={{ animation: "btnPulse 1.5s ease-in-out infinite" }}>للطلب ادخلي معلوماتك اسفله 👇</p>
              <p className="text-white/70 font-bold text-sm mt-1">توصيل مجاني + الدفع عند الاستلام ✅</p>
            </div>
            <div className="px-5 pb-8 pt-6" style={{ background: "rgba(0,0,0,0.6)" }}>
              <form onSubmit={handleSubmit} className="space-y-5 py-8">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
                <div>
                  <label className="block text-sm text-white/70 mb-2 font-black">الاسم الكامل <span className="font-normal text-white/30">(اختياري)</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="كتبي اسمك هنا..."
                    className="w-full rounded-xl px-4 py-4 text-white text-base placeholder-white/50 outline-none transition-colors focus:border-blue-400"
                    style={{ background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.35)" }} />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2 font-black">المدينة <span className="font-normal text-white/30">(اختياري)</span></label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="مثلاً: كازا، الرباط..."
                    className="w-full rounded-xl px-4 py-4 text-white text-base placeholder-white/50 outline-none transition-colors focus:border-blue-400"
                    style={{ background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.35)" }} />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2 font-black">رقم التيليفون <span className="text-red-400">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06XXXXXXXX"
                    className="w-full rounded-xl px-4 py-4 text-white text-base placeholder-white/50 outline-none transition-colors focus:border-blue-400"
                    style={{ background: "rgba(255,255,255,0.1)", border: errors.phone ? "2px solid #f87171" : "2px solid rgba(255,255,255,0.35)" }} />
                  {errors.phone && <p className="text-red-400 text-sm mt-1 font-bold">{errors.phone}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-black text-lg text-white transition-all duration-200 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
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
    <section className="max-w-lg mx-auto px-4 pb-6">
        <h2 className="text-white font-black text-2xl mt-12 text-center mb-5">عملائنا راضون </h2>
        {["/reviews/reviews-1.webp"].map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={src} alt="رأي زبون" className="w-full border border-gray-500 h-auto rounded-2xl shadow-sm" />
        ))}
    </section>

      {/* ══ TRUST BADGES ══ */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <h2 className="text-white font-black text-2xl text-center mb-6">الضمانات والاسترجاع</h2>
        <div className="flex flex-col gap-3">
          {[
            { img: "/icons/waraico.webp", title: "ضمان المنتج", sub: "ضمان لمدة 30 يوم — ماعجبكيش كنرجعو ليك الفلوس" },
            { img: "/icons/codincon.webp", title: "جرب عاد خلصي", sub: "ماغادي تخلصي حتى شي حتى توصلك المنتج وتفحصيه" },
            { img: "/icons/cussup.webp", title: "خدمة ما بعد البيع", sub: "فريق العملاء تحت تصرفك طيلة أيام الأسبوع" },
            { img: "/icons/shipico.webp", title: "شحن سريع وموثوق", sub: "كنشحنو لجميع المدن خلال 24h إلى 48h" },
          ].map((item, i) => (
            <div key={i} className="px-5 py-6 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.15)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-16 w-auto mx-auto mb-3 object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.85)" }} />
              <p className="text-white font-black text-base mb-1">{item.title}</p>
              <p className="text-white/50 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer className="px-5 py-8 mb-18 text-center" style={{ backgroundColor: "#030712", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ border: "1px solid rgba(59,130,246,0.3)" }}>
          🚚 توصيل مجاني لجميع مدن المغرب
        </div>
        <p className="text-white/30 text-xs">© 2025 Storecoma — جميع الحقوق محفوظة</p>

        {/* Logo */}
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
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 0 30px rgba(59,130,246,0.5)", animation: "btnBounce 1.2s ease-in-out infinite" }}
          >
            🔥 طلبيه دابا — الدفع عند الاستلام
          </button>
        </div>
      )}
    </div>
  )
}