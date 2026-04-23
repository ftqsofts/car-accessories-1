"use client"

import type { Product } from "@/lib/products"
import { Check, ChevronLeft, X } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

type Props = {
  product: Product
  isSelected: boolean
  onSelect: () => void
  onClose: () => void
}

export default function ProductModal({ product, isSelected, onSelect, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-white rounded-t-3xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]">

        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200" dir="rtl">
          <span className="text-gray-900 font-black text-base">{product.nameDarija}</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Product image */}
        <div className="relative h-96 w-full bg-gray-100">
          <Image
            src={product.image}
            alt={product.nameDarija}
            fill
            className="object-cover"
            sizes="512px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          <span className="absolute top-3 right-3 bg-[#E8B86D] text-black text-xs font-black px-3 py-1 rounded-full">
            {product.categoryDarija}
          </span>
        </div>

        {/* Content */}
        <div className="px-5 py-4 max-h-60 overflow-y-auto" dir="rtl">
          <p className="text-gray-600 text-sm leading-loose mb-4">{product.descriptionDarija}</p>

          <p className="text-gray-900 font-black text-sm mb-3">علاش هاد المنتج؟</p>
          <div className="space-y-2">
            {product.featuresDarija.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <ChevronLeft className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 pb-6 pt-2 border-t border-gray-100">
          <button
            onClick={() => { onSelect(); onClose() }}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
              isSelected
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "bg-[#E8B86D] text-black hover:bg-[#d4a45c] shadow-lg shadow-[#E8B86D]/30"
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-5 h-5" />
                تمّ الإضافة للباك ✓
              </>
            ) : (
              "زيد هاد المنتج للباك"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
