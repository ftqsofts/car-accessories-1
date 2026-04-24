"use client"

import { products } from "@/lib/products"
import { Check, ShieldCheck, ShoppingBag, Star, Truck, Wallet } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRICE_2 = 219
const PRICE_3 = 299
const MAX_SELECT = 3

const PRODUCT_META: Record<string, { badge: string; microCopy: string }> = {
  "car-vacuum":         { badge: "🔥 الأكثر طلباً",      microCopy: "كينفعك يومياً بلا صداع" },
  "fast-charger":       { badge: "⭐ اختيار الزبناء",    microCopy: "ما تبقاش تتهم فبطارية الهاتف" },
  "phone-holder":       { badge: "🔥 الأكثر طلباً",      microCopy: "أمان أكثر وانت كاتسوق" },
  "sun-protection":     { badge: "☀️ ضروري فالصيف",      microCopy: "خلي كارك باردة حتى فالعز" },
  "sun-door-protection":{ badge: "مثالي للعائلة",    microCopy: "راحة ليك ولولادك فالطريق" },
  "fm-transmitter":     { badge: "⭐ اختيار الزبناء",    microCopy: "حول كارك لسمارت كار فثواني" },
}

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

export default function Page() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
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

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_SELECT
        ? [...prev, id]
        : prev
    )

  const selectedProducts = products.filter((p) => selected.includes(p.id))
  const total = selected.length === 3 ? PRICE_3 : selected.length >= 2 ? PRICE_2 : 0
  const canOrder = selected.length >= 2

  const validate = () => {
    const e: Partial<OrderForm> = {}
    if (!form.phone.trim()) e.phone = "رقم الهاتف مطلوب"
    else if (!/^[0-9+\s]{9,15}$/.test(form.phone.trim())) e.phone = "رقم الهاتف غير صحيح"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!canOrder || !validate()) return
    if (form._hp) return
    setLoading(true)
    const skus = selectedProducts.map((p) => p.id).join(";")
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus, qty: selected.length, total }),
    }).catch(() => null)
    const params = new URLSearchParams({
      name: form.name, phone: form.phone, city: form.city,
      skus, qty: String(selected.length), total: String(total),
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
            <p className="text-white font-black text-xl">ختار جوج منتجات بـ <span className="text-[#E8B86D]">219 درهم</span></p>
            <div className="border-t border-white/10" />
            <p className="text-white font-black text-xl">أو 3 منتجات بـ <span className="text-[#E8B86D]">299 درهم</span></p>
            <div className="border-t border-white/10" />
            <p className="text-white/60 text-sm line-through">بدل ما تشريهم بوحدهم بـ 390 درهم+</p>
            <p className="text-[#E8B86D] font-black text-lg">💸 وفر حتى 90 درهم — 🚚 الدفع عند الاستلام</p>
          </div>

          {/* <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full py-4 bg-[#E8B86D] text-black font-black text-lg rounded-2xl active:scale-95 transition-all shadow-xl shadow-[#E8B86D]/30"
          >
            اختار الباك ديالك دابا ↓
          </button> */}
        </div>

        {/* Scroll hint */}
        <div className="hero-arrow relative z-10 flex flex-col items-center gap-1">
          <svg className="w-5 h-5 text-[#E8B86D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══ LIGHT CONTENT ══ */}
      <div className="bg-gray-50 rounded-t-[2rem] pt-8">

        {/* ══ WHY THIS PACK ══ */}
        <div className="max-w-lg mx-auto px-4 mb-8">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">علاش هاد الباك غادي يعجبك؟</h2>
          <p className="text-gray-400 text-sm text-center mb-5">مقارنة مع الشراء بوحدو من السوق</p>
          <div className="bg-gray-900 rounded-3xl overflow-hidden divide-y divide-white/10">
            {[
              { icon: <ShoppingBag className="w-6 h-6" />, title: "كلشي فباك واحد", sub: "بلا تنقل، بلا بحث — كلشي لي محتاجو فطوموبيلك" },
              { icon: <Wallet className="w-6 h-6" />, title: "وفر حتى 90 درهم", sub: "أرخص بكثير من شراء كل منتج بوحدو" },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "جودة عالية مضمونة", sub: "كل منتج فالباك مختار بعناية — ماشي أي حاجة، غير الأحسن" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-8">
                <div className="size-14 rounded-2xl bg-[#E8B86D]/15 flex items-center justify-center shrink-0 text-[#E8B86D]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-tight">{item.title}</p>
                  <p className="text-white/70 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PRODUCT SELECTION ══ */}
        <div className="max-w-lg mx-auto px-4 mb-4">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-1">👇 ختار المنتجات ديالك</h2>
          <p className="text-gray-500 text-base text-center font-bold mb-4">خاصك تختار 2 ولا 3 منتجات</p>

          {/* Price indicator */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className={`rounded-2xl p-4 text-center border-2 transition-all ${selected.length >= 2 && selected.length < 3 ? "border-[#E8B86D] bg-[#E8B86D]/10" : "border-gray-200 bg-white"}`}>
              <p className="text-xs font-black text-gray-400 mb-1">2 منتجات</p>
              <p className="text-2xl font-black text-gray-900">{PRICE_2} <span className="text-sm">درهم</span></p>
            </div>
            <div className={`rounded-2xl p-4 text-center border-2 transition-all ${selected.length === 3 ? "border-[#E8B86D] bg-[#E8B86D]/10" : "border-gray-200 bg-white"}`}>
              <p className="text-xs font-black text-gray-400 mb-1">3 منتجات</p>
              <p className="text-2xl font-black text-gray-900">{PRICE_3} <span className="text-sm">درهم</span></p>
              <p className="text-[10px] text-[#C8962A] font-black">الأوفر!</p>
            </div>
          </div>

          {/* Counter — sticky */}
          <div className={`sticky top-0 z-30 rounded-2xl px-4 py-3 text-center border mb-5 transition-all shadow-md ${
            canOrder ? "bg-[#E8B86D] border-[#E8B86D]" : "bg-gray-900 border-gray-900"
          }`}>
            {canOrder ? (
              <p className="text-black font-black text-base">✔️ اخترتي: {selected.length} / {MAX_SELECT} — {total} درهم</p>
            ) : (
              <p className="text-white font-black text-base">⚠️ خاصك تختار على الأقل جوج منتجات</p>
            )}
          </div>
        </div>

        {/* Product cards */}
        <section className="max-w-lg mx-auto px-4 pb-6">
          <div className="flex flex-col gap-5">
            {products.map((product) => {
              const isSelected = selected.includes(product.id)
              const isExpanded = expandedId === product.id
              const isMaxed = selected.length >= MAX_SELECT && !isSelected
              const meta = PRODUCT_META[product.id]
              return (
                <div
                  key={product.id}
                  className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? "border-[#E8B86D] shadow-lg shadow-[#E8B86D]/20"
                      : "border-gray-200 shadow-sm"
                  }`}
                >
                  {/* Image */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : product.id)}
                    className="relative w-full h-72 bg-gray-900 overflow-hidden block"
                  >
                    <Image
                      src={product.image}
                      alt={product.nameDarija}
                      fill
                      className="object-cover"
                      sizes="(max-width: 512px) 100vw, 512px"
                      priority={product.id === products[0].id}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Social proof badge top-left */}
                    <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/10">
                      {meta.badge}
                    </span>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-[#E8B86D] rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-black" strokeWidth={3} />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 left-0 p-4 text-right">
                      <p className="text-white font-black text-xl leading-tight mb-1">{product.nameDarija}</p>
                      <p className="text-[#E8B86D] font-bold text-sm mb-1">{product.tagline}</p>
                      <p className="text-white/60 text-xs">{meta.microCopy}</p>
                    </div>
                    <div className="absolute bottom-4 left-2 flex justify-center">
                      <span className="text-xs text-white/60 font-bold">{isExpanded ? "اضغط لإخفاء ▲" : "اضغط للتفاصيل ▼"}</span>
                    </div>
                  </button>

                  {/* Stat */}
                  <div className="bg-gray-900 px-4 py-3 text-right">
                    <p className="text-white font-black text-4xl leading-none">{product.statNumber}</p>
                    <p className="text-gray-400 text-md font-semibold mt-1">{product.statLabel}</p>
                  </div>

                  {/* Collapsible */}
                  {isExpanded && (
                    <div className="bg-gray-900 border-t border-white/10">
                      {product.videoUrl && (
                        <video src={product.videoUrl} autoPlay muted loop playsInline preload="none" className="w-full" />
                      )}
                      <div className="px-5 pb-5 pt-4 space-y-4">
                        <p className="text-white text-base leading-loose font-medium">{product.descriptionDarija}</p>
                        <div className="border-t border-white/10 pt-4 space-y-3">
                          {product.featuresDarija.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-[#E8B86D] flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                              </div>
                              <span className="text-white font-bold text-base">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Select button */}
                  <button
                    onClick={() => toggle(product.id)}
                    disabled={isMaxed}
                    className={`w-full text-base font-black py-4 transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? "bg-gray-900 text-[#E8B86D]"
                        : isMaxed
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#E8B86D] text-black"
                    }`}
                  >
                    {isSelected ? "✓ مختار — اضغط لإلغاء" : isMaxed ? "وصلتي للحد الأقصى" : "بغيت هاد المنتج"}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* ══ URGENCY ══ */}
        <div className="max-w-lg mx-auto px-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600 font-black text-lg">⏳ هاد العرض من Storecoma محدود جدا</p>
            <p className="text-red-500 text-sm font-bold mt-1">نظرا للسطوك قليل — لا تفوّت الفرصة</p>
          </div>
        </div>

        {/* ══ ORDER FORM ══ */}
        <section ref={formRef} className="max-w-lg mx-auto px-4 pb-8" id="order-form">
          <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg">

            {/* Price banner */}
            <div className={`p-5 text-center transition-all ${canOrder ? "bg-[#E8B86D]" : "bg-gray-900"}`}>
              {canOrder ? (
                <>
                  <p className="text-black/70 text-sm font-bold mb-1">{selected.length} منتجات + توصيل مجاني</p>
                  <p className="text-black font-black text-6xl leading-none">{total}</p>
                  <p className="text-black/80 font-black text-xl">درهم فقط</p>
                  <p className="text-black/60 text-xs mt-2">ما خلّصتيش حتى توصلك الطلبية</p>
                </>
              ) : (
                <>
                  <p className="text-white font-black text-lg mb-1">📦 دير الطلب ديالك دابا</p>
                  <p className="text-white/60 text-sm">عمّر المعلومات وغادي نتاصلوا بيك فأقرب وقت</p>
                </>
              )}
            </div>

            <div className="p-5">
              {selected.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-4">
                  <p className="text-gray-500 text-xs font-black mb-3">المنتجات اللي اخترتيها:</p>
                  <div className="space-y-2">
                    {selectedProducts.map((p) => (
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
              )}

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
                  disabled={!canOrder || loading}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 ${
                    canOrder && !loading
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
                  ) : canOrder
                    ? `طلب دابا وخلص عند الاستلام — ${total} درهم`
                    : "اختار منتجاتك أولاً ⬆️"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ══ TRUST ══ */}
        <section className="max-w-lg mx-auto px-4 pb-8">
          <h2 className="text-2xl font-black text-center text-gray-900 mb-4">علاش تختارنا؟</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Wallet className="w-14 h-14" />, title: "الدفع عند الاستلام", sub: "ما خلّصتيش حتى تشوف وتفحص" },
              { icon: <Truck className="w-14 h-14" />, title: "توصيل 24 — 48 ساعة", sub: "لجميع مدن المغرب مجاناً" },
              { icon: <ShieldCheck className="w-14 h-14" />, title: "سيرفيس احترافي", sub: "فريق الدعم ديالنا مساند ليك فكل لحضة" },
              { icon: <Star className="w-14 h-14" />, title: "إمكانية الاستبدال", sub: "إلا ماعجبكش كنبدلوه ليك" },
            ].map((t, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-5 flex flex-col items-center text-center gap-3">
                <div className="text-[#E8B86D]">{t.icon}</div>
                <p className="text-white font-black text-xl leading-tight">{t.title}</p>
                <p className="text-white/50 text-sm leading-snug">{t.sub}</p>
              </div>
            ))}
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
              { feature: "السعر", others: "منتوج واحد بسعر غالي", us: "2-3 منتجات بسعر واحد، وفر على الأقل 90 درهم" },
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
          <h2 className="text-2xl font-black text-center text-gray-900 mb-5">آراء الزبناء</h2>
          <div className="space-y-3">
            {[
              { name: "ياسين", city: "الدار البيضاء", text: "وصلني الطلب ديالي فـ نهار واحد، جودة زوينة بزاف" },
              { name: "سمية", city: "الرباط", text: "الباك مفيد بزاف خصوصا فالحر، الشمسية والمكنسة ماشي معقول" },
              { name: "يونس", city: "فاس", text: "توصيل سريع والتعامل ناضي، كنصح بيه أي واحد عندو طوموبيل" },
            ].map((r, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-right">
                <div className="mb-3 flex gap-0.5 justify-end">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-[#E8B86D] text-[#E8B86D]" />)}
                </div>
                <p className="text-gray-800 text-base leading-loose mb-3">&ldquo;{r.text}&rdquo;</p>
                <p className="text-gray-900 text-sm font-black">{r.name} — <span className="text-gray-400 font-normal">{r.city}</span></p>
              </div>
            ))}
          </div>

          {/* WhatsApp screenshots */}
          <div className="mt-4 space-y-3">
            <p className="text-center text-gray-400 text-sm font-bold">📲 رسائل حقيقية من الزبناء</p>
            {["/reviews/reviews-1.webp"].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="رأي زبون" className="w-full h-auto rounded-2xl shadow-sm border border-gray-200" />
            ))}
          </div>
        </section>

      </div>{/* end light content */}

      {/* ══ STICKY BOTTOM BAR ══ */}
      {!formVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950 border-t border-white/10 px-4 py-3">
          {canOrder ? (
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="w-full bg-[#E8B86D] text-black font-black text-base py-4 rounded-2xl active:scale-95 transition-all shadow-xl shadow-[#E8B86D]/30"
            >
              🔥 طلب دابا وخلص عند الاستلام — {total} درهم
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      i < selected.length
                        ? "bg-[#E8B86D] border-[#E8B86D]"
                        : "bg-white/5 border-white/20"
                    }`}
                  >
                    {i < selected.length
                      ? <Check className="w-5 h-5 text-black" strokeWidth={3} />
                      : <span className="text-white/30 font-black text-sm">{i + 1}</span>
                    }
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-white font-black text-base">{selected.length} / 3 منتجات</p>
                <p className="text-white/40 text-xs">
                  {selected.length === 0 ? "ختار على الأقل جوج" : selected.length === 1 ? "واحد ناقص — زيد ختار" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}