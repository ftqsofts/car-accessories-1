import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "شامبو ديسار الأصلي — تخلص من الشيب في 10 دقائق | توصيل مجاني + الدفع عند الاستلام",
  description: "شامبو طبيعي لتغطية الشيب بسرعة وسهولة. متوفر باللون الأسود والمارون. توصيل مجاني لجميع مدن المغرب، الدفع عند الاستلام.",
}

export default function HrShampLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/products/hair-shampoo/lp-1-2.webp" fetchPriority="high" />
      {children}
    </>
  )
}