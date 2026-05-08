import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "أسبيراتور 6 في 1 للطوموبيل — توصيل مجاني + الدفع عند الاستلام",
  description: "مكنسة كهربائية قوية 6 في 1 للسيارة. طلب سريع، توصيل مجاني لجميع مدن المغرب، الدفع عند الاستلام.",
}

export default function VcClLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Next.js App Router hoists <link> to <head> — preloads hero before JS runs */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preload" as="image" href="/products/1-3.webp" />
      {children}
    </>
  )
}
