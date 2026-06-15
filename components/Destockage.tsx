"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export type Niche = "vacuum" | "shampoo"

type Product = {
  sku: string
  title: string
  description: string
  price: number
  oldPrice: number
  images: string[]
}

const SILICONE_CLEANER: Product = {
  sku: "1A1T5D",
  title: "كراطة السيليكون السحرية (الحجم الكبير 1.4m)",
  description: "تنشيف الما ومسح الزاج والزليج بضربة وحدة بلا ما تخلي حتى أثر. كتهنيك من تمارة، وكتجمع الزغب والغبرة بسهولة تامة.",
  price: 55,
  oldPrice: 163,
  images: [
    "/products/upsells/selicon-cleaaner-1.webp",
    "/products/upsells/selicon-cleaaner-2.webp",
    "/products/upsells/selicon-cleaaner-3.webp",
  ],
}

const KITCHEN_BARRIER: Product = {
  sku: "1A1A1G",
  title: "حاجز السيليكون المضاد للرش (للافابو)",
  description: "وداعاً للحوايج الفازكين وقت غسيل الماعن! حاجز كيلصق بسهولة فالبوطاجين، كيحبس رش الما وكيخلي حوايجك و الكوزينة ديالك ديما ناشفة.",
  price: 49,
  oldPrice: 150,
  images: [
    "/products/upsells/kitchen-selecton-1.webp",
    "/products/upsells/kitchen-selecton-2.webp",
  ],
}

const ANTI_VIBRATION: Product = {
  sku: "1A1MSH",
  title: "أرجل مطاطية مضادة لاهتزاز الماكينة (باك 4)",
  description: "الماكينة كدير الصداع وكتحرك فاش كتعصر؟ هاد الأرجل غادي يسكتوها فمرة! كتحمي الزليج من التخبيش وكتسهل عليك تسيق تحت منها.",
  price: 35,
  oldPrice: 117,
  images: [
    "/products/upsells/antivibration-1.webp",
    "/products/upsells/antivibration-2.jpg",
  ],
}

const LOCK: Product = {
  sku: "1A20SA",
  title: "قفل الأمان لحماية الأطفال (بدون مسامير)",
  description: "تهناي من الروينة وحافظي على سلامة وليداتك! قفل قوي وساهل فالتركيب، كيلصق مزيان فالثلاجة، البلاكارات، والمجورة بلا حفير.",
  price: 29,
  oldPrice: 97,
  images: [
    "/products/upsells/lock-1.webp",
    "/products/upsells/lock-3.webp",
    "/products/upsells/lock-4.webp",
  ],
}

const ALL_UPSELLS: Product[] = [LOCK, SILICONE_CLEANER, KITCHEN_BARRIER, ANTI_VIBRATION]

const CATALOG: Record<Niche, Product[]> = {
  vacuum: [LOCK, SILICONE_CLEANER, KITCHEN_BARRIER, ANTI_VIBRATION],
  shampoo: [LOCK, SILICONE_CLEANER, KITCHEN_BARRIER, ANTI_VIBRATION],
}

function ProductCard({ product, phone, onAdd, onToast }: { product: Product; phone: string; onAdd?: (product: { title: string; price: number; images: string[] }) => void; onToast?: (title: string) => void }) {
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const handleAdd = () => {
    if (added) return
    setAdded(true)
    onAdd?.({ title: product.title, price: product.price, images: product.images })
    onToast?.(product.title)
    fetch("/api/upsell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, sku: product.sku, price: product.price }),
    }).catch(() => null)
  }

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
    <div className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
      {/* Image carousel */}
      <div dir="ltr" style={{ position: "relative", backgroundColor: "#f5f5f5", lineHeight: 0, userSelect: "none" }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Image
          src={product.images[activeImg]}
          alt={product.title}
          width={520}
          height={340}
          style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }}
        />
        {product.images.length > 1 && (
          <>
            {/* Dot indicators */}
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {product.images.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? 22 : 8, height: 8, borderRadius: 4, background: i === activeImg ? "#1E3A8A" : "rgba(255,255,255,0.8)", border: "none", cursor: "pointer", transition: "width 0.2s", padding: 0 }} />
              ))}
            </div>
            {/* Prev arrow */}
            {activeImg > 0 && (
              <button onClick={prev} style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", background: "#1E3A8A", border: "none", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", fontSize: 26, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.35)", fontWeight: 900 }}>
                ›
              </button>
            )}
            {/* Next arrow */}
            {activeImg < product.images.length - 1 && (
              <button onClick={next} style={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", background: "#1E3A8A", border: "none", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", fontSize: 26, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.35)", fontWeight: 900 }}>
                ‹
              </button>
            )}
            {/* Swipe hint — shown only on first image */}
            {activeImg === 0 && (
              <div style={{ position: "absolute", bottom: 36, right: 10, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 999, pointerEvents: "none" }}>
                صور أخرى ›
              </div>
            )}
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {product.images.length > 1 && (
        <div style={{ display: "flex", gap: 6, padding: "8px 12px", backgroundColor: "#fff", overflowX: "auto" }}>
          {product.images.map((src, i) => (
            <button key={i} onClick={() => setActiveImg(i)} style={{ flexShrink: 0, padding: 0, border: "none", background: "none", cursor: "pointer" }}>
              <Image src={src} alt="" width={56} height={56} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, border: activeImg === i ? "2.5px solid #1E3A8A" : "2px solid #e5e7eb" }} />
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="px-4 pt-3 pb-4">
        <h3 className="font-black text-base text-gray-900 mb-1">{product.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">{product.description}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-lg">🔥</span>
            <span className="font-black text-2xl text-gray-900">{product.price} درهم</span>
            <span className="text-red-400 line-through text-sm font-bold">{product.oldPrice} درهم</span>
          </div>
          <span className="text-green-600 font-black text-xs">وفر {product.oldPrice - product.price} درهم 🎉</span>
          <button
            onClick={handleAdd}
            disabled={added}
            className="font-black text-sm py-3 rounded-xl active:scale-95 transition-all w-full mt-1"
            style={{ background: added ? "#16a34a" : "#ffd200", color: added ? "#fff" : "#000", border: "none", cursor: added ? "default" : "pointer" }}
          >
            {added ? "✅ تمت الإضافة" : "🛒 أضف للسلة"}
          </button>
        </div>
      </div>
    </div>
  )
}

type Props = {
  niche?: Niche
  phone: string
  onAdd?: (product: { title: string; price: number; images: string[] }) => void
}

function Toast({ message }: { message: string }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "#16a34a", color: "#fff", fontFamily: "var(--font-cairo), Cairo, sans-serif",
      fontWeight: 900, fontSize: 14, padding: "12px 24px", borderRadius: 999,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 9999, whiteSpace: "nowrap",
      animation: "slideUp 0.3s ease",
    }}>
      ✅ {message}
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  )
}

export default function Destockage({ niche, phone, onAdd }: Props) {
  const products = niche ? CATALOG[niche] : ALL_UPSELLS
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  if (!products.length) return null

  return (
    <>
    <div dir="rtl" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="mb-5">
          {/* Secret offer badge */}
          <div className="text-center mb-3">
            <span className="inline-block bg-red-100 text-red-800 text-[15px] font-black px-3 py-1 rounded-full shadow-sm animate-pulse">
              🔥 عرض سري خاص بالكليان ديالنا
            </span>
          </div>
          {/* Hidden text — kept for SEO/reference */}
          <h2 className="sr-only">بما أنك تقديتي من عندنا، زيد هاد المنتجات للطلب ديالك بثمن الجملة!</h2>
          <p className="sr-only">هاد الأثمنة ممطروحاش للعموم. هادو هما المنتجات لي دايرين ضجة والأكثر طلباً عندنا، حطيناهم ليك بثمن الجملة غير باش نشكروك حيت تقديتي من عندنا.</p>
          {/* Cover image */}
          <Image
            src="/products/upsells/upsell-cover-2.webp"
            alt="عرض خاص"
            width={600}
            height={300}
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 16 }}
          />
        </div>
        <div className="flex flex-col gap-5">
          {products.map(p => (
            <ProductCard key={p.sku} product={p} phone={phone} onAdd={onAdd} onToast={setToast} />
          ))}
        </div>
      </div>
    </div>
    {toast && <Toast message="تضاف المنتج للطلبية بنجاح" />}
    </>
  )
}
