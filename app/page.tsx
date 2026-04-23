"use client"

import { PACK_SHIPPING_FEE, products } from "@/lib/products"
import { Check, ChevronRight, Headphones, ShieldCheck, ShoppingBag, Star, Truck, Wallet } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const MIN_TOTAL = 155

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
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const selectedProducts = products.filter((p) => selected.includes(p.id))
  const rawTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0) + PACK_SHIPPING_FEE
  const total = selected.length >= 2 ? Math.max(rawTotal, MIN_TOTAL) : 0
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

    const skus = selectedProducts.map((p) => p.id).join(",")

    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus, qty: selected.length, total }),
    }).catch(() => null)

    const params = new URLSearchParams({
      name: form.name,
      phone: form.phone,
      city: form.city,
      skus,
      qty: String(selected.length),
      total: String(total),
    })
    router.push(`/thank-you?${params}`)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-900 mb-12">

      {/* ══ HERO — full viewport ══ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center px-6 pt-10 pb-8 overflow-hidden">
        {/* Background image */}
        <Image
          src="/products/car-accessories-cover.webp"
          alt=""
          fill
          className="object-cover object-center scale-105"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-950/80" />

        <div className="flex flex-col gap-4 items-center">
          {/* Logo */}
          <div className="hero-logo relative z-10">
            <Image src="/storecoma-logo.png" alt="storecoma" width={80} height={50} className="object-contain" />
          </div>

          <div className="hero-badge mb-12">
            <span className="bg-red-500 text-white text-sm font-black px-5 py-2 rounded-full tracking-wide">
              🔥 عرض الصيف المحدود!
            </span>
          </div>
        </div>

        {/* Center block */}
        <div className="relative z-10 flex flex-col items-center text-center gap-7 w-full">
          <h1 className="hero-title glow-title text-6xl! font-black leading-tight w-full mb-8" style={{ fontSize: "clamp(3rem, 14vw, 5rem)" }}>
          أول مرة في المغرب
          </h1>

          <p className="hero-sub text-white font-black text-[22px] leading-relaxed">
            تهلا في طوموبيلتك هاد الصيف مع أحسن باك ديال الإكسسوارات اللي غادي يهنيك!
          </p>
        </div>

        {/* Scroll hint */}
        <div className="hero-arrow relative z-10 flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs font-bold"></span>
          <svg className="w-5 h-5 text-[#E8B86D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

      </section>

      {/* ══ LIGHT CONTENT AREA ══ */}
      <div className="bg-gray-50 rounded-t-[2.5rem] -mt-6 pt-8">

      {/* ══ PRODUCT SELECTION ══ */}
      <div className="max-w-lg mx-auto px-4 mb-5 text-center">
        <div className="bg-blue-600 text-white px-5 py-4 rounded-2xl shadow-lg shadow-blue-600/30 mb-3">
          <ShoppingBag className="w-6 h-6 mx-auto mb-1" />
          <p className="font-black text-lg">اختار منتجاتك</p>
        </div>
        <p className="text-gray-500 text-base font-bold">
          اختار 2 منتجات على الأقل 👇
        </p>
      </div>

      <section className="max-w-lg mx-auto px-4 pb-6">
        <div className="flex flex-col gap-5">
          {products.map((product) => {
            const isSelected = selected.includes(product.id)
            const isExpanded = expandedId === product.id
            return (
              <div
                key={product.id}
                className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? "border-[#E8B86D] shadow-lg shadow-[#E8B86D]/20"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {/* Full-width image — click to toggle details */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : product.id)}
                  className="relative w-full h-80 bg-gray-900 overflow-hidden block"
                >
                  <Image
                    src={product.image}
                    alt={product.nameDarija}
                    fill
                    className="object-cover"
                    sizes="(max-width: 512px) 100vw, 512px"
                    priority={product.id === products[0].id}
                  />
                  {/* dark gradient at bottom for text legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  {/* category badge top-left */}
                  <span className="absolute top-3 left-3 bg-[#E8B86D] text-black text-xs font-black px-3 py-1 rounded-full">
                    {product.categoryDarija}
                  </span>

                  {/* selected badge top-right */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-[#E8B86D] rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-black" strokeWidth={3} />
                    </div>
                  )}

                  {/* name + tagline over image bottom */}
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-right">
                    <p className="text-white font-black text-xl leading-tight mb-1">{product.nameDarija}</p>
                    <p className="text-gray-300 text-sm">{product.tagline}</p>
                  </div>
                  {/* tap hint */}
                  <div className="absolute bottom-24 left-0 right-0 flex justify-center">
                    <span className="text-xs text-white/60 font-bold">{isExpanded ? "اضغط لإخفاء التفاصيل ▲" : "اضغط للتفاصيل ▼"}</span>
                  </div>
                </button>

                {/* Stat bar */}
                <div className="bg-gray-900 px-4 py-3 border-t border-white/10 text-right">
                  <p className="text-[#E8B86D] font-black text-4xl leading-none">{product.statNumber}</p>
                  <p className="text-gray-400 text-sm mt-1">{product.statLabel}</p>
                </div>

                {/* Collapsible details */}
                {isExpanded && (
                  <div className="bg-gray-900 border-t border-white/10">
                    {product.videoUrl && (
                      <video
                        src={product.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full"
                      />
                    )}
                    <div className="px-4 pb-4 pt-3 space-y-3">
                      <p className="text-gray-300 text-sm leading-loose">{product.descriptionDarija}</p>
                      <div className="space-y-2">
                        {product.featuresDarija.map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-900/60 flex items-center justify-center shrink-0">
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                            </div>
                            <span className="text-gray-300 text-sm">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => toggle(product.id)}
                  className={`w-full text-base font-black py-3.5 transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-[#E8B86D] text-black"
                  }`}
                >
                  {isSelected ? "✓ مختار — اضغط لإلغاء الاختيار" : " بغيت هاد المنتج"}
                </button>
              </div>
            )
          })}
        </div>

        {/* Selection counter */}
        <div className={`mt-4 rounded-2xl p-3 text-center border transition-all ${
          canOrder
            ? "bg-amber-50 border-[#E8B86D]/40"
            : "bg-gray-100 border-gray-200"
        }`}>
          {canOrder ? (
            <p className="text-[#C8962A] font-black text-sm">
              ✅ زوين! اختارتي {selected.length} منتجات — كمّل الطلبية هنا أسفل 👇
            </p>
          ) : (
            <p className="text-gray-500 text-sm font-bold">
              محتاج تختار {2 - selected.length} منتوجات باش تقدر تكمل الطلبية
            </p>
          )}
        </div>
      </section>

      {/* ══ ORDER FORM ══ */}
      <section ref={formRef} className="max-w-lg mx-auto px-4 pb-8" id="order-form">
        <div className="border-2 border-blue-400  rounded-3xl overflow-hidden shadow-lg">

          {canOrder && (
            <div className="bg-[#E8B86D] p-5 text-center">
              <p className="text-black/70 text-sm font-bold mb-1">
                {selected.length} منتجات + توصيل مجاني + هدية
              </p>
              <p className="text-black font-black text-5xl leading-none mb-1">{total}</p>
              <p className="text-black/80 font-black text-xl">درهم فقط</p>
              <p className="text-black/60 text-xs mt-2">الدفع عند الاستلام — ما خلّصتيش حتى توصلك</p>
            </div>
          )}

          <div className="p-5">
            <div className="text-center mb-5">
              <p className="text-gray-900 font-black text-xl mb-1">أكمّل الطلبية دابا</p>
            </div>

            {selected.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-5">
                <p className="text-gray-500 text-xs font-black mb-2">المنتجات اللي اخترتيها:</p>
                {selectedProducts.map((p) => (
                  <div key={p.id} className="py-2 border-t border-gray-200 text-right">
                    <span className="text-gray-900 text-sm font-bold">✓ {p.nameDarija}</span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-5">
              {/* honeypot — hidden from real users, bots fill it */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-black">الاسم <span className="font-normal text-gray-400">(اختياري)</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="كتب اسمك هنا..."
                  className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none transition-colors focus:border-blue-400 focus:bg-white ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2 font-black">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="فين كاين؟ مثلاً: كازا، الرباط..."
                  className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none transition-colors focus:border-blue-400 focus:bg-white ${
                    errors.city ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1 font-bold">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2 font-black">رقم التيليفون *<span className="text-red-500"> مطلوب</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="06XXXXXXXX"
                  className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 outline-none transition-colors focus:border-blue-400 focus:bg-white ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={!canOrder || loading}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 ${
                  canOrder && !loading
                    ? "bg-[#E8B86D] text-black hover:bg-[#d4a45c] shadow-xl shadow-[#E8B86D]/40"
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
                ) : !canOrder
                  ? `اختار ${2 - selected.length} منتوج${2 - selected.length === 1 ? "" : "ات"} باش تكمّل ⚠️`
                  : `🛍️ أطلب الآن — ${total} درهم`}
              </button>

              <p className="text-center text-gray-400 text-sm font-bold">
                الدفع عند الاستلام
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ══ WHY US / COMPARISON ══ */}
      <section className="max-w-lg mx-auto px-4 pb-10">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-gray-900 mb-2">علاش الزبناء كيختارو يشريو من عندنا؟</h2>
          <p className="text-gray-500 text-base leading-relaxed">ماشي كاع البائعين كيعطيو نفس الجودة،<br />حنا كنضمنو ليك راحتك وتجربة أحسن.</p>
        </div>

        {/* Comparison cards */}
        <div className="space-y-3">
          {[
            { feature: "السعر", others: "منتوج واحد بسعر غالي", us: "2-3 منتجات بسعر واحد، وفر على الاقل 50 درهم" },
            { feature: "الجودة", others: "بلا ضمان على الجودة", us: "جودة مضمونة 100%" },
            { feature: "الضمان", others: "بلا ضمان", us: "ضمان شهر كامل" },
            { feature: "ما بعد البيع", others: "تشري وتمشي", us: "فريق دائم معاك" },
          ].map((row, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" dir="rtl">
              {/* Feature label */}
              <div className="bg-gray-900 px-4 py-2">
                <span className="text-[#E8B86D] font-black text-sm">{row.feature}</span>
              </div>
              {/* Others vs Us */}
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-100">
                <div className="p-4 text-center border-l border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">البائعين</p>
                  <p className="text-gray-400 text-base leading-snug line-through">{row.others}</p>
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

      {/* ══ SOCIAL PROOF ══ */}
      <section className="max-w-lg mx-auto px-4 pb-8">
        <h2 className="text-xl font-black text-center mb-5 text-gray-900">شنو قالو الكليان ديالنا 💬</h2>
        <div className="space-y-3">
          {[
            { name: "محمد ر.", city: "الدار البيضاء", text: "وصلني الباك، الأسبيراتور خدام مزيان والشارجور طيارة. شكرا بزاف." },
            { name: "فاطمة ز.", city: "مراكش", text: "ثمن مناسب مقارنة مع داكشي لي كيوصلك، وفرت بزاف دالفلوس." },
            { name: "يونس ك.", city: "فاس", text: "توصيل سريع والتعامل ناضي، كنصح بيه أي واحد عندو طوموبيل." },
          ].map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-right">
              <div className="mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-blue-600 text-blue-500 inline" />)}
              </div>
              <p className="text-gray-800 text-base leading-loose mb-4">&ldquo;{r.text}&rdquo;</p>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-base font-black text-blue-600 mb-1 mr-auto ml-0">
                {r.name[0]}
              </div>
              <p className="text-gray-900 text-sm font-black">{r.name}</p>
              <p className="text-gray-400 text-sm">{r.city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ GUARANTEES ══ */}
      <section className="max-w-lg mx-auto px-4 pb-12">
        <h2 className="text-2xl font-black text-center mb-5 text-gray-900">الضمانات والاسترجاع</h2>
        <div className="space-y-3">
          {[
            { icon: <ShieldCheck className="w-10 h-10 mx-auto" />, title: "ضمان المنتج", desc: "ضمان لمدة 30 يوم — إذا ما عجبكش المنتج، كترجع فلوسك كاملة" },
            { icon: <Wallet className="w-10 h-10 mx-auto" />, title: "جرب عاد خلص", desc: "ما غادي تخلص حتى شي حتى يوصلك الباك وتفحصه بيدك" },
            { icon: <Headphones className="w-10 h-10 mx-auto" />, title: "خدمة ما بعد البيع", desc: "الفريق ديالنا تحت تصرفك طيلة أيام الأسبوع — عيّط علينا وقت ما بغيتي" },
            { icon: <Truck className="w-10 h-10 mx-auto" />, title: "شحن سريع وموثوق", desc: "كنشحنو لجميع مدن المغرب — التوصيل بين 24h و 48h" },
          ].map((g, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
              <div className="text-gray-900 mb-3">{g.icon}</div>
              <p className="text-gray-900 font-black text-xl mb-2">{g.title}</p>
              <p className="text-gray-500 text-base leading-loose">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FLOATING CTA ══ */}
      {!formVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-1 pointer-events-none">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={`pointer-events-auto flex items-center gap-2 font-black text-base px-6 py-4 rounded-lg shadow-2xl w-full justify-center active:scale-95 transition-all duration-200 animate-bounce ${
              canOrder
                ? "bg-[#E8B86D] text-black shadow-[#E8B86D]/50"
                : "bg-blue-600 text-white shadow-blue-600/40"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {canOrder ? `أطلب الباك — ${total} درهم` : "أطلب الباك دابا"}
          </button>
        </div>
      )}

      </div>{/* end light content area */}
    </div>
  )
}
