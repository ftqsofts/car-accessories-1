"use client"

import TrustBadges from "@/components/TrustBadges"
import { products } from "@/lib/products"
import { Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function GifVideo({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLoaded(true); obs.disconnect() }
    }, { rootMargin: "50px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (loaded && videoRef.current) videoRef.current.play().catch(() => null)
  }, [loaded])

  return (
    <div ref={containerRef} className="w-full bg-gray-100 h-[60vh] min-h-[200px]" style={{ overflow: "hidden", flexShrink: 0 }}>
      {loaded && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onVolumeChange={(e) => { const v = e.currentTarget; if (!v.muted) { v.muted = true; v.volume = 0 } }}
        />
      )}
    </div>
  )
}

const PACK_PRICE = 245
const ORIGINAL_PRICE = 349
const PACK_IDS = ["sun-door-protection", "sun-protection", "176TSC"]
const packProducts = PACK_IDS.map((id) => products.find((p) => p.id === id)!)

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

export default function CpbPage() {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [formPassed, setFormPassed] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const check = () => {
      if (!formRef.current) return
      const rect = formRef.current.getBoundingClientRect()
      setFormPassed(rect.bottom < 0)
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
    const skus = packProducts.map((p) => p.sku).join(",")
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus, qty: 3, total: PACK_PRICE }),
    }).catch(() => null)
    const params = new URLSearchParams({
      name: form.name, phone: form.phone, city: form.city,
      skus, qty: "3", total: String(PACK_PRICE), pack: "cpb",
    })
    router.push(`/thank-you?${params}`)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900" dir="rtl">

      {/* ══ COD BANNER — top of page ══ */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <Image src="/resources/cod-header-banner.webp" alt="توصيل مجاني — الدفع عند الاستلام" width={800} height={60} className="w-auto h-[50px]" priority />
      </div>

      {/* ══ HERO — dark, full screen ══ */}
      <section className="relative flex flex-col items-center justify-between px-0 pb-0 overflow-hidden" style={{ backgroundColor: "#030712", height: "calc(100vh - 50px)" }}>
        {/* Background cover */}
        <Image src="/products/car-accessories-cover-3.webp" alt="" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gray-950/90" />

        {/* Logo */}
        <div className="relative z-10 pt-4 pb-2">
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" priority />
        </div>

        {/* Badge + Title */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 gap-3">
          <span className="bg-red-500 text-white text-sm font-black px-5 py-2 rounded-full">
            ☀️ عرض خاص قبل الصيف!
          </span>
          <h1 className="hero-title glow-title font-black leading-tight w-full" style={{ fontSize: "clamp(2.4rem, 11vw, 4rem)" }}>
            الباك لي غيهنيك نتا وعائلتك
          </h1>
          <p className="text-white/80 font-bold text-lg">3 منتجات أساسية لسيارتك فالصيف</p>
        </div>

        {/* Pack image — bottom */}
        <div className="relative mt-12 z-10 w-full" style={{ flex: 1, minHeight: 0, position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/pack-b.png" alt="باك الحماية" fetchPriority="high" decoding="sync" style={{ position: "absolute", inset: 0, width: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
      </section>

      {/* ══ PACK CONTENTS + PRICE ══ */}
      <div className="bg-white px-4 pt-6 pb-2">
        <div className="max-w-lg mx-auto">
          <p className="text-gray-500 text-xs font-bold text-center mb-3 tracking-wide">شنو كاين فالباك؟</p>
          <div className="flex flex-col gap-2 mb-5">
            {packProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "#f9fafb", border: "1px solid #f3f4f6" }}>
                <div className="w-7 h-7 rounded-full bg-[#E8B86D] flex items-center justify-center shrink-0">
                  <span className="text-black font-black text-xs">{i + 1}</span>
                </div>
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image src={p.image} alt={p.nameDarija} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-black text-sm leading-tight">{p.nameDarija}</p>
                  <p className="text-gray-400 text-xs mt-0.5 truncate">{p.tagline}</p>
                </div>
                <Check className="w-4 h-4 text-[#E8B86D] shrink-0" strokeWidth={3} />
              </div>
            ))}
          </div>

          {/* Price strip */}
          <div className="rounded-2xl overflow-hidden shadow-xl mb-2" style={{ background: "#E8B86D" }}>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-black/60 text-xs font-bold mb-0.5">السعر الأصلي</p>
                <p className="text-black/40 text-xl font-black line-through">{ORIGINAL_PRICE} درهم</p>
              </div>
              <div className="bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-full">
                -{Math.round((1 - PACK_PRICE / ORIGINAL_PRICE) * 100)}%
              </div>
              <div className="text-right">
                <p className="text-black/60 text-xs font-bold mb-0.5">تدفع فقط</p>
                <p className="text-black font-black" style={{ fontSize: "clamp(2rem, 9vw, 3rem)", lineHeight: 1 }}>{PACK_PRICE} درهم</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ ORDER FORM ══ */}
      <section ref={formRef} className="bg-white px-4 pt-4 pb-8" id="order-form">
        <div className="max-w-lg mx-auto">

          {/* Urgency */}
          <p className="text-center text-red-600 font-black text-base mb-3">هام: الكمية محدودة و العرض سينتهي خلال ساعات قليلة</p>

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg" style={{ border: "2.5px dashed #E8B86D" }}>

            {/* Form header */}
            <div className="px-5 py-5 text-center" style={{ background: "#030712" }}>
              <p className="text-[#E8B86D] font-black text-xl" style={{ animation: "pulse 1.5s ease-in-out infinite" }}>للطلب ادخل معلوماتك اسفله 👇</p>
              <p className="text-white font-bold text-base mt-2">فقط عند Storecoma — باك بجودة مزيانة، ومعاه ضمان شهر كامل باش تجربو ✔️</p>
            </div>

            <div className="px-5 pb-8 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">الاسم <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="كتب اسمك هنا..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-[#E8B86D] transition-colors" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="مثلاً: كازا، الرباط..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-[#E8B86D] transition-colors" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">رقم التيليفون <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06XXXXXXXX"
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none transition-colors ${
                      errors.phone ? "border-red-400" : "border-gray-200 focus:border-[#E8B86D]"
                    }`} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-black text-md transition-all duration-200 active:scale-95 bg-[#E8B86D] text-black shadow-xl shadow-[#E8B86D]/30"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      جاري إرسال طلبيتك...
                    </span>
                  ) : `اضغط هنا للطلب 🛒`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* ══ PAIN SECTION: FAMILY PACK ══ */}
<div className="px-4 pt-10 pb-10">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-black text-gray-900 leading-tight">
      <span className="text-red-600">وليداتك كيتعدبو</span> مع الصهد فالسفر؟
    </h2>
    <p className="mt-3 text-gray-600 font-medium text-lg">
      الصيف فالمغرب صعيب، وماتخليش طوموبيلتك تولي "فران" على عائلتك!
    </p>
  </div>

  <div className="flex flex-col gap-5">

    {/* Problem 1: Kids & Sun */}
    <div className="bg-gray-100 rounded-2xl p-5 shadow-sm border-r-4 border-red-600 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">🥵</span>
        <h3 className="text-xl font-black text-gray-900">
          الشمس ضاربة ليهم فالوجه؟
        </h3>
      </div>
      <p className="text-gray-600 text-sm font-medium leading-relaxed pr-9">
        الوليدات اللور كيعانيو من الأشعة المباشرة، ما كيقدرش ينعسو مرتاحين، وهادشي كينكد عليهم وعليك السفر.
      </p>
    </div>

    {/* Problem 2: Dashboard & Interior Damage */}
    <div className="bg-gray-100 rounded-2xl p-5 shadow-sm border-r-4 border-red-600 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">🔥</span>
        <h3 className="text-xl font-black text-gray-900">
          صالون الطوموبيل كياكل الدق؟
        </h3>
      </div>
      <p className="text-gray-600 text-sm font-medium leading-relaxed pr-9">
        فاش كتخلي طوموبيلتك فالشمش، الحرارة كتوصل لدرجات خيالية، هادشي كيفركع الجلد، كيخسر الطابلو د بور، وكيطيح قيمة السيارة فالسوق.
      </p>
    </div>

    {/* Problem 3: Messy Car */}
    <div className="bg-gray-100 rounded-2xl p-5 shadow-sm border-r-4 border-red-600 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">🧹</span>
        <h3 className="text-xl font-black text-gray-900">
          الروينة د الماكلة وبقايا السفر؟
        </h3>
      </div>
      <p className="text-gray-600 text-sm font-medium leading-relaxed pr-9">
        فرتيت البيسكوي والرملة د البحر كيتجمعو فالبلايص الصعاب، ومع السخونية كيديرو ريحة خايبة وكيوليو بؤرة للجراثيم وسط الطوموبيل.
      </p>
    </div>

  </div>
</div>

      {/* ══ LIGHT CONTENT ══ */}
      <div className="bg-white">

        {/* ══ PRODUCT DETAILS ══ */}
        <div className="px-4 pt-4 pb-2 text-center">
          <h2 className="text-3xl font-black text-gray-900 leading-tight">3 منتجات — راحة كاملة للعائلة</h2>
          <p className="text-gray-500 mt-2 text-base leading-relaxed">جمعنا ليك كلشي باش تسافر وتصوق مرتاح</p>
        </div>

        <div className="px-4 pb-6" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {packProducts.map((product, i) => (
            <div key={product.id} className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
              {product.videoUrl
                ? <GifVideo src={product.videoUrl} />
                : <div className="w-full bg-gray-100" style={{ height: 260, overflow: "hidden" }}>
                    <div className="relative w-full h-full">
                      <Image src={product.image} alt={product.nameDarija} fill className="object-cover" />
                    </div>
                  </div>
              }
              <div className="px-5 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#E8B86D] flex items-center justify-center shrink-0">
                    <span className="text-black font-black text-xs">{i + 1}</span>
                  </div>
                  <h3 className="text-gray-900 font-black text-xl leading-tight">{product.nameDarija}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {product.featuresDarija.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#E8B86D] shrink-0" strokeWidth={3} />
                      <span className="text-gray-700 text-sm font-semibold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ SECOND CTA ══ */}
        <div className="px-4 pb-6">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 bg-[#E8B86D] text-black shadow-xl shadow-[#E8B86D]/30 max-w-lg mx-auto block"
          >
            🛒 اضغط هنا للطلب — {PACK_PRICE} درهم
          </button>
        </div>

        {/* ══ MYSTERY GIFT ══ */}
        <div className="px-4 pb-6 hidden">
          <div className="max-w-lg mx-auto rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", border: "1px solid #E8B86D44" }}>
            <p className="text-3xl mb-2">🎁</p>
            <p className="text-[#E8B86D] font-black text-lg">هدية مع كل طلب!</p>
            <p className="text-white/60 text-sm mt-1">كل زبون كيثق فـ Storecoma كيستاهل هدية</p>
          </div>
        </div>

        {/* ══ WHY US COMPARISON ══ */}
        <section className="max-w-lg mx-auto px-4 pb-10">
          <div className="text-center mb-5">
            <span className="inline-block bg-gray-900 text-[#E8B86D] text-xs font-black px-4 py-1.5 rounded-full mb-3">⚡ الفرق واضح</span>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">علاش الزبناء كيختارو Storecoma؟</h2>
          </div>
          <div className="grid grid-cols-2 mb-2 px-1">
            <p className="text-center text-xs font-black text-gray-400">البائعين الآخرين ❌</p>
            <p className="text-center text-xs font-black text-[#E8B86D]">Storecoma ✅</p>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
            {[
              { feature: "الجودة", others: "بلا ضمان على الجودة", us: "جودة مضمونة 100%" },
              { feature: "الضمان", others: "بلا ضمان", us: "ضمان شهر كامل" },
              { feature: "ما بعد البيع", others: "تشري وتمشي", us: "فريق دائم معاك" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2" style={{ borderTop: i === 0 ? "none" : "1px solid #f3f4f6" }}>
                <div className="px-4 py-7 bg-white text-center" style={{ borderLeft: "1px solid #f3f4f6" }}>
                  <p className="text-[10px] font-black text-gray-300 mb-2">{row.feature}</p>
                  <p className="text-gray-400 text-sm leading-snug line-through">{row.others}</p>
                </div>
                <div className="px-4 py-7 text-center" style={{ backgroundColor: "#030712" }}>
                  <p className="text-[10px] font-black text-[#E8B86D]/60 mb-2">{row.feature}</p>
                  <p className="text-white font-black text-sm leading-snug">{row.us}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ REVIEWS ══ */}
        <section className="max-w-lg mx-auto px-4 pb-6">
          <p className="text-center text-gray-400 text-sm font-bold mb-3">📲 رسائل حقيقية من الزبناء</p>
          {["/reviews/reviews-1.webp"].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="رأي زبون" className="w-full h-auto rounded-2xl border border-gray-200 shadow-sm" />
          ))}
        </section>

        <TrustBadges />

        {/* ══ WHATSAPP CTA ══ */}
        <section className="max-w-lg mx-auto px-4 pb-24 hidden">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center space-y-4 shadow-sm">
            <p className="text-gray-900 font-black text-xl">عندك سؤال؟ تواصل معنا مباشرة</p>
            <p className="text-gray-400 text-sm">فريقنا مساند ليك على واتساب — رد سريع</p>
            <a
              href="https://wa.me/212715307498?text=Salam"
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

      </div>

      {/* ══ STICKY BOTTOM BAR ══ */}
      {formPassed && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <style>{`@keyframes btnBounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }`}</style>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full bg-[#E8B86D] text-black font-black text-base py-4 rounded-2xl active:scale-95 shadow-xl shadow-[#E8B86D]/40"
            style={{ animation: "btnBounce 1.2s ease-in-out infinite" }}
          >
            ☀️ طلب باك العائلة — {PACK_PRICE} درهم
          </button>
        </div>
      )}
    </div>
  )
}