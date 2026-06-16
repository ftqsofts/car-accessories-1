import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "خزنة Beetro الفولاذية الذكية — توصيل مجاني + الدفع عند الاستلام",
  description: "خزنة منزلية إلكترونية فولاذية لحماية الذهب والفلوس والوثائق. ضمان سنة كاملة، توصيل مجاني لجميع مدن المغرب، الدفع عند الاستلام.",
}

export default function CoffrtLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/products/coffre-fort/1.webp" />
      {children}
    </>
  )
}
