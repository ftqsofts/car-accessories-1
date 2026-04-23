import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })

export const metadata: Metadata = {
  title: "كار باك — أحسن إكسسوارات طوموبيل بالمغرب",
  description: "اختار 2 منتوجات أو أكثر وفر فلوسك. توصيل مجاني لجميع مدن المغرب. الدفع عند الاستلام.",
  robots: "noindex",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={inter.variable}>
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  )
}
