"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "PCK4"
const PRICE_1 = 229
const OLD_PRICE = 499
const GOLD = "#E8B86D"
const DARK = "#030712"

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

const PRODUCTS = [
  {
    video: "/products/pack-4/sun-protection.mp4",
    poster: "/products/pack-4/S4abf82e96bc94d458eb54090d4d618f2n.webp",
    title: "مظلات شمس مغناطيسية",
    desc: "وليداتك مرتاحين من الصهد — 4 ديال المظلات مغناطيسية كيحميوك من صهد الشمش وكيحافظوا على الخصوصية ديالك داخل السيارة.",
  },
  {
    video: "/products/pack-4/vacuum-cleaner.mp4",
    poster: "/products/pack-4/S1b07353b841c47ed9a1667a156304b83e.webp",
    title: "مكنسة لاسلكية قوية",
    desc: "السفر فيه الماكلة والفرتيت — مع المكنسة غتجمع الروينة فثواني وتخلي الجلسة نقية لوليداتك.",
  },
  {
    video: "/products/pack-4/phone-holder.mp4",
    poster: "/products/pack-4/S41925ed38ddc460e980f7c9f7e35e6010.webp",
    title: "حامل الهاتف الاحترافي",
    desc: "سوق وأنت مرتاح وبالك هاني — GPS بكل أمان بلا ما تشغل يدك، باش توصل عائلتك بخير.",
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
      style={{ height: "380px", objectFit: "cover" }}
      onLoadedData={e => { (e.target as HTMLVideoElement).playbackRate = 1.3 }}
    />
  )
}

export default function Pck4Page() {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [loading, setLoading] = useState(false)
  const [formPassed, setFormPassed] = useState(false)
  const formRef = useRef<HTMLElement>(null)
  const price = PRICE_1
  const draftId = useRef<number | null>(null)
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const saveDraft = (f: OrderForm, q: number, p: number) => {
    if (!f.phone.trim() || f.phone.trim().length < 10) return
    if (draftTimer.current) clearTimeout(draftTimer.current)
    draftTimer.current = setTimeout(async () => {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draftId.current, phone: f.phone.trim(), full_name: f.name, address: f.city, sku: PRODUCT_SKU, qte: q, price: p }),
      }).catch(() => null)
      if (res?.ok) {
        const data = await res.json().catch(() => null)
        if (data?.id) draftId.current = data.id
      }
    }, 1500)
  }

  const deleteDraft = () => {
    if (!draftId.current) return
    fetch("/api/draft", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: draftId.current }) }).catch(() => null)
    draftId.current = null
  }

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
    deleteDraft()
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus: PRODUCT_SKU, qty: 1, total: price }),
    }).catch(() => null)
    const params = new URLSearchParams({ name: form.name, phone: form.phone, city: form.city, skus: PRODUCT_SKU, qty: "1", total: String(price), pack: "pck-4" })
    router.push(`/thank-you?${params}`)
  }

  const inputCls = "w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none text-right transition-colors"
  const onFocusGold = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = GOLD }
  const onBlurGray  = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#e5e7eb" }

  const orderForm = (
    <>
      <div className="rounded-3xl overflow-hidden" style={{ border: `3.5px dashed ${GOLD}`, boxShadow: "0 4px 24px rgba(232,184,109,0.15)" }}>
        <div className="px-5 py-3 text-center" style={{ background: DARK }}>
          <p className="font-black text-lg" style={{ color: GOLD, animation: "pulse 1.5s ease-in-out infinite" }}>للطلب ادخل معلوماتك اسفله 👇</p>
          <p className="font-bold text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>توصيل مجاني + الدفع عند الاستلام ✅</p>
        </div>
        <div className="px-5 pb-7 pt-5" style={{ background: "#fff" }}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-black text-right">الاسم الكامل <span className="font-normal text-gray-400">(اختياري)</span></label>
              <input type="text" value={form.name} onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, 1, price) }} placeholder="الاسم الكامل" className={inputCls} onFocus={onFocusGold} onBlur={onBlurGray} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-black text-right">المدينة <span className="font-normal text-gray-400">(اختياري)</span></label>
              <input type="text" value={form.city} onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, 1, price) }} placeholder="مثلاً: كازا، الرباط..." className={inputCls} onFocus={onFocusGold} onBlur={onBlurGray} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-black text-right">رقم التيليفون <span className="text-red-500">*</span></label>
              <input type="tel" value={form.phone} onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, 1, price) }} placeholder="06XXXXXXXX"
                className="w-full bg-gray-50 border-2 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none text-right transition-colors"
                style={{ borderColor: errors.phone ? "#ef4444" : "#e5e7eb" }}
                onFocus={e => { if (!errors.phone) e.target.style.borderColor = GOLD }}
                onBlur={e => { if (!errors.phone) e.target.style.borderColor = "#e5e7eb" }}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold text-right">{errors.phone}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-5 rounded-2xl font-black text-lg text-black transition-all duration-200 active:scale-95"
              style={{ background: GOLD, boxShadow: "0 4px 20px rgba(232,184,109,0.4)", animation: loading ? "none" : "btnPulse 1.5s ease-in-out infinite" }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  جاري إرسال طلبيتك...
                </span>
              ) : "اضغط هنا للطلب"}
            </button>
          </form>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen text-gray-900" dir="rtl" style={{ backgroundColor: "#fff", fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <style>{`
        @keyframes btnPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(232,184,109,0.5);} 50%{transform:scale(1.03);box-shadow:0 0 0 14px rgba(232,184,109,0);} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        .shaked { animation: shake 2s ease infinite; }
      `}</style>

      {/* ══ DECORATIVE BG ══ */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* top-right gold cluster */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,184,109,0.13) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: 40, right: 40, width: 90, height: 90, borderRadius: "50%", border: "1.5px solid rgba(232,184,109,0.18)" }} />
        <div style={{ position: "absolute", top: 90, right: 90, width: 40, height: 40, borderRadius: "50%", background: "rgba(232,184,109,0.09)" }} />
        {/* top-left gray */}
        <div style={{ position: "absolute", top: 20, left: -40, width: 180, height: 180, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.05)" }} />
        <div style={{ position: "absolute", top: 70, left: 30, width: 60, height: 60, borderRadius: "50%", background: "rgba(0,0,0,0.03)" }} />
        {/* mid gold dot row */}
        {[0,1,2,3,4].map(n => (
          <div key={n} style={{ position: "absolute", top: "38%", left: `${8 + n * 22}%`, width: 5, height: 5, borderRadius: "50%", background: n % 2 === 0 ? "rgba(232,184,109,0.25)" : "rgba(0,0,0,0.07)" }} />
        ))}
        {/* bottom-left gold cluster */}
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,184,109,0.10) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 60, left: 20, width: 80, height: 80, borderRadius: "50%", border: "1.5px solid rgba(232,184,109,0.15)" }} />
        {/* bottom-right gray ring */}
        <div style={{ position: "absolute", bottom: 30, right: -30, width: 160, height: 160, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.05)" }} />
        <div style={{ position: "absolute", bottom: 80, right: 50, width: 50, height: 50, borderRadius: "50%", background: "rgba(0,0,0,0.03)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

      {/* ══ HERO ══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/products/pack-4/hero.webp" alt="باك العائلة — 4 إكسسوارات للطوموبيل"
        className="w-full h-auto block" width={800} height={800}
        fetchPriority="high" decoding="async" style={{ cursor: "pointer" }}
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
        {orderForm}
      </section>

      <div className="h-2 bg-gray-50" />

      {/* ══ PRODUCTS ══ */}
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-gray-900 font-black text-2xl text-center mb-2">شنو كاين فالباك؟</h2>
        <p className="text-center text-gray-500 text-sm mb-8">علاش هاد الباك هو الصديق ديالك فالطريق ❤️</p>
        <div className="flex flex-col gap-12 max-w-lg mx-auto">
          {PRODUCTS.map((p, i) => (
            <div key={i}>
                
              <h3 className="font-black text-xl text-gray-900 text-right mb-2">{p.title}</h3>
              <p className="text-gray-500 text-base text-right leading-relaxed">{p.desc}</p>
              <div className="rounded-2xl overflow-hidden mb-4">
                <LazyVideo src={p.video} poster={p.poster} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2 bg-gray-50" />

      {/* ══ TRUST BADGES ══ */}
      <div className="max-w-lg mx-auto px-4 py-6 bg-gray-50">
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

      <div className="h-2 bg-gray-50" />

      {/* ══ WHATSAPP ══ */}
      <section className="max-w-lg mx-auto px-4 py-6">
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
      <footer className="px-5 py-8 mb-20 text-center" style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e5e7eb" }}>
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