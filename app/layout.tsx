import type { Metadata, Viewport } from "next"
import { Cairo, Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700", "900"], variable: "--font-cairo", display: "swap" })

export const metadata: Metadata = {
  title: "Ecoma",
  description: "توصيل مجاني لجميع مدن المغرب. الدفع عند الاستلام",
  robots: "noindex",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable}`}>
      <body className="antialiased ">
        {children}
        {/* <Script src="/protect.js" strategy="afterInteractive" /> */}
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","uqlz2aqp5i");
          setTimeout(function(){ window.clarity && window.clarity("upgrade", "record-all"); }, 3000);
        `}</Script>
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '998853804971821');
          fbq('track', 'PageView');
        `}</Script>
      </body>
    </html>
  )
}
