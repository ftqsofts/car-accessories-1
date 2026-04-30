const badges = [
  { img: "/icons/waraico.webp", title: "ضمان المنتج", sub: "ضمان لمدة 30 يوم ادا لم يعجبك يمكنك استعاد نقودك" },
  { img: "/icons/codincon.webp", title: "جرب عاد خلص", sub: "لن تقوم بدفع اي شئ حتى تتوصلي بالمنتج و فحصه." },
  { img: "/icons/cussup.webp", title: "خدمة ما بعد البيع", sub: "خدمة العملاء مباشرة تحت تصرفك طيلة أيام الأسبوع" },
  { img: "/icons/shipico.webp", title: "شحن سريع وموثوق", sub: "نشحن في جميع المدن خلال 24h إلى 48h" },
]

export default function TrustBadges() {
  return (
    <section className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-black text-gray-900 text-center mb-6">الضمانات والاسترجاع</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {badges.map((item, i) => (
          <div key={i} className="px-5 py-6 bg-white rounded-2xl shadow-sm text-center" style={{ border: "1px solid #f3f4f6" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt={item.title} className="h-16 w-auto mx-auto mb-3 object-contain" />
            <p className="text-gray-900 font-black text-base mb-1">{item.title}</p>
            <p className="text-gray-500 text-sm">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}