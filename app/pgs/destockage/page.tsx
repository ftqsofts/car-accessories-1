"use client"

import Destockage, { type Niche } from "@/components/Destockage"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function DestockageContent() {
  const params = useSearchParams()
  const phone = params.get("phone") ?? ""
  const nicheParam = params.get("niche") as Niche | null

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      <Destockage niche={nicheParam ?? undefined} phone={phone} />
    </div>
  )
}

export default function DestockagePage() {
  return (
    <Suspense>
      <DestockageContent />
    </Suspense>
  )
}
