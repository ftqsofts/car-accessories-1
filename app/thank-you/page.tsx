"use client"

import { products } from "@/lib/products"
import { Headphones, Truck } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

function ThankYouContent() {
  const params = useSearchParams()
  const router = useRouter()

  const name = params.get("name") || ""
  const phone = params.get("phone") || ""
  const city = params.get("city") || ""
  const total = params.get("total") || ""
  const skus = params.get("skus") || ""
  const qty = params.get("qty") || ""

  useEffect(() => {
    if (window.fbq && total) {
      window.fbq("track", "Purchase", { value: Number(total), currency: "MAD" })
    }
  }, [total])

  const orderedProducts = skus
    ? skus.split(";").map(id => products.find(p => p.id === id)).filter(Boolean)
    : []


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-10 px-4 pb-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/storecoma-logo.png" alt="logo" width={80} height={50} className="object-contain" />
        </div>

        {/* Success banner */}
        <div className="bg-[#E8B86D] rounded-3xl p-8 text-center mb-5 shadow-xl shadow-[#E8B86D]/30">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-black font-black text-3xl mb-2">شكراً على ثقتك فـ Storecoma!</h1>
          <p className="text-black/70 text-base font-bold">وصلتنا طلبيتك بنجاح</p>
        </div>


        {/* Order summary */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-4 shadow-sm" dir="rtl">
          <p className="text-gray-900 font-black text-base mb-4 border-b border-gray-100 pb-3">تفاصيل طلبيتك</p>

          <div className="space-y-3">
            {name && (
              <div>
                <p className="text-gray-400 text-xs mb-0.5">الاسم</p>
                <p className="text-gray-900 font-black text-base">{name}</p>
              </div>
            )}
            <div>
              <p className="text-gray-400 text-xs mb-0.5">التيليفون</p>
              <p className="text-gray-900 font-black text-base">{phone}</p>
            </div>
            {city && (
              <div>
                <p className="text-gray-400 text-xs mb-0.5">المدينة</p>
                <p className="text-gray-900 font-black text-base">{city}</p>
              </div>
            )}
            <div>
              <p className="text-gray-400 text-xs mb-0.5">عدد المنتوجات</p>
              <p className="text-gray-900 font-black text-base">{qty} منتوجات</p>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-gray-400 text-xs mb-0.5">المجموع الكلي</p>
              <p className="text-[#C8962A] font-black text-4xl leading-none">{total} <span className="text-xl">درهم</span></p>
              <p className="text-gray-400 text-xs mt-1">الدفع عند الاستلام</p>
            </div>
          </div>
        </div>

        {/* Ordered product images */}
        {orderedProducts.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-4 shadow-sm">
            <p className="text-gray-900 font-black text-base mb-4 border-b border-gray-100 pb-3 text-right">المنتوجات اللي طلبتي</p>
            <div className="flex flex-col gap-4">
              {orderedProducts.map((p) => (
                <div key={p!.id} className="flex items-center gap-3">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    <Image src={p!.image} alt={p!.nameDarija} fill className="object-cover" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-black text-sm">{p!.nameDarija}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{p!.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call back notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 mb-4 text-center">
          <Headphones className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <p className="text-gray-900 font-black text-lg mb-1">غادي نعيّطو عليك قريباً</p>
          <p className="text-gray-500 text-sm leading-loose">باش نأكّدو معاك الطلبية والعنوان</p>
        </div>

        {/* Delivery notice */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 mb-6 text-center shadow-sm">
          <Truck className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-900 font-black text-lg mb-1">التوصيل بين 24h و 48h</p>
          <p className="text-gray-500 text-sm">لجميع مدن المغرب — مجاناً</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full py-4 bg-gray-900 text-white font-black text-base rounded-2xl active:scale-95 transition-all"
        >
          ارجع للصفحة الرئيسية
        </button>
      </div>
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
