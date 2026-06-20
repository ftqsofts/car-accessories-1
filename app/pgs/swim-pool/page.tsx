"use client"

import OrderForm from "@/components/OrderForm"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "swimpool"
const PRICE_1 = 299
const PRICE_2 = 499
const PRICE_3 = 599
const GOLD = "#E8B86D"

const IMAGES = [
  "/products/swim-pool/swim-pool -1.webp",
  "/products/swim-pool/swim-pool-2.webp",
]

const FAQ = [
  { q: "واش كاين ضمان على المسبح؟", a: "نعم، كنقدمو ضمان شهر كامل — إذا ماعجبكيش المنتج أو كاين شي مشكل كنرجعو ليك الفلوس بلا أي سؤال." },
  { q: "واش المسبح متين ومضمون؟", a: "نعم، مصنوع من PVC مقاوم للتقب والتلف، حاصل على شهادات ASTM وCPC، وخالي من مادة PBR لضمان السلامة." },
  { q: "شحال كاين من المقاسات؟", a: "كاين 3 مقاسات: 1 متر، 2 متر، و3 متر — ختار المقاس اللي يناسب العائلة ديالك أو الفضاء المتوفر." },
  { q: "واش صالح للكبار والصغار؟", a: "أكيد، المسبح مناسب للأطفال والكبار بجوج، وكيتسع لعدة أفراد فاش تختار المقاس الكبير." },
  { q: "كيفاش كنخدمو ونصفيو الماء؟", a: "تصميم ذكي بصمام تفريغ سريع — كتفرغ الماء بسهولة ويسر بعد الاستعمال، وكتقدر تخزنو فبلاصة صغيرة." },
  { q: "واش كاين أكسيسوارات مع المسبح؟", a: "نعم، المسبح كيجي مع منفاخ هوائي هدية مجانية، بالإضافة لإمكانية إضافة شبكة تنظيف وأغطية حسب التوفر." },
  { q: "التوصيل", a: "كنوصلو لجميع مدن المغرب مجانا، والدفع عند الاستلام — ماخصكش تخلص حتى حاجة قبل ما يوصلك المنتج." },
]

export default function SwimPoolPage() {
  const [formPassed, setFormPassed] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set(FAQ.map((_, i) => i)))
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
      `}</style>

      {/* ══ PRODUCT GALLERY ══ */}
      <div style={{ backgroundColor: "#fff", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ position: "relative", backgroundColor: "#f5f5f5", lineHeight: 0 }}>
          <Image
            src={IMAGES[activeImg]}
            alt="مسبح عائلي قابل للنفخ"
            width={520}
            height={380}
            priority={activeImg === 0}
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
      <div className="px-4 pt-4 pb-2 max-w-lg mx-auto text-right" dir="rtl">
        <span className="bg-red-100 text-red-800 text-xs font-black px-2.5 py-1 rounded-full inline-block mb-2 animate-pulse">
          🚨 عرض الصيف 2026
        </span>

        <h1 className="font-black text-2xl text-gray-900 mb-3 leading-tight">
         الصيف هادا 🥵 جيب البحر تال الدار وفرح وليداتك بكل أمان! 🌊
        </h1>
        <p className="font-bold text-base text-gray-800 flex items-start gap-2">
          <span>☀️</span>
          <span> <b>مسبح Bestway العائلي الأصلي</b>: متعة وانتعاش لعائلتك بلا ستريس، بلا زحام، وبلا خوف على وليداتك من الشمس.</span>
        </p>
        <div className="flex items-center gap-3 mb-2 justify-start">
          <span className="font-black text-3xl text-gray-900">{PRICE_1} درهم</span>
          <span className="text-gray-400 line-through text-sm font-bold">{Math.round(PRICE_1 * 1.4)} درهم</span>
        </div>
      </div>

      {/* ══ DESCRIPTION ══ */}
      <div className="px-4 pt-2 pb-2 max-w-lg mx-auto text-right" dir="rtl">
        <div className="space-y-2.5 mb-3">
          <p className="font-bold text-base text-gray-800 flex items-start gap-2">
            <span>📏</span>
            <span>3 أحجام مختلفة — كيهز جميع أفراد العائلة.</span>
          </p>
          <p className="font-bold text-base text-gray-800 flex items-start gap-2">
            <span>⏱️</span>
            <span>ماغادي تحتاج لا أدوات لا معلم — جاهز للسباحة فدقائق.</span>
          </p>
          <p className="font-bold text-base text-gray-800 flex items-start gap-2">
            <span>🎁</span>
            <span>نافخ هوائي هدية مجانية مع كل طلب!</span>
          </p>
        </div>

        <p className="text-red-600 font-black text-xs animate-bounce mb-3">⏳ الكمية محدودة قبل دخول الصيف — العرض سينتهي قريباً</p>
      </div>

      <div className="h-px mx-4 bg-gray-100 my-4" />

      {/* ══ FORM ══ */}
      <section ref={formRef} className="px-4 py-2 mb-16 max-w-lg mx-auto" id="order-form">
        <OrderForm
          sku={PRODUCT_SKU}
          pack="swim-pool"
          options={[
            {
              q: 1,
              label: "مسبح 1 متر — مناسب للأطفال",
              price: PRICE_1,
              oldPrice: Math.round(PRICE_1 * 1.4),
              sku: "SWIM1M"
            },
            {
              q: 2,
              label: "مسبح 2 متر — مناسب للعائلة الصغيرة",
              price: PRICE_2,
              oldPrice: Math.round(PRICE_2 * 1.4),
              sku: "SWIM2M"
            },
            {
              q: 3,
              label: "مسبح 3 متر — الأكبر، لجميع العائلة",
              price: PRICE_3,
              oldPrice: Math.round(PRICE_3 * 1.4),
              badge: "الأكثر طلباً",
              sku: "SWIM3M"
            },
          ]}
        />

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 my-3 space-y-1">
          <p className="text-emerald-700 font-black text-sm flex items-center gap-1.5">
            ✅ التوصيل مجاني فجميع مدن المغرب + حق فحص المسبح والتأكد من الجودة قبل الدفع
          </p>
        </div>

        <div className="bg-gray-900 text-white p-4 rounded-xl text-center shadow-lg mt-6">
          <h2 className="font-black text-xl mb-1 text-amber-500">🛡️ الضمان الذهبي لرضا العملاء</h2>
          <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto leading-relaxed">
            نقدم لكم ضماناً حقيقياً لمدة شهر كامل ضد أي عيب فالصنع، مع استبدال فوري مجاني حتى باب منزلك.
          </p>
        </div>
      </section>

      <div className="h-4" />

      {/* ══ LP IMAGE (details) ══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/products/swim-pool/lp.webp" alt="مسبح عائلي قابل للنفخ"
        className="w-full h-auto block rounded-b-xl shadow-sm transition-transform duration-300 hover:scale-[1.01]" loading="lazy" decoding="async" style={{ cursor: "pointer" }}
        onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      {/* ══ CTA 1 ══ */}
      <div className="px-4 max-w-lg mx-auto py-6">
        <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="w-full text-black font-black text-lg py-5 rounded-2xl active:scale-95 shaked"
          style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.4)" }}>
          🛒 اطلب الآن — الدفع عند الاستلام
        </button>
      </div>

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
