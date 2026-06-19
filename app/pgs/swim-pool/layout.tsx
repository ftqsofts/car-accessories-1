import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "مسبح عائلي قابل للنفخ — توصيل مجاني + الدفع عند الاستلام",
  description: "مسبح عائلي قابل للنفخ بـ 3 مقاسات، مناسب للكبار والصغار. مصنوع من PVC مقاوم، توصيل مجاني لجميع مدن المغرب، الدفع عند الاستلام.",
}

export default function SwimPoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/products/swim-pool/swim-pool -1.webp" />
      {children}
    </>
  )
}
