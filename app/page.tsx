"use client"

import { products } from "@/lib/products"
import { Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"



const PACK_PRICE = 250
const PACK_IDS = ["176TSC", "phone-holder", "4-in-1-retractable-charger"]

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

export default function Page() {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLElement>(null)
  const [formVisible, setFormVisible] = useState(false)

  const packProducts = products.filter((p) => PACK_IDS.includes(p.id))

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
    <div className="min-h-screen bg-gray-950 text-gray-900">

      {/* ══ HERO ══ */}
      <section className="relative min-h-dvh flex flex-col items-center justify-between px-6 pt-10 pb-8 overflow-hidden">
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
          <div className="hero-sub w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-5 text-center space-y-3">
            <p className="text-white font-black text-xl">3 منتجات بـ <span className="text-[#E8B86D]">{PACK_PRICE} درهم</span></p>
            <div className="border-t border-white/10" />
            <p className="text-white/60 text-sm line-through">بدل ما تشريهم بوحدهم بـ 390 درهم+</p>
            <p className="text-[#E8B86D] font-black text-lg">💸 وفر حتى 90 درهم — 🚚 الدفع عند الاستلام</p>
          </div>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full py-4 bg-[#E8B86D] text-black font-black text-lg rounded-2xl active:scale-95 transition-all shadow-xl shadow-[#E8B86D]/30"
          >
            اطلب دابا ↓
          </button>
        </div>

        {/* Scroll hint */}
        <div className="hero-arrow relative z-10 flex flex-col items-center gap-1">
          <svg className="w-5 h-5 text-[#E8B86D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══ PACK IMAGE ══ */}
      <div className="w-full">
        <Image src="/pages/car-pack-2.webp" alt="محتويات الباك" width={1080} height={1920} className="w-full h-auto" />
      </div>

      {/* ══ LIGHT CONTENT ══ */}
      <div className="bg-gray-50 rounded-t-[2rem] relative z-10">

        {/* ══ ORDER FORM ══ */}
        <section ref={formRef} className="max-w-lg mx-auto px-4 pt-8 pb-8" id="order-form">
          <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg">

            {/* Price banner */}
            <div className="bg-[#E8B86D] p-5 text-center">
              <p className="text-black/70 text-sm font-bold mb-1">3 منتجات + توصيل مجاني</p>
              <p className="text-black font-black text-6xl leading-none">{PACK_PRICE}</p>
              <p className="text-black/80 font-black text-xl">درهم فقط</p>
              <p className="text-black/70 text-sm font-black mt-1">💸 وفرتي أكثر من 90 درهم!</p>
              <p className="text-black/60 text-xs mt-2">ما خلّصتيش حتى توصلك الطلبية</p>
            </div>

            <div className="p-5">
              {/* Pack products list */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-4">
                <p className="text-gray-500 text-xs font-black mb-3">محتويات الباك:</p>
                <div className="space-y-2">
                  {packProducts.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <Image src={p.image} alt={p.nameDarija} fill className="object-cover" />
                      </div>
                      <div className="text-right flex-1">
                        <p className="text-gray-900 font-black text-sm">{p.nameDarija}</p>
                        <p className="text-gray-400 text-xs">{p.tagline}</p>
                      </div>
                      <Check className="w-4 h-4 text-[#E8B86D] shrink-0" strokeWidth={3} />
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">الاسم <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="كتب اسمك هنا..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-blue-400 focus:bg-white transition-colors" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="مثلاً: كازا، الرباط..."
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-blue-400 focus:bg-white transition-colors" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-black">رقم التيليفون <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="06XXXXXXXX"
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none focus:bg-white transition-colors ${
                      errors.phone ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-blue-400"
                    }`} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 btn-pulse ${
                    !loading
                      ? "bg-[#E8B86D] text-black shadow-xl shadow-[#E8B86D]/40"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      جاري إرسال طلبيتك...
                    </span>
                  ) : `🔥 طلب دابا وخلص عند الاستلام — ${PACK_PRICE} درهم`}
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
              { feature: "السعر", others: "منتوج واحد بسعر غالي", us: "3 منتجات بسعر واحد، وفر على الأقل 90 درهم" },
              { feature: "الجودة", others: "بلا ضمان على الجودة", us: "جودة مضمونة 100%" },
              { feature: "الضمان", others: "بلا ضمان", us: "ضمان شهر كامل" },
              { feature: "ما بعد البيع", others: "تشري وتمشي", us: "فريق دائم معاك" },
            ].map((row, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" dir="rtl">
                <div className="bg-gray-900 px-4 py-2">
                  <span className="text-[#E8B86D] font-black text-sm">{row.feature}</span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-4 text-center border-l border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">البائعين</p>
                    <p className="text-gray-600 font-semibold leading-snug line-through">{row.others}</p>
                  </div>
                  <div className="p-4 text-center bg-gray-950">
                    <p className="text-[10px] font-black text-[#E8B86D] uppercase tracking-widest mb-2">نحن ✦</p>
                    <p className="text-white font-black text-base leading-snug">{row.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ REVIEWS ══ */}
        <section className="max-w-lg mx-auto px-4 pb-12">
          <div className="mt-4 space-y-3">
            <p className="text-center text-gray-400 text-sm font-bold">📲 رسائل حقيقية من الزبناء</p>
            {["/reviews/reviews-1.webp"].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="رأي زبون" className="w-full h-auto rounded-2xl shadow-sm border border-gray-200" />
            ))}
          </div>
        </section>

      </div>

      {/* ══ WHATSAPP FLOAT ══ */}
      <a
        href="https://wa.me/212715307498?text=Salam"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-xl active:scale-95 transition-all"
        style={{ bottom: "80px", backgroundColor: "#25D366" }}
        aria-label="تواصل معنا على واتساب"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.649 4.942 1.883 7.115L2 30l7.115-1.863A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.88-1.603l-.42-.25-4.223 1.106 1.13-4.115-.274-.434A11.559 11.559 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.338-8.607c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.9 1.129-1.103 1.362-.203.232-.406.26-.754.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.203-.347-.022-.535.152-.708.156-.155.347-.406.52-.61.174-.202.232-.347.347-.578.116-.232.058-.435-.029-.61-.087-.174-.783-1.887-1.073-2.585-.283-.678-.57-.586-.783-.597l-.667-.012c-.232 0-.61.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.367 1.42 3.599c.174.232 2.454 3.747 5.946 5.254.831.359 1.48.573 1.986.733.834.265 1.594.228 2.194.138.669-.1 2.055-.84 2.345-1.651.29-.812.29-1.507.203-1.651-.086-.145-.318-.232-.666-.406z" />
        </svg>
      </a>

      {/* ══ STICKY BOTTOM BAR ══ */}
      {!formVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950 border-t border-white/10 px-4 py-3">
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