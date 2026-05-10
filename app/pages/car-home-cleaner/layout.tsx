import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "سبيراتور 3 في 1 للسيارة والدار — توصيل مجاني + الدفع عند الاستلام",
  description: "سبيراتور قوي 3 في 1 للسيارة والدار. ضمان شهر كامل، توصيل مجاني لجميع مدن المغرب، الدفع عند الاستلام.",
}

export default function CarHomeCleanerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/products/car-home-cleaner-hero.webp" />
      {children}
    </>
  )
}
