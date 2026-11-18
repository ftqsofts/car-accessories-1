"use client"

import { Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const FLAT_PRICE = 99

type PromoProduct = {
  sku: string
  title: string
  description: string
  oldPrice: number
  images: string[]
}

const DEALS: PromoProduct[] = [
  {
    sku: "176TSCXX",
    title: "أسبيراتور و سوفلور 6 في 1 — للسيارة والدار",
    description: "مكنسة قوية وعملية كتجبد كاع الوسخ من القنات الصعاب، فيها الشفط والنفخ بجوج. خفيفة، ساهلة، وديما واجدة تنقي طوموبيلتك والدار فدقيقة.",
    oldPrice: 199,
    images: ["/products/cleaner-4-in-1-hero.webp", "/products/S6a6bce2b49ce4690bb48c2896297d230t.avif", "/products/cleaner-4-in-1-package.webp"],
  },
  {
    sku: "16ZJX1XX",
    title: "مكنسة كهربائية 3 في 1 — للسيارة والدار",
    description: "سبيراتور قوي ومجرّب، كينقّي الكراسي، الكوفر وحتى الزوايا الضيقة، وكيجمع الشعر والغبرة بسهولة من أول مرة. صالح للدار والطوموبيل بجوج.",
    oldPrice: 149,
    images: ["/products/Vacuum-cleaner-3-in-1-6.webp", "/products/cleaner-3-in-1.jpg"],
  },
  {
    sku: "DISAARNOIR",
    title: "شامبو ديسار لتغطية الشيب — أسود أو بني",
    description: "تخلص من الشيب المزعج واسترجع شبابك في 10 دقائق! النتيجة كتبان من أول استعمال، مناسب لجميع أنواع الشعر. كيجي مع قفازات للحماية.",
    oldPrice: 160,
    images: ["/products/hair-shampoo/disaar-shampoo.webp", "/products/hair-shampoo/lp-1.webp"],
  },
  {
    sku: "CML-FAT-100",
    title: "دهن سنام الجمل الأصلي لجميع آلام المفاصل",
    description: "تهنا من حريق المفاصل، الظهر والركبة! مرهم طبيعي وآمن 100%، كيعطي مفعول سريع باش ترجع حيويتك. العبوة فيها 100 مل.",
    oldPrice: 199,
    images: ["/products/camel_fat/1.webp", "/products/camel_fat/2.webp", "/products/camel_fat/3.webp"],
  },
]

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

function ProductCard({ product, selected, onToggle }: { product: PromoProduct; selected: boolean; onToggle: () => void }) {
  const [activeImg, setActiveImg] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const prev = () => setActiveImg(i => Math.max(0, i - 1))
  const next = () => setActiveImg(i => Math.min(product.images.length - 1, i + 1))

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 40) next()
    else if (diff < -40) prev()
    touchStartX.current = null
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white border-2 transition-all ${selected ? "border-red-600 shadow-lg shadow-red-600/20" : "border-gray-200"}`}
    >
      <div dir="ltr" className="relative bg-gray-100" style={{ lineHeight: 0, userSelect: "none" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Image src={product.images[activeImg]} alt={product.title} width={520} height={340} style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
        {selected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-black px-3 py-1.5 rounded-full">
          99 درهم فقط
        </span>
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? 20 : 7, height: 7, borderRadius: 4, background: i === activeImg ? "#C1272D" : "rgba(255,255,255,0.8)", border: "none", padding: 0 }} />
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pt-3 pb-4">
        <h3 className="font-black text-base text-gray-900 mb-1">{product.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">{product.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-black text-2xl text-red-600">{FLAT_PRICE} درهم</span>
          <span className="text-gray-400 line-through text-sm font-bold">{product.oldPrice} درهم</span>
          <span className="text-green-700 font-black text-xs">وفر {product.oldPrice - FLAT_PRICE} درهم</span>
        </div>
        <button
          onClick={onToggle}
          className={`font-black text-sm py-3 rounded-xl active:scale-95 transition-all w-full ${selected ? "bg-gray-900 text-white" : "bg-red-600 text-white"}`}
        >
          {selected ? "✓ مختار — اضغط لإلغاء" : "🛒 أضف لطلبيتي"}
        </button>
      </div>
    </div>
  )
}

export default function Promo99Page() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [formVisible, setFormVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.1 })
    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (sku: string) =>
    setSelected(prev => prev.includes(sku) ? prev.filter(x => x !== sku) : [...prev, sku])

  const selectedProducts = DEALS.filter(p => selected.includes(p.sku))
  const total = selected.length * FLAT_PRICE
  const canOrder = selected.length >= 1

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
    const skus = selectedProducts.map(p => p.sku).join(",")
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
    <div className="min-h-screen bg-gray-50" dir="rtl" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>

      {/* ══ HERO ══ */}
      <section className="relative px-6 pt-10 pb-8 text-center" style={{ background: "linear-gradient(135deg, #C1272D 0%, #8e1c21 100%)" }}>
        <div className="max-w-lg mx-auto">
          <span className="inline-block bg-white text-red-700 text-sm font-black px-5 py-2 rounded-full mb-4 shadow-md">
            🇲🇦 عيد الاستقلال — عرض ديستوكاج
          </span>
          <h1 className="text-white font-black leading-tight mb-3" style={{ fontSize: "clamp(2.2rem, 10vw, 3.2rem)" }}>
            كلشي بـ <span style={{ color: "#006633" }}>99 درهم</span> فقط!
          </h1>
          <p className="text-white/90 font-bold text-lg mb-4">
            بمناسبة عيد الاستقلال، هاد المنتجات بسعر واحد — 99 درهم غير اليوم
          </p>
          <div className="bg-white/15 border border-white/30 rounded-2xl px-4 py-3 text-white font-black text-sm">
            ⏳ سطوك محدود
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section className="max-w-lg mx-auto px-4 py-6">
        <h2 className="text-xl font-black text-gray-900 text-center mb-1">👇 ختار المنتجات اللي بغيتي</h2>
        <p className="text-gray-500 text-sm text-center font-bold mb-5">تقدر تختار بزاف ديال المنتجات — كل واحد 99 درهم</p>

        <div className={`sticky top-0 z-30 rounded-2xl px-4 py-3 text-center border mb-5 transition-all shadow-md ${canOrder ? "bg-red-600 border-red-600" : "bg-white border-gray-200"}`}>
          {canOrder ? (
            <p className="text-white font-black text-base">✔️ اخترتي {selected.length} منتج — {total} درهم</p>
          ) : (
            <p className="text-gray-600 font-black text-base">⚠️ ختار على الأقل منتج واحد</p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {DEALS.map(product => (
            <ProductCard key={product.sku} product={product} selected={selected.includes(product.sku)} onToggle={() => toggle(product.sku)} />
          ))}
        </div>
      </section>

      {/* ══ ORDER FORM ══ */}
      <section ref={formRef} className="max-w-lg mx-auto px-4 pb-8" id="order-form">
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
          <div className={`p-5 text-center transition-all ${canOrder ? "bg-red-600" : "bg-gray-100"}`}>
            {canOrder ? (
              <>
                <p className="text-white/80 text-sm font-bold mb-1">{selected.length} منتجات + توصيل مجاني</p>
                <p className="text-white font-black text-6xl leading-none">{total}</p>
                <p className="text-white/90 font-black text-xl">درهم فقط</p>
                <p className="text-white/80 text-xs mt-2">ما خلّصتيش حتى توصلك الطلبية — الدفع عند الاستلام</p>
              </>
            ) : (
              <>
                <p className="text-gray-800 font-black text-lg mb-1">📦 دير الطلب ديالك دابا</p>
                <p className="text-gray-500 text-sm">عمّر المعلومات وغادي نتاصلوا بيك فأقرب وقت</p>
              </>
            )}
          </div>

          <div className="p-5">
            {selectedProducts.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-4">
                <p className="text-gray-400 text-xs font-black mb-3">المنتجات اللي اخترتيها:</p>
                <div className="space-y-2">
                  {selectedProducts.map(p => (
                    <div key={p.sku} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="text-right flex-1">
                        <p className="text-gray-900 font-black text-sm">{p.title}</p>
                        <p className="text-red-600 text-xs font-bold">{FLAT_PRICE} درهم</p>
                      </div>
                      <Check className="w-4 h-4 text-red-600 shrink-0" strokeWidth={3} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-black">الاسم <span className="font-normal text-gray-400">(اختياري)</span></label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="كتب اسمك هنا..."
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-300 outline-none focus:border-red-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-black">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="مثلاً: كازا، الرباط..."
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-300 outline-none focus:border-red-400 transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-black">رقم التيليفون <span className="text-red-500">*</span></label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="06XXXXXXXX"
                  className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-300 outline-none transition-colors ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-red-400"}`} />
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={!canOrder || loading}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 ${canOrder && !loading ? "bg-red-600 text-white shadow-xl shadow-red-600/30" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    جاري إرسال طلبيتك...
                  </span>
                ) : canOrder ? `طلب دابا وخلص عند الاستلام — ${total} درهم` : "اختار منتجاتك أولاً ⬆️"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ WHATSAPP CTA ══ */}
      <section className="max-w-lg mx-auto px-4 pb-12">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center space-y-4">
          <p className="text-gray-900 font-black text-xl">عندك سؤال؟ تواصل معنا مباشرة</p>
          <p className="text-gray-500 text-sm">فريقنا مساند ليك على واتساب — رد سريع</p>
          <a
            href="https://wa.me/212728214523?text=Salam%2C%20bghit%20na3ref%20ktar%203la%20l-3ar9%20dyal%2099dh"
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

      {/* ══ STICKY BOTTOM BAR ══ */}
      {!formVisible && canOrder && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full bg-red-600 text-white font-black text-base py-4 rounded-2xl active:scale-95 transition-all shadow-xl shadow-red-600/30"
          >
            🔥 طلب دابا وخلص عند الاستلام — {total} درهم
          </button>
        </div>
      )}
    </div>
  )
}
