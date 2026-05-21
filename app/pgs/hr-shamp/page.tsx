"use client"

import OrderForm from "@/components/OrderForm"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "18SGTM"
const PRICE_1 = 125
const PRICE_2 = 200
const SAVING = PRICE_1 * 2 - PRICE_2

const FAQ = [
  { q: "واش هذا الشامبو غادي يكون مناسب لجميع أنواع الشعر؟", a: "نعم، الشامبو ديالنا مناسب لجميع أنواع الشعر — الجاف، الدهني، والمختلط. كيغذي الشعر من الجذر للأطراف." },
  { q: "شحال يخد باش نشوف النتيجة؟", a: "النتيجة كتبان من أول استعمال — الشعر كيبان أسود وطبيعي مباشرة بعد الغسيل. ماخصكش تنتظر أسابيع." },
  { q: "شحال كيبقى اللون؟", a: "كيختلف حسب الشعر وعدد المرات اللي كتغسل فيها شعرك، ولكن غالباً كيبقى عدة غسلات قبل ما تحتاج تعاودوه." },
  { q: "كيفاش نستعملو بالطريقة الصحيحة؟", a: "بلل الشعر مزيان، حط الكمية المناسبة وضرب برفق، خليه 10 دقائق عاد شطفه بالماء. الميزة الكبرى ديالو هي أنك محتاج تستعملوه غير مرة واحدة فالشهر — خلاف الشامبوات الأخرى اللي كتحتاج تستعملها كل أسبوع." },
  { q: "واش كاين قفازات مع المنتج؟", a: "إيه، المنتج كيجي مع قفازات باش تحمي يديك ملي كتطبقو. كنصحوا دايما تلبسوهم قبل الاستعمال." },
  { q: "واش نقدر نستعمل شامبو آخر من بعدو؟", a: "تقدر، ولكن أحسن ما تستعملش شامبو آخر مباشرة من بعدو باش اللون ما يخفش. الكونديسيونار عادي تستعملوه." },
  { q: "واش كاين Garantie على المنتج؟", a: "نعم، كنقدمو ضمان شهر كامل — إذا ماعجبكيش المنتج كنرجعو ليك الفلوس بلا أي سؤال." },
  { q: "التوصيل", a: "كنوصلو لجميع مدن المغرب مجانا، والدفع عند الاستلام — ماخصكش تخلص حتى حاجة قبل ما يوصلك المنتج." },
]

const LP_IMAGES_TOP = [
  "/products/hair-shampoo/lp-1-2.webp",
  "/products/hair-shampoo/lp-2.webp",
  "/products/hair-shampoo/lp-6.webp",
  "/products/hair-shampoo/lp-5.webp",
  "/products/hair-shampoo/lp-3.webp",
  "/products/hair-shampoo/lp-4.webp",
]

const LP_IMAGES_BOTTOM = [
  "/products/hair-shampoo/social-proof.webp",
  "/products/hair-shampoo/proof.jpg",
]

export default function HrShampPage() {
  const [formPassed, setFormPassed] = useState(false)
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set(FAQ.map((_, i) => i)))
  const formRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = "/products/hair-shampoo/hair-shamp-proof.mp4"
          video.load()
          observer.disconnect()
        }
      },
      { rootMargin: "400px" }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

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

      {/* ══ LP IMAGES TOP (1-6) ══ */}
      <div className="max-w-lg mx-auto" style={{ lineHeight: 0, fontSize: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LP_IMAGES_TOP[0]} alt="شامبو طبيعي للشعر" width={800} height={800}
          fetchPriority="high" decoding="async"
          style={{ display: "block", width: "100%", height: "auto", margin: 0, padding: 0, cursor: "pointer" }}
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
        {LP_IMAGES_TOP.slice(1).map((src: string, i: number) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" width={800} height={800} loading="lazy"
            style={{ display: "block", width: "100%", height: "auto", margin: 0, padding: 0, marginTop: -2, cursor: "pointer" }}
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        ))}
      </div>

      {/* ══ VIDEO ══ */}
      {/* <div className="max-w-lg mx-auto bg-white -mt-3" style={{ lineHeight: 0, fontSize: 0 }}>
        <video ref={videoRef} className="rounded-2xl" autoPlay loop muted playsInline style={{ display: "block", width: "100%", height: "auto" }} />
      </div> */}

      {/* ══ FORM ══ */}
      <section ref={formRef} className="px-4 py-2 my-8 max-w-lg mx-auto" id="order-form">
        
        <p className="text-green-600 font-black text-lg mt-3">✅ توصيل مجاني — الدفع عند الاستلام</p>
        <p className="text-black font-black text-lg mt-0.5">⏳ الكمية محدودة — العرض سينتهي قريباً</p>
        <OrderForm
          sku={PRODUCT_SKU}
          pack="hr-shamp"
          options={[
            {
              q: 1,
              label: "شامبو Disaar الأصلي — قارورة واحدة ",
              price: PRICE_1,
              oldPrice: 160,
            },
            {
              q: 2,
              label: "اثنان بسعر خاص",
              price: PRICE_2,
              oldPrice: PRICE_1 * 2,
              badge: `وفر ${SAVING} درهم`,
            },
          ]}
        />
      </section>

       {/* ══ WHATSAPP ══ */}
      <section className="max-w-lg mx-auto px-4 py-4">
        <div className="rounded-3xl p-6 text-center space-y-4">
          <p className="text-white font-black text-xl">عندك سؤال؟ تواصل معنا مباشرة</p>
          <p className="text-white/50 text-sm">فريقنا مساند ليك على واتساب</p>
          <a href="https://wa.me/212787046070?text=Salam" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-lg text-white active:scale-95 transition-all shadow-lg"
            style={{ backgroundColor: "#25D366" }}>
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white shrink-0">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.649 4.942 1.883 7.115L2 30l7.115-1.863A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.88-1.603l-.42-.25-4.223 1.106 1.13-4.115-.274-.434A11.559 11.559 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.338-8.607c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.9 1.129-1.103 1.362-.203.232-.406.26-.754.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.203-.347-.022-.535.152-.708.156-.155.347-.406.52-.61.174-.202.232-.347.347-.578.116-.232.058-.435-.029-.61-.087-.174-.783-1.887-1.073-2.585-.283-.678-.57-.586-.783-.597l-.667-.012c-.232 0-.61.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.367 1.42 3.599c.174.232 2.454 3.747 5.946 5.254.831.359 1.48.573 1.986.733.834.265 1.594.228 2.194.138.669-.1 2.055-.84 2.345-1.651.29-.812.29-1.507.203-1.651-.086-.145-.318-.232-.666-.406z" />
            </svg>
            تواصل معنا على واتساب
          </a>
        </div>
      </section>

      {/* ══ LP IMAGES BOTTOM (7+) ══ */}
      <div className="max-w-lg mx-auto" style={{ lineHeight: 0, fontSize: 0 }}>
        {LP_IMAGES_BOTTOM.map((src: string, i: number) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" width={800} height={800} loading="lazy"
            style={{ display: "block", width: "100%", height: "auto", margin: 0, padding: 0, marginTop: -2, cursor: "pointer" }}
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        ))}
      </div>

      {/* ══ CTA ══ */}
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

      {/* ══ WHATSAPP ══ */}
      <section className="max-w-lg mx-auto px-4 py-4">
        <div className="rounded-3xl p-6 text-center space-y-4">
          <p className="text-white font-black text-xl">عندك سؤال؟ تواصل معنا مباشرة</p>
          <p className="text-white/50 text-sm">فريقنا مساند ليك على واتساب</p>
          <a href="https://wa.me/212787046070?text=Salam" target="_blank" rel="noopener noreferrer"
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
        <div className="inline-flex items-center gap-2 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ background: "#fdf8ee", border: "1px solid #E8B86D", color: "#92712a" }}>
          🚚 توصيل مجاني لجميع مدن المغرب
        </div>
        <p className="text-gray-400 text-xs">© 2025 Storecoma — جميع الحقوق محفوظة</p>
        {/* <div className="mx-auto mt-4 w-max">
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" loading="lazy" />
        </div> */}
      </footer>

      {/* ══ STICKY BUTTON ══ */}
      {formPassed && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full text-black font-black text-base py-4 rounded-2xl active:scale-95 shaked"
            style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.5)" }}>
            🛒 اطلب الآن — الدفع عند الاستلام
          </button>
        </div>
      )}


      {/* ══ WHATSAPP FLOAT ══ */}
      <a
        href="https://wa.me/212787046070?text=Salam"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-xl active:scale-95 transition-all hidden"
        style={{ bottom: "80px", backgroundColor: "#25D366" }}
        aria-label="تواصل معنا على واتساب"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.649 4.942 1.883 7.115L2 30l7.115-1.863A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.88-1.603l-.42-.25-4.223 1.106 1.13-4.115-.274-.434A11.559 11.559 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.338-8.607c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.9 1.129-1.103 1.362-.203.232-.406.26-.754.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.203-.347-.022-.535.152-.708.156-.155.347-.406.52-.61.174-.202.232-.347.347-.578.116-.232.058-.435-.029-.61-.087-.174-.783-1.887-1.073-2.585-.283-.678-.57-.586-.783-.597l-.667-.012c-.232 0-.61.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.367 1.42 3.599c.174.232 2.454 3.747 5.946 5.254.831.359 1.48.573 1.986.733.834.265 1.594.228 2.194.138.669-.1 2.055-.84 2.345-1.651.29-.812.29-1.507.203-1.651-.086-.145-.318-.232-.666-.406z" />
        </svg>
      </a>
    </div>
  )
}
