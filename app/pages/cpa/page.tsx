"use client"

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
    <div ref={containerRef} className="w-full bg-gray-100" style={{ height: 600, overflow: "hidden", flexShrink: 0 }}>
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

const PACK_PRICE = 275
const PACK_IDS = ["176TSC", "phone-holder", "4-in-1-retractable-charger"]
const packProducts = products.filter((p) => PACK_IDS.includes(p.id))

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

export default function CpaPage() {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [formVisible, setFormVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
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
      skus, qty: "3", total: String(PACK_PRICE),
    })
    router.push(`/thank-you?${params}`)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900" dir="rtl">

      {/* ══ HERO — dark ══ */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-between px-6 pb-0 overflow-hidden" style={{ backgroundColor: "#030712" }}>
        <Image src="/products/car-accessories-cover-3.webp" alt="" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gray-950/78" />

        {/* Logo */}
        <div className="hero-logo relative z-10">
          <Image src="/storecoma-logo.png" alt="storecoma" width={90} height={55} className="object-contain" />
        </div>

        {/* Center */}
        <div className="relative z-10 flex flex-col items-center text-center gap-5 w-full">
          <div className="hero-badge">
            <span className="bg-red-500 text-white text-sm font-black px-5 py-2 rounded-full">
              🔥 عرض الصيف المحدود!
            </span>
          </div>

          <h1 className="hero-title glow-title font-black leading-tight w-full" style={{ fontSize: "clamp(2.8rem, 13vw, 4.5rem)" }}>
            باك إكسسوارات السيارة
          </h1>
        </div>
        
        {/* Pack image — inside hero */}
        <div className="relative w-screen overflow-hidden z-20" style={{ height: 320, borderRadius: 20 }}>
          <Image src="/products/pack-a-4.png" alt="باك إكسسوارات السيارة" fill className="object-cover object-center" />
        </div>
        
        {/* Gradient transition dark → light */}
        <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ bottom: -1, height: 220, background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.7) 65%, rgba(255,255,255,0.95) 85%, #ffffff 100%)" }} />
        
        
      </section>



      

      {/* ══ LIGHT CONTENT ══ */}
      <div className="bg-white">

        {/* ══ WHY THIS PACK ══ */}
        <div className="px-4 pt-6 pb-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <span className="inline-block bg-gray-900 text-[#E8B86D] text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-wide">🚨 واش هاد المشاكل تعرفها؟</span>
              <h2 className="text-3xl font-black text-gray-900 leading-tight">كل راجل عندو طوموبيل محتاج هاد الباك</h2>
            </div>
           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  emoji: "🤧",
                  problem: "كتحشم تركب معاك شي حد حيت الطوموبيل ديما عامرة غبرة فكل قنت؟",
                  solution: "الاسبيراتور 4 فـ 1 قوي بزاف، كيجبد أصعب الأوساخ من أضيق البلايص فثواني باش تبقى طوموبيلتك ديما نقية كتشعل.",
                },
                {
                  emoji: "🔌",
                  problem: "عييتي من روينة الكابليات مخبلين، والتيليفون ديما كيطفى ليك فالطريق؟",
                  solution: "شارجور 4 فـ 1 كيشحن 4 أجهزة فدقة بشحن سريع، مع إضاءة نجوم كتعطي منظر فخم لسيارتك بالليل.",
                },
                {
                  emoji: "📵",
                  problem: "التيليفون ديما كيطيح ليك فالدودان، والسياقة بيد وحدة مغامرة بحياتك؟",
                  solution: "سيبورة مغناطيسية كتشد التيليفون بحال الحجر.. تبع الـ GPS وركز فطريقك بكل راحة وأمان.",
                },
                {
                  emoji: "💸",
                  problem: "تضيع فلوسك وتشري هاد المنتجات مفرقة بأكثر من 390 درهم فالسوق؟",
                  solution: "خوذ الباك الشامل بـ 275 درهم فقط! وفرتي 115 درهم فدقة وحدة وهنيتي راسك من مشاكل الطوموبيل.",
                },
              ].map((item, i) => (
                <div key={i} className="px-5 py-5 bg-white rounded-2xl shadow-sm" style={{ borderRight: "4px solid #E8B86D" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{item.emoji}</span>
                    <div>
                      <p className="text-gray-900 font-black text-base leading-tight mb-2">{item.problem}</p>
                      <p className="text-gray-600 text-sm leading-snug">✅ {item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ PACK CONTENTS INTRO ══ */}
        <div className="px-4 pt-4 pb-6 text-center">
          <span className="bg-[#E8B86D]/15 text-[#E8B86D] text-xs font-black px-4 py-1.5 rounded-full border border-[#E8B86D]/30">شنو كاين فالباك؟</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4 leading-tight">3 منتجات — حل كامل لطوموبيلتك</h2>
          <p className="text-gray-500 mt-2 text-base leading-relaxed">كل منتج مختار بعناية باش تكون سيارتك نظيفة، منظمة، وآمنة</p>
        </div>

        {/* ══ PRODUCT SECTIONS ══ */}
        <div className="px-4 pb-6" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {packProducts.map((product, i) => (
            <div key={product.id} className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">

              {/* Autoplay video — acts as GIF */}
              {product.videoUrl
                ? <GifVideo src={product.videoUrl} />
                : <div className="w-full bg-gray-100" style={{ height: 260, overflow: "hidden" }}>
                    <div className="relative w-full h-full">
                      <Image src={product.image} alt={product.nameDarija} fill className="object-cover" />
                    </div>
                  </div>
              }

              {/* Name + features */}
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

        {/* ══ URGENCY ══ */}
        <div className="px-4 pb-6">
          <div className="max-w-lg mx-auto rounded-2xl p-4 text-center bg-red-200">
            <p className="text-red-900 font-black text-lg">⏳ هاد العرض من Storecoma محدود جدا</p>
            <p className="text-red-800 text-sm font-bold mt-1">نظرا للسطوك قليل — لا تفوّت الفرصة</p>
          </div>
        </div>

        {/* ══ ORDER FORM ══ */}
        <section ref={formRef} className="max-w-lg mx-auto px-4 pb-8" id="order-form">
          <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg">

            {/* Price banner */}
            <div className="bg-[#E8B86D] p-5 text-center">
              <p className="text-black/70 text-sm font-bold mb-1">3 منتجات + توصيل مجاني</p>
              <p className="text-black font-black text-6xl leading-none">{PACK_PRICE}</p>
              <p className="text-black/80 font-black text-xl">درهم فقط</p>
              <p className="text-black/70 text-sm font-black mt-1">💸 وفرتي أكثر من 115 درهم!</p>
              <p className="text-black/60 text-xs mt-2">ما خلّصتيش حتى توصلك الطلبية</p>
            </div>

            {/* Pack summary */}
            <div className="px-5 pt-5 pb-3">
              <p className="text-gray-400 text-xs font-black mb-3">ما كاين فالباك:</p>
              <div className="space-y-3">
                {packProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <Image src={p.image} alt={p.nameDarija} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-black text-sm">{p.nameDarija}</p>
                      <p className="text-gray-400 text-xs">{p.tagline}</p>
                    </div>
                    <Check className="w-4 h-4 text-[#E8B86D] shrink-0" strokeWidth={3} />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 pb-6 pt-3 border-t border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">الاسم <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="كتب اسمك هنا..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-[#E8B86D] transition-colors" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="مثلاً: كازا، الرباط..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-[#E8B86D] transition-colors" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">رقم التيليفون <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06XXXXXXXX"
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none transition-colors ${
                      errors.phone ? "border-red-400" : "border-gray-200 focus:border-[#E8B86D]"
                    }`} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 bg-[#E8B86D] text-black shadow-xl shadow-[#E8B86D]/30"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      جاري إرسال طلبيتك...
                    </span>
                  ) : `طلب دابا وخلص عند الاستلام — ${PACK_PRICE} درهم`}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ══ WHY US COMPARISON ══ */}
        <section className="max-w-lg mx-auto px-4 pb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">علاش الزبناء كيختارو يشريو من عندنا؟</h2>
            <p className="text-gray-500 text-base leading-relaxed">ماشي كاع البائعين كيعطيو نفس الجودة،<br />حنا كنضمنو ليك راحتك وتجربة أحسن.</p>
          </div>
          <div className="space-y-3">
            {[
              { feature: "السعر", others: "منتوج واحد بسعر غالي", us: "3 منتجات بسعر واحد، وفر 115 درهم" },
              { feature: "الجودة", others: "بلا ضمان على الجودة", us: "جودة مضمونة 100%" },
              { feature: "الضمان", others: "بلا ضمان", us: "ضمان شهر كامل" },
              { feature: "ما بعد البيع", others: "تشري وتمشي", us: "فريق دائم معاك" },
            ].map((row, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="bg-gray-900 px-4 py-2">
                  <span className="text-[#E8B86D] font-black text-sm">{row.feature}</span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-4 text-center border-l border-gray-100 bg-white">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">البائعين</p>
                    <p className="text-gray-400 font-semibold leading-snug line-through text-sm">{row.others}</p>
                  </div>
                  <div className="p-4 text-center bg-gray-950">
                    <p className="text-[10px] font-black text-[#E8B86D] uppercase tracking-widest mb-2">نحن ✦</p>
                    <p className="text-white font-black text-sm leading-snug">{row.us}</p>
                  </div>
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

        {/* ══ WHATSAPP CTA ══ */}
        <section className="max-w-lg mx-auto px-4 pb-24">
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
      {!formVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full bg-[#E8B86D] text-black font-black text-base py-4 rounded-2xl active:scale-95 transition-all shadow-xl shadow-[#E8B86D]/30"
          >
            🔥 طلب دابا وخلص عند الاستلام — {PACK_PRICE} درهم
          </button>
        </div>
      )}
    </div>
  )
}
