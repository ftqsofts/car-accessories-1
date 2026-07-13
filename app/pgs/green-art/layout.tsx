import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "حائط عشب صناعي — خصوصية فورية للشرفة والحديقة | توصيل مجاني + الدفع عند الاستلام",
  description: "حائط عشب صناعي (لبلاب) لتغطية الشرفة والسياج بمظهر طبيعي أنيق. مقاوم للشمس والمطر، سهل التركيب. توصيل مجاني لجميع مدن المغرب، الدفع عند الاستلام.",
}

export default function GreenArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/products/green-art/5khQgfDjdCcWJy0MxeUoBVKx3oMlxyRkzUoYBisE_lg.webp" fetchPriority="high" />
      {children}
    </>
  )
}
