import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coffre-fort intelligent en acier Beetro — Livraison gratuite + Paiement à la livraison",
  description: "Coffre-fort électronique domestique en acier pour protéger l'or, l'argent et les documents. Garantie d'un an, livraison gratuite dans toutes les villes du Maroc, paiement à la livraison.",
}

export default function CoffrtFrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" as="image" href="/products/coffre-fort/1.webp" />
      {children}
    </>
  )
}
