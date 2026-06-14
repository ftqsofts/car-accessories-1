"use client"

import Destockage, { type Niche } from "@/components/Destockage"
import { packs, products } from "@/lib/products"
import { Headphones, Truck } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

function ThankYouContent() {
  const params = useSearchParams()

  const name = params.get("name") || ""
  const phone = params.get("phone") || ""
  const city = params.get("city") || ""
  const total = params.get("total") || ""
  const skus = params.get("skus") || ""
  const qty = params.get("qty") || ""
  const packId = params.get("pack") || ""

  useEffect(() => {
    if (window.fbq && total) {
      window.fbq("track", "Purchase", { value: Number(total), currency: "MAD" })
    }
  }, [total])

  // Find the pack if packId exists
  const pack = packId ? packs.find(p => p.id === packId) : null

  const NICHE_MAP: Record<string, Niche> = {
    "super-vc": "vacuum",
    "coffrt": "shampoo",
    "hr-shamp": "shampoo",
  }
  const niche = NICHE_MAP[packId] ?? undefined

  const [upsells, setUpsells] = useState<{ title: string; price: number; images: string[] }[]>([])
  const upsellTotal = upsells.reduce((sum, u) => sum + u.price, 0)

  // Get products based on pack or SKUs
  const orderedProducts = pack
    ? pack.productIds.map(id => products.find(p => p.id === id)).filter(Boolean)
    : skus.split(";").map(id => products.find(p => p.id === id || p.sku === id)).filter(Boolean)


  return (
    <div className="min-h-screen bg-gray-50 pb-16" dir="rtl" style={{ fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <div className="w-full max-w-md mx-auto px-4 pt-6">

        {/* Success banner — text only */}
        <p className="font-black text-xl text-gray-900 text-center mb-4">شكراً على ثقتكم فـ Storecoma ✅</p>

        {/* Order summary — single card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm">
          {/* Total */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <span className="text-gray-400 text-sm font-bold">قالب عد خلاص</span>
            <span className="text-[#C8962A] font-black text-3xl">{Number(total) + upsellTotal} <span className="text-sm">درهم</span></span>
          </div>
          {/* Details */}
          <div className="flex flex-col gap-2 mb-4">
            {name && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">الاسم</span>
                <span className="text-gray-900 font-black text-sm">{name}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">التيليفون</span>
              <span className="text-gray-900 font-black text-sm">{phone}</span>
            </div>
            {city && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">المدينة</span>
                <span className="text-gray-900 font-black text-sm">{city}</span>
              </div>
            )}
          </div>
          {/* Ordered products */}
          {(orderedProducts.length > 0 || upsells.length > 0) && (
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
              {orderedProducts.map((p) => (
                <div key={p!.id} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image src={p!.image} alt={p!.nameDarija} fill className="object-cover" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-black text-sm">{p!.nameDarija}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{p!.tagline}</p>
                  </div>
                </div>
              ))}
              {upsells.map((u, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image src={u.images[0]} alt={u.title} fill className="object-cover" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-black text-sm">{u.title}</p>
                    <p className="text-green-600 text-xs font-bold mt-0.5">{u.price} درهم</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Callback + delivery inside same card */}
          <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-gray-900 font-black text-sm">غادي نتصلو بيك</p>
                <p className="text-gray-500 text-xs">باش نأكّدو معاك الطلبية والعنوان</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-700 shrink-0" />
              <div>
                <p className="text-gray-900 font-black text-sm">توصيل مجاني لجميع مدن المغرب</p>
                <p className="text-gray-500 text-xs">بين 24h و 48h — الدفع عند الاستلام</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Cross-sell — full width below */}
      {phone && <Destockage niche={niche} phone={phone} onAdd={(p) => setUpsells(prev => [...prev, p])} />}
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  )
}
