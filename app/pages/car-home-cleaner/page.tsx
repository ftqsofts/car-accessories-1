"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "16ZJX1"
const PRICE_1 = 115
const PRICE_2 = 185
const OLD_PRICE_2 = 230
const GOLD = "#E8B86D"
const DARK = "#030712"

type OrderForm = { name: string; city: string; phone: string; _hp?: string }

const FAQ = [
  { q: "واش كاين Garantie على المنتج؟", a: "نعم، كنقدمو Garantie ديال شهر كامل، تقدر تجرب المنتج براحتك وإذا كان شي مشكل كنعاونوك مباشرة" },
  { q: "واش غادي يخدم مزيان فالطوموبيل؟", a: "نعم، راه سبيراتور قوي ومجرّب، فيه الشفط والنفخ بجوج، كينقّي الكراسي، الكوفر وحتى الزوايا الضيقة، وكيجمع الشعر والغبرة بسهولة." },
  { q: "واش كينقّي مزيان حتى الزوايا الضيقة والشعر؟", a: "نعم، فيه قوة شفط مزيانة وكيجي مع رؤوس مخصصين كيدخلو حتى للزوايا الضيقة وكيجمع الشعر والغبرة بسهولة من أول مرة." },
  { q: "واش صالح للدار والطوموبيل بجوج؟", a: "أكيد، تقدر تستعملو فالدار كيف فالطوموبيل، يعني منتوج واحد كيعطيك نظافة عملية فكل بلاصة وكيختاصر عليك بزاف." },
  { q: "واش كاين تخفيض إلا خديت جوج؟", a: "نعم، إلا خديتي جوج بثمن خاص: 195 درهم بجوج بلاصة 230 🔥 عرض زوين تستافد منو وتاخذ أكثر بثمن أقل." },
  { q: "التوصيل", a: "كتوصلك حتى للدار، بلا مصاريف خفية والدفع عند التسليم." },
]

export default function CarHomeCleanerPage() {
  const router = useRouter()
  const [form, setForm] = useState<OrderForm>({ name: "", city: "", phone: "" })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [loading, setLoading] = useState(false)
  const [formPassed, setFormPassed] = useState(false)
  const [qty, setQty] = useState(1)
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set(FAQ.map((_, i) => i)))
  const formRef = useRef<HTMLElement>(null)
  const price = qty === 2 ? PRICE_2 : PRICE_1
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
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, city: form.city, skus: PRODUCT_SKU, qty, total: price }),
    }).catch(() => null)
    const params = new URLSearchParams({ name: form.name, phone: form.phone, city: form.city, skus: PRODUCT_SKU, qty: String(qty), total: String(price) })
    router.push(`/thank-you?${params}`)
  }

  const inputCls = "w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 text-base placeholder-gray-400 outline-none text-right transition-colors"
  const onFocusGold = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = GOLD }
  const onBlurGray = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = "#e5e7eb" }

  const orderForm = (
    <div style={{ background: "#fff", borderRadius: 10, padding: "10px 18px 18px", marginTop: 10 }}>
      {/* qty offers */}
      <div style={{ marginBottom: 16 }}>
        {[
          { q: 1, label: "مكنسة كهربائية 3 في 1", price: PRICE_1 },
          { q: 2, label: "اثنان بسعر خاص", price: PRICE_2, badge: "15%-" },
        ].map((opt) => (
          <div key={opt.q} onClick={() => setQty(opt.q)} style={{
            position: "relative", padding: "20px 15px", borderRadius: 6, marginBottom: 15,
            border: qty === opt.q ? "1px solid #1E3A8A" : "1px solid #d1d1d1",
            background: qty === opt.q ? "#EFF6FF" : "#fff", cursor: "pointer",
          }}>
            {opt.badge && (
              <span style={{
                position: "absolute", top: 0, insetInlineEnd: 0, transform: "translateY(-10px)",
                background: "#0F172A", color: "#fff", fontSize: 16, fontWeight: 700,
                padding: "2.5px 10px", borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
                marginInlineEnd: 15,
              }}>{opt.badge}</span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0, position: "relative",
                border: qty === opt.q ? "1px solid #1E3A8A" : "1px solid #d1d1d1",
              }}>
                {qty === opt.q && <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1E3A8A", position: "absolute", top: 3, left: 3 }} />}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", flexGrow: 1, alignItems: "center", gap: 4, marginInlineStart: 10 }}>
                <span style={{ color: "#000", fontSize: 16, fontWeight: 800 }}>{opt.label}</span>
                <span style={{ color: "#000", fontSize: 18, fontWeight: 800, whiteSpace: "nowrap" }}>
                  {opt.price === PRICE_2 ? `${PRICE_2} درهم` : `${PRICE_1} درهم`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} onChange={(e) => setForm({ ...form, _hp: e.target.value })} />

        {/* phone */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", marginBottom: 4, direction: "rtl" }}>
            رقم الهاتف <span style={{ color: "#dc3545", marginRight: 4 }}>*</span>
          </label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <span style={{ width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>
              </span>
            <input type="tel" value={form.phone} onChange={(e) => { const f = { ...form, phone: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
              placeholder="رقم الهاتف" dir="rtl"
              style={{ flex: 1, height: 45, fontSize: 18, padding: "5px 15px", border: `1px solid ${errors.phone ? "#e20000" : "#c0c0c0"}`, borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
            />
          </div>
          {errors.phone && <p style={{ color: "#e20000", fontSize: 14, margin: "4px 0 0", textAlign: "right" }}>{errors.phone}</p>}
        </div>

        {/* name */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 15, fontWeight: 700, display: "block", marginBottom: 4, direction: "rtl" }}>الاسم الكامل</label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <span style={{ width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
              </span>
            <input type="text" value={form.name} onChange={(e) => { const f = { ...form, name: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
              placeholder="الاسم الكامل" dir="rtl"
              style={{ flex: 1, height: 50, fontSize: 18, padding: "5px 15px", border: "1px solid #c0c0c0", borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
            />
          </div>
        </div>

        {/* city */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 15, fontWeight: 700, display: "block", marginBottom: 4, direction: "rtl" }}>المدينة</label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <span style={{ width: 45, background: "#e1e1e1", border: "1px solid #c0c0c0", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
              </span>
            <input type="text" value={form.city} onChange={(e) => { const f = { ...form, city: e.target.value }; setForm(f); saveDraft(f, qty, price) }}
              placeholder="المدينة" dir="rtl"
              style={{ flex: 1, height: 50, fontSize: 18, padding: "5px 15px", border: "1px solid #c0c0c0", borderRadius: "6px 0 0 6px", outline: "none", color: "#212529", background: "#fff" }}
            />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          width: "100%", minHeight: 50, background: "#ffd200", color: "#fff", fontSize: 18, fontWeight: 700,
          border: "none", borderRadius: 6, display: "flex", justifyContent: "center", alignItems: "center",
          margin: "20px 0", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 2px 7px rgba(0,0,0,0.18)",
          animation: loading ? "none" : "btnPulse 0.82s cubic-bezier(.36,.07,.19,.97) infinite",
        }}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg className="animate-spin" style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              جاري إرسال طلبيتك...
            </span>
          ) : <><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" viewBox="0 0 16 16" style={{ marginLeft: 10 }}><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg><span style={{ color: "#fff" }}>اطلب الآن</span></>}
        </button>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen text-gray-900" dir="rtl" style={{ backgroundColor: "#fff", fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <style>{`
        @keyframes btnPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,210,0,0.5);} 50%{transform:scale(1.03);box-shadow:0 0 0 14px rgba(255,210,0,0);} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        .shaked { animation: shake 2s ease infinite; }
        details summary { list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* ══ HERO ══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/products/car-home-cleaner-hero.webp" alt="سبيراتور 3 في 1 للسيارة والدار"
        className="w-full h-auto block" width={600} height={4783}
        fetchPriority="high" decoding="async" style={{ cursor: "pointer" }}
        onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      {/* ══ HEADING ══ */}
      <div className="px-4 pt-6 pb-2 mt-12 max-w-lg mx-auto text-center">
        <h1 className="font-black text-2xl text-gray-900 leading-snug">
          سبيراتور بجودة مزيانة، ومعاه ضمان شهر كامل باش تجربو ✔️
        </h1>
        <p className="text-green-600 font-black text-sm mt-3">✅ توصيل مجاني — الدفع عند الاستلام</p>
        <p className="text-black font-black text-sm mt-0.5">⏳ الكمية محدودة — العرض سينتهي قريباً</p>
      </div>

      <div className="h-px mx-4 bg-gray-100 my-4" />

      {/* ══ FORM ══ */}
      <section ref={formRef} className="px-4 py-2 max-w-lg mx-auto" id="order-form">
        {orderForm}
      </section>

      <div className="h-4" />

      {/* ══ REVIEWS ══ */}
      <div className="px-1 max-w-lg mx-auto">
        <h2 className="font-black text-xl text-center text-gray-900 mb-4">عملائنا راضون</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/car-home-cleaner-reviews.webp" alt="تقييمات العملاء"
          className="w-full h-auto rounded-xl" loading="lazy" width={720} height={2950}
        />
      </div>

      <div className="h-6" />

      {/* ══ FAQ ══ */}
      <div className="px-4 max-w-lg mx-auto py-4">
        <h2 className="font-black text-2xl text-center text-gray-900 mb-5">الأسئلة الشائعة</h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
              <button className="w-full flex items-center justify-between px-4 py-4 text-right font-black text-gray-900 bg-white"
                onClick={() => setOpenFaq(prev => { const s = new Set(prev); if (s.has(i)) { s.delete(i) } else { s.add(i) } return s })}>
                <span>{item.q}</span>
                <svg className="w-4 h-4 shrink-0 transition-transform ml-2" style={{ transform: openFaq.has(i) ? "rotate(180deg)" : "none" }}
                  viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              {openFaq.has(i) && (
                <div className="p-4 text-gray-600 text-[16px] text-right leading-relaxed bg-white border-t border-gray-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />

      {/* ══ TRUST BADGES ══ */}
      <div className="max-w-lg mx-auto px-4 py-4">
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

      <div className="h-4" />

      {/* ══ WHATSAPP ══ */}
      <section className="max-w-lg hidden mx-auto px-4 hidden py-4">
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
            style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.5)" }}>
            🔥 اطلب الآن — الدفع عند الاستلام
          </button>
        </div>
      )}
    </div>
  )
}
