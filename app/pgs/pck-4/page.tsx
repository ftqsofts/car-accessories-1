"use client"

import OrderForm from "@/components/OrderForm"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "CMM4-CCR-99E,9DX3-WWN-7C8,16ZJX1,CMBC-CCR-6E9"
const PRICE_1 = 229
const OLD_PRICE = 499
const GOLD = "#E8B86D"
const DARK = "#030712"

const PRODUCTS = [
  {
    video: "/products/pack-4/sun-protection.mp4",
    poster: "/products/pack-4/S4abf82e96bc94d458eb54090d4d618f2n.webp",
    title: "مظلات شمس مغناطيسية",
    desc: "وليداتك مرتاحين من الشمس — 4 ديال المظلات مغناطيسية كيحجب 90\% وكيحافظوا على الخصوصية ديالك داخل السيارة.",
  },
  {
    video: "/products/pack-4/vacuum-cleaner.mp4",
    poster: "/products/pack-4/S1b07353b841c47ed9a1667a156304b83e.webp",
    title: "مكنسة لاسلكية قوية",
    desc: "مكنسة قوية بقدرة شفط 6000Pa كافية باش تجمع الروينة فثواني وتخلي الجلسة نقية لوليداتك.",
  },
  {
    video: "/products/pack-4/phone-holder.mp4",
    poster: "/products/pack-4/S41925ed38ddc460e980f7c9f7e35e6010.webp",
    title: "حامل الهاتف الاحترافي",
    desc: "سوق وأنت مرتاح وبالك هاني — سيبور احترافي بمغناطيس N52 قوي وتصميم كيدور 360° وقابل للطي، كيضمن ثبات التيليفون وخا فالدودان.",
  },
  {
    video: "/products/pack-4/air-perfume.mp4",
    poster: "/products/pack-4/Saeead601199a4000bf7aeb6bf224e325m.webp",
    title: "معطر الجو Catpai",
    desc: "انتعاش كيدوم — ريحة الطوموبيل دايما زوينة، كتدوم لأسابيع، باش أي واحد ركب معاك يحس بالفرق..",
  },
]

function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const load = () => {
      el.src = src
      el.load()
    }
    if (document.readyState === "complete") {
      load()
    } else {
      window.addEventListener("load", load, { once: true })
      return () => window.removeEventListener("load", load)
    }
  }, [src])
  return (
    <video ref={ref} poster={poster} autoPlay muted loop playsInline preload="none"
      className="w-full bg-white"
      style={{ height: "420px", objectFit: "cover" }}
      onLoadedData={e => { (e.target as HTMLVideoElement).playbackRate = 1.3 }}
    />
  )
}

const IMAGES = [
  "/products/pack-4/S1e6131bf01d84c6fba66b07516387b6dy.webp",
  "/products/pack-4/cleaner-3-in-1.jpg",
  "/products/pack-4/photo_2026-04-14_13-55-21.jpg",
  "/products/pack-4/S4abf82e96bc94d458eb54090d4d618f2n.webp",
]

export default function Pck4Page() {
  const [formPassed, setFormPassed] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const formRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const check = () => {
      if (!formRef.current) return
      const rect = formRef.current.getBoundingClientRect()
      setFormPassed(rect.bottom < 0 || rect.top > window.innerHeight)
    }
    window.addEventListener("scroll", check, { passive: true })
    check()
    return () => window.removeEventListener("scroll", check)
  }, [])

  return (
    <div className="min-h-screen text-gray-900" dir="rtl" style={{ backgroundColor: "#fff", fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <style>{`
        @keyframes btnPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(232,184,109,0.5);} 50%{transform:scale(1.03);box-shadow:0 0 0 14px rgba(232,184,109,0);} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        .shaked { animation: shake 2s ease infinite; }
      `}</style>

      {/* ══ DECORATIVE BG ══ */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(232,184,109,0.18)" />
            </pattern>
            <radialGradient id="fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <rect width="100%" height="100%" fill="url(#fade)" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

      {/* ══ PRODUCT GALLERY ══ */}
      <div style={{ backgroundColor: "#fff", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ position: "relative", backgroundColor: "#f5f5f5", lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES[activeImg]} alt="باك العائلة"
            fetchPriority="high" decoding="async"
            style={{ width: "100%", height: 380, objectFit: "cover", display: "block", cursor: "pointer" }}
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
          <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>
            {activeImg + 1} / {IMAGES.length}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", backgroundColor: "#fff", overflowX: "auto" }}>
          {IMAGES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" onClick={() => setActiveImg(i)}
              style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0, cursor: "pointer",
                border: activeImg === i ? "2.5px solid #1E3A8A" : "2px solid #e5e7eb" }}
            />
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/products/pack-4/hero-6.webp" alt="باك العائلة — 4 إكسسوارات للطوموبيل"
        className="w-full h-auto block" width={800} height={800}
        decoding="async" style={{ cursor: "pointer" }}
        onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      {/* ══ HEADER ══ */}
      <div className="px-4 pt-5 pb-3 max-w-lg mx-auto mt-12">
        <h1 className="font-black text-xl text-gray-900 mb-2 text-right">باك العائلة — 4 إكسسوارات للطوموبيل ❤️</h1>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-black text-3xl" style={{ color: DARK }}>{PRICE_1} درهم</span>
          <span className="text-gray-400 text-lg font-bold line-through">{OLD_PRICE} درهم</span>
          <span className="text-white text-xs font-black px-2 py-1 rounded-full bg-red-500">
            -{Math.round((1 - PRICE_1 / OLD_PRICE) * 100)}%
          </span>
        </div>
        <p className="text-green-600 font-black text-sm">✅ توصيل مجاني — الدفع عند الاستلام</p>
        <p className="text-red-500 font-black text-sm mt-0.5">⏳ الكمية محدودة — العرض سينتهي قريباً</p>
      </div>

      <div className="h-px mx-4 bg-gray-100 mb-1" />

      {/* ══ FORM 1 ══ */}
      <section ref={formRef} className="px-4 py-5 max-w-lg mx-auto" id="order-form">
        <OrderForm
          sku={PRODUCT_SKU}
          pack="pck-4"
          options={[{ q: 1, label: "باك العائلة — 4 إكسسوارات", price: PRICE_1 }]}
        />
      </section>

      <div className="h-2" />

      {/* ══ PRODUCTS ══ */}
      <div className="px-4 py-6">
        <h2 className="text-gray-900 font-black text-2xl text-center mb-2">شنو كاين فالباك؟</h2>
        <p className="text-center text-gray-500 text-sm mb-8">علاش هاد الباك هو الصديق ديالك فالطريق ❤️</p>
        <div className="flex flex-col gap-12 max-w-lg mx-auto">
          {PRODUCTS.map((p, i) => (
            <div key={i}>
                
              <h3 className="font-black text-xl text-gray-900 text-right mb-2">{p.title}</h3>
              <p className="text-gray-700 text-base text-right leading-loose font-bold">{p.desc}</p>
              <div className="rounded-2xl overflow-hidden mb-4">
                <LazyVideo src={p.video} poster={p.poster} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2" />

      {/* ══ TRUST BADGES ══ */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <h2 className="text-gray-900 font-black text-2xl text-center mb-5">الضمانات والاسترجاع</h2>
        <div className="flex flex-col gap-3">
          {[
            { img: "/icons/waraico.webp", title: "ضمان المنتج", sub: "ضمان لمدة 30 يوم — ماعجبكيش كنرجعو ليك الفلوس" },
            { img: "/icons/codincon.webp", title: "جرب عاد خلصي", sub: "ماغادي تخلصي حتى شي حتى توصلك المنتج وتفحصيه" },
            { img: "/icons/cussup.webp", title: "خدمة ما بعد البيع", sub: "فريق العملاء تحت تصرفك طيلة أيام الأسبوع" },
            { img: "/icons/shipico.webp", title: "شحن سريع وموثوق", sub: "كنشحنو لجميع المدن خلال 24h إلى 48h" },
          ].map((item, i) => (
            <div key={i} className="px-5 py-6 bg-white rounded-2xl text-center" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-16 w-auto mx-auto mb-3 object-contain" />
              <p className="text-gray-900 font-black text-base mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2" />

      {/* ══ WHATSAPP ══ */}
      <section className="max-w-lg hidden mx-auto px-4 py-6">
        <div className="rounded-3xl p-6 text-center space-y-4" style={{ background: DARK }}>
          <p className="text-white font-black text-xl">عندك سؤال؟ تواصل معنا مباشرة</p>
          <p className="text-white/50 text-sm">فريقنا مساند ليك على واتساب</p>
          <a href="https://wa.me/212728214523?text=Salam" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-lg text-white active:scale-95 transition-all shadow-lg"
            style={{ backgroundColor: "#25D366" }}>
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white shrink-0">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.649 4.942 1.883 7.115L2 30l7.115-1.863A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.88-1.603l-.42-.25-4.223 1.106 1.13-4.115-.274-.434A11.559 11.559 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.338-8.607c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.9 1.129-1.103 1.362-.203.232-.406.26-.754.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.203-.347-.022-.535.152-.708.156-.155.347-.406.52-.61.174-.202.232-.347.347-.578.116-.232.058-.435-.029-.61-.087-.174-.783-1.887-1.073-2.585-.283-.678-.57-.586-.783-.597l-.667-.012c-.232 0-.61.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.367 1.42 3.599c.174.232 2.454 3.747 5.946 5.254.831.359 1.48.573 1.986.733.834.265 1.594.228 2.194.138.669-.1 2.055-.84 2.345-1.651.29-.812.29-1.507.203-1.651-.086-.145-.318-.232-.666-.406z" />
            </svg>
            تواصل معنا على واتساب
          </a>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="px-5 py-8 mb-20 text-center" style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="inline-flex items-center gap-2 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ background: "#fdf8ee", border: `1px solid ${GOLD}`, color: "#92712a" }}>
          🚚 توصيل مجاني لجميع مدن المغرب
        </div>
        <p className="text-gray-400 text-xs">© 2025 Storecoma — جميع الحقوق محفوظة</p>
        <div className="mx-auto mt-4 w-max">
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" loading="lazy" />
        </div>
      </footer>

      {/* ══ STICKY BUTTON ══ */}
      {formPassed && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full text-black font-black text-base py-4 rounded-2xl active:scale-95 shaked"
            style={{ background: GOLD, boxShadow: "0 4px 24px rgba(232,184,109,0.5)" }}>
            🔥 اضغط هنا للطلب — الدفع عند الاستلام
          </button>
        </div>
      )}
      </div>{/* end z-index wrapper */}
    </div>
  )
}