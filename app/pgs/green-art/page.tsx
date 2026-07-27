"use client"

import OrderForm from "@/components/OrderForm"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "1DAIRB"
const PRICE_1 = 159
const PRICE_2 = 299
const OLD_PRICE_1 = 199
const OLD_PRICE_2 = 399
const SAVING = PRICE_1 * 2 - PRICE_2
const GOLD = "#E8B86D"
const DARK = "#030712"

const IMAGES = [
  "/products/green-art/2.webp",
  "/products/green-art/1.webp",
  "/products/green-art/g1q9hvbq4StYofCR66yopvt7BCC0cEF3fLlLzoQg.webp",
]

const IMAGES2 = [
  "/products/green-art/PlrFwGHcNT5B0BZGSdCkvUKoYKNG5rVjBlvMZ9Sd.webp",
  "/products/green-art/2.webp",
  "/products/green-art/3.webp",
]

const FAQ = [
  { q: "هل يمكن تركيبه على أي سور؟", a: "نعم، يمكن تثبيته على أغلب أنواع الأسوار والشبكات المعدنية بسهولة باستعمال الرباط المرفق." },
  { q: "هل يمكن قصّه حسب المقاس؟", a: "نعم، يمكن قصّه بسهولة حسب المساحة المطلوبة عندك بمقص عادي." },
  { q: "هل يحتاج إلى صيانة أو سقي؟", a: "لا، يبقى أخضر طوال السنة دون الحاجة إلى سقي أو تقليم أو أي عناية إضافية." },
  { q: "هل يصلح للاستعمال الخارجي ومقاوم للشمس والمطر؟", a: "نعم، مصنوع بمواد مقاومة للعوامل الجوية، مناسب للحدائق، البالكونات، والأسوار الخارجية طوال السنة." },
  { q: "شحال المقاس ديال القطعة الواحدة؟", a: "كل رول قياسه 1 متر × 3 متر، تقدر تربط عدة رولات باش تغطي مساحة أكبر." },
  { q: "واش كاين Garantie على المنتج؟", a: "نعم، كنقدمو ضمان — إلا ماعجبكش المنتج كنعاونوك مباشرة." },
  { q: "التوصيل", a: "كنوصلو لجميع مدن المغرب، توصيل مجاني والدفع عند الاستلام — ماخصكش تخلص حتى حاجة قبل ما يوصلك المنتج." },
]

export default function GreenArtPage() {
  const [formPassed, setFormPassed] = useState(false)
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set(FAQ.map((_, i) => i)))
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
        @keyframes btnPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,210,0,0.5);} 50%{transform:scale(1.03);box-shadow:0 0 0 14px rgba(255,210,0,0);} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        .shaked { animation: shake 2s ease infinite; }
        details summary { list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* ══ PRODUCT GALLERY ══ */}
      <div style={{ backgroundColor: "#fff", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ position: "relative", backgroundColor: "#f5f5f5", lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES[activeImg]} alt="حائط عشب صناعي"
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

      {/* ══ HEADING ══ */}
      <div className="px-4 pt-4 pb-2 max-w-lg mx-auto">
        <h1 className="font-black text-xl text-gray-900 mb-2 text-right leading-snug">سياج نباتي فاخر أنيق لمنزلك أو محلك</h1>
        <p className="text-gray-500 text-sm text-right mb-3">مقاوم للعوامل الخارجية، بدون صيانة، يبقى أخضر طوال السنة</p>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-black text-3xl" style={{ color: DARK }}>{PRICE_1} درهم</span>
          <span className="text-gray-400 text-lg font-bold line-through">{OLD_PRICE_1} درهم</span>
          <span className="text-white text-xs font-black px-2 py-1 rounded-full bg-red-500">
            -{Math.round((1 - PRICE_1 / OLD_PRICE_1) * 100)}%
          </span>
        </div>
        <p className="text-green-600 font-bold text-sm">الدفع عند الاستلام والتأكد من الجودة</p>
        <p className="text-gray-500 font-bold text-sm mt-0.5">توصيل مجاني لجميع مدن المغرب</p>
      </div>

      {/* ══ QUALITY PROOF ══ */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="rounded-2xl overflow-hidden mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/green-art/g1q9hvbq4StYofCR66yopvt7BCC0cEF3fLlLzoQg.webp" alt="جودة أوراق السياج عن قرب" width={1141} height={2000} loading="lazy" decoding="async"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
        <h2 className="font-black text-xl text-center text-gray-900 mb-4">أفضل جودة</h2>
        <div className="flex flex-col gap-2">
          {[
            { t: "أوراق مزدوجة الطبقة (Double-Layer)", d: "طبقتين كثيفتين، منظر طبيعي 100% وحجب كامل للرؤية." },
            { t: "مادة مقاومة للأشعة UV", d: "ما كتصفرش ولا كتبهت، اللون كيبقى أخضر طول السنة." },
            { t: "شبكة تثبيت متينة", d: "سلك مقوى كيبقى ثابت حتى فالرياح القوية." },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-4" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <p className="text-gray-900 font-black text-sm mb-1 text-right">✔️ {f.t}</p>
              <p className="text-gray-500 font-semibold text-sm leading-relaxed text-right">{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FORM ══ */}
      <section ref={formRef} className="px-5 py-6 my-8 max-w-lg mx-auto bg-white rounded-xl text-right" id="order-form" dir="rtl">
        {/* ══ QUICK FEATURES ══ */}
        <div className="flex flex-col gap-2 mb-6">
          {[
            "كل رول مقاسه 1 متر × 3 متر",
            "سهل القص والتفصيل حسب المقاس",
            "ثابت ومقاوم للرياح",
            "ضمان شهر و خدمة ما بعد البيع",
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full shrink-0" style={{ background: "#1E3A8A" }}>
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none">
                  <path d="M3 8.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-gray-900 font-black text-base">{t}</span>
            </div>
          ))}
        </div>

        <OrderForm
        sku={PRODUCT_SKU}
        pack="green-art"
        options={[
          { q: 1, label: "رول واحد (1م × 3م)", price: PRICE_1, oldPrice: OLD_PRICE_1 },
          { q: 2, label: "جوج رولوات (غطي مساحة أكبر 6 متر)", price: PRICE_2, oldPrice: OLD_PRICE_2, badge: `وفر ${SAVING} درهم` },
        ]}
        />
      </section>

      <div className="max-w-lg mx-auto px-4 pt-2">
        <h2 className="font-black text-xl text-center text-gray-900 mb-4">نتائج رائعة</h2>
        <div style={{ lineHeight: 0, fontSize: 0 }}>
          {IMAGES2.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" className="w-full mb-2 rounded-xl" style={{ objectFit: "cover"}} />
          ))}
        </div>
      </div>


      

      {/* ══ COMPARISON ══ */}
      <div className="max-w-lg mx-auto px-4 my-12">
        <h2 className="font-black text-xl text-center text-gray-900 mb-4">مقارنة مع الأنواع العادية</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
          {/* header row */}
          <div className="grid grid-cols-5 text-center" style={{ background: "#F8FAFC" }}>
            <div className="col-span-3 py-3 text-gray-500 font-bold text-xs">المعيار</div>
            <div className="py-3 text-gray-500 font-bold text-xs border-x" style={{ borderColor: "#e5e7eb" }}>العادي</div>
            <div className="py-3 font-black text-xs" style={{ color: "#166534" }}>ديالنا 🌿</div>
          </div>
          {[
            { c: "كثافة الأوراق", a: false, b: true },
            { c: "مقاومة الأشعة UV", a: false, b: true },
            { c: "ثبات مع الرياح", a: false, b: true },
            { c: "منظر طبيعي 100%", a: false, b: true },
            { c: "قابل للقص بلا ما يتفكك", a: false, b: true },
            { c: "ضمان شهر", a: false, b: true },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-5 text-center items-center" style={{ borderTop: "1px solid #e5e7eb" }}>
              <div className="col-span-3 py-3 text-gray-700 font-bold text-xs px-1">{row.c}</div>
              <div className="py-3 border-x flex items-center justify-center" style={{ borderColor: "#e5e7eb" }}>
                <span className="text-red-500 text-lg">✕</span>
              </div>
              <div className="py-3 flex items-center justify-center" style={{ background: "#F0FDF4" }}>
                <span className="text-lg" style={{ color: "#166534" }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ══ CTA ══ */}
      <div className="px-4 max-w-lg mx-auto py-2">
        <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="w-full text-black font-black text-lg py-5 rounded-2xl active:scale-95 shaked"
          style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.4)" }}>
          🛒 اطلب الآن — الدفع عند الاستلام
        </button>
      </div>

      {/* ══ FAQ ══ */}
      <div className="px-4 max-w-lg mx-auto py-6">
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
        <h2 className="text-gray-900 font-black text-2xl text-center mb-5">اطلب الآن بكل ثقة</h2>
        <div className="flex flex-col gap-3">
          {[
            { img: "/icons/waraico.webp", title: "ضمان المنتج", sub: "ضمان — ماعجبكش كنعاونوك مباشرة" },
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

      {/* ══ FOOTER ══ */}
      <footer className="px-5 py-8 mb-20 text-center" style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="inline-flex items-center gap-2 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ background: "#fdf8ee", border: `1px solid ${GOLD}`, color: "#92712a" }}>
          🚚 توصيل مجاني لجميع مدن المغرب
        </div>
        <p className="text-gray-400 text-xs">© 2025 Storecoma — جميع الحقوق محفوظة</p>
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
