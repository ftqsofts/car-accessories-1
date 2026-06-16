"use client"

import OrderForm from "@/components/OrderForm"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const PRODUCT_SKU = "coffrt"
const PRICE_1 = 295
const PRICE_2 = 550
const GOLD = "#E8B86D"

const IMAGES = [
  "/products/coffre-fort/1.webp",
  "/products/coffre-fort/2.webp",
  "/products/coffre-fort/3.webp",
  "/products/coffre-fort/how-to-use.webp",
  // "/products/coffre-fort/lg-1-2.webp",
  // "/products/coffre-fort/lg-2.webp",
]

const FAQ = [
  { q: "Y a-t-il une garantie sur le coffre-fort ?", a: "Oui, nous offrons une garantie d'un mois complet — si le produit ne vous convient pas ou s'il y a un problème, nous vous remboursons sans aucune question." },
  { q: "Le coffre-fort est-il solide et fiable ?", a: "Oui, il est fabriqué en acier épais, équipé d'un verrou numérique électronique et d'un verrou de secours à clés, il protège vos documents, votre argent et vos bijoux en toute sécurité." },
  { q: "Comment ça fonctionne ?", a: "Facile à utiliser : créez le code numérique que vous souhaitez (de 3 à 8 chiffres), et si vous oubliez le code, des clés de secours sont incluses. Fonctionne avec des piles AAA." },
  { q: "Quelle est la taille du coffre-fort ?", a: "Le coffre-fort mesure 23×17×17 cm — adapté aux documents, à l'argent et aux bijoux, facile à ranger dans une armoire ou à fixer au mur." },
  { q: "Livraison", a: "Nous livrons gratuitement dans toutes les villes du Maroc, paiement à la livraison — vous n'avez rien à payer avant de recevoir le produit." },
]

export default function CoffrtFrPage() {
  const [formPassed, setFormPassed] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set(FAQ.map((_, i) => i)))
  const formRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const check = () => {
      if (!formRef.current) return
      const rect = formRef.current.getBoundingClientRect()
      setFormPassed(rect.bottom < 0 || rect.top > window.innerHeight)
    }
    window.addEventListener("scroll", check, { passive: true })
    check()
    return () => window.removeEventListener("scroll", check)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { video.src = "/products/coffre-fort/explainer-2.mp4"; video.play(); observer.disconnect() } },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen text-gray-900" dir="ltr" style={{ backgroundColor: "#fff", fontFamily: "var(--font-cairo), Cairo, sans-serif" }}>
      <style>{`
        @keyframes btnPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,210,0,0.5);} 50%{transform:scale(1.03);box-shadow:0 0 0 14px rgba(255,210,0,0);} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        .shaked { animation: shake 2s ease infinite; }
      `}</style>

      {/* ══ PRODUCT GALLERY ══ */}
      <div style={{ backgroundColor: "#fff", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ position: "relative", backgroundColor: "#f5f5f5", lineHeight: 0 }}>
          <Image
            src={IMAGES[activeImg]}
            alt="Coffre-fort électronique domestique"
            width={520}
            height={380}
            priority={activeImg === 0}
            style={{ width: "100%", height: 380, objectFit: "cover", display: "block", cursor: "pointer" }}
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
          <span style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>
            {activeImg + 1} / {IMAGES.length}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", backgroundColor: "#fff", overflowX: "auto" }}>
          {IMAGES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" onClick={() => setActiveImg(i)}
              style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0, cursor: "pointer",
                border: activeImg === i ? "2.5px solid #1E3A8A" : "2px solid #e5e7eb" }}
            />
          ))}
        </div>
      </div>
{/* ══ HEADING ══ */}
      <div className="px-4 pt-4 pb-2 max-w-lg mx-auto text-left" dir="ltr">
        <span className="bg-red-100 text-red-800 text-xs font-black px-2.5 py-1 rounded-full inline-block mb-2 animate-pulse">
          🚨 Offre spéciale 2026
        </span>

        <h1 className="font-black text-2xl text-gray-900 mb-3 leading-tight">
          Coffre-fort intelligent en acier Beetro <span className="text-amber-600">(Édition Premium)</span>
        </h1>
        <p className="font-bold text-base text-gray-800 flex items-start gap-2">
          <span>🔒</span>
          <span> <b>Restez tranquille</b> : protection totale pour l&apos;or, l&apos;argent liquide et les documents officiels contre le vol et l&apos;intrusion.</span>
        </p>
        <div className="flex items-center gap-3 mb-2 justify-start">
          <span className="font-black text-3xl text-gray-900">{PRICE_1} DH</span>
          <span className="text-gray-400 line-through text-sm font-bold">{Math.round(PRICE_1 * 1.5)} DH</span>
        </div>
      </div>

      {/* ══ EXPLAINER VIDEO ══ */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{ width: "100%", borderRadius: 16, display: "block" }}
        />
      </div>

      {/* ══ DESCRIPTION ══ */}
      <div className="px-4 pt-2 pb-2 max-w-lg mx-auto text-left" dir="ltr">
        <div className="space-y-2.5 mb-3">

          <p className="font-bold text-base text-gray-800 flex items-start gap-2">
            <span>🛠️</span>
            <span>Équipé d&apos;un système de fixation murale ultra-robuste (impossible à déplacer ou à forcer).</span>
          </p>
          <p className="font-bold text-base text-gray-800 flex items-start gap-2">
            <span>🧱</span>
            <span>Fabriqué en ABS haute qualité.</span>
          </p>
        </div>

        <p className="text-red-600 font-black text-xs animate-bounce mb-3">⏳ Stock très limité — l&apos;offre se termine dès épuisement du stock</p>
      </div>

      <div className="h-px mx-4 bg-gray-100 my-4" />

      {/* ══ FORM ══ */}
      <section ref={formRef} className="px-4 py-2 mb-16 max-w-lg mx-auto" id="order-form">
        <OrderForm
          sku={PRODUCT_SKU}
          pack="coffrt"
          options={[
            {
              q: 1,
              label: "Coffre-fort intelligent en acier Beetro",
              price: PRICE_1,
              oldPrice: Math.round(PRICE_1 * 1.5),
              sku: "19HOPA"
            },
            {
              q: 2,
              label: "2 coffres-forts — pour le bureau et la maison, double protection",
              price: PRICE_2,
              oldPrice: PRICE_1 * 2,
              badge: `Économisez ${PRICE_1 * 2 - PRICE_2} DH`,
              sku: "19HOPA"
            },
          ]}
        />


        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 my-3 space-y-1">
          <p className="text-emerald-700 font-black text-sm flex items-center gap-1.5">
            ✅ Livraison gratuite dans toutes les villes du Maroc + droit de vérifier la qualité du coffre-fort avant de payer
          </p>
        </div>

        <div className="bg-gray-900 text-white p-4 rounded-xl text-center shadow-lg mt-6">
          <h2 className="font-black text-xl mb-1 text-amber-500">🛡️ La garantie or — satisfaction client</h2>
          <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto leading-relaxed">
            La qualité Beetro n&apos;a pas besoin d&apos;être présentée. Nous offrons une véritable garantie d&apos;un mois complet contre tout défaut électronique ou mécanique, avec remplacement immédiat et gratuit jusqu&apos;à votre porte.
          </p>
        </div>
      </section>

      <div className="h-4" />

      {/* ══ LP IMAGE (details) ══ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/products/coffre-fort/lp-3.webp" alt="Coffre-fort électronique domestique de luxe"
        className="w-full h-auto block rounded-b-xl shadow-sm transition-transform duration-300 hover:scale-[1.01]" loading="lazy" decoding="async" style={{ cursor: "pointer" }}
        onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      {/* ══ CTA 1 ══ */}
      <div className="px-4 max-w-lg mx-auto py-6">
        <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="w-full text-black font-black text-lg py-5 rounded-2xl active:scale-95 shaked"
          style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.4)" }}>
          🛒 Commander maintenant — Paiement à la livraison
        </button>
      </div>

      {/* ══ REVIEWS ══ */}
      <div className="px-1 max-w-lg mx-auto">
        <h2 className="font-black text-xl text-center text-gray-900 mb-4">Nos clients sont satisfaits</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/coffre-fort/reviews.webp" alt="Avis clients"
          className="w-full h-auto rounded-xl" loading="lazy" width={720} height={2950}
        />
      </div>

      {/* ══ CTA 2 ══ */}
      <div className="px-4 max-w-lg mx-auto py-6">
        <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="w-full text-black font-black text-lg py-5 rounded-2xl active:scale-95 shaked"
          style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.4)" }}>
          🛒 Commander maintenant — Paiement à la livraison
        </button>
      </div>

      {/* ══ FAQ ══ */}
      <div className="px-4 max-w-lg mx-auto py-4">
        <h2 className="font-black text-2xl text-center text-gray-900 mb-5">Questions fréquentes</h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
              <button className="w-full flex items-center justify-between px-4 py-4 text-left font-black text-gray-900 bg-white"
                onClick={() => setOpenFaq(prev => { const s = new Set(prev); if (s.has(i)) { s.delete(i) } else { s.add(i) } return s })}>
                <span>{item.q}</span>
                <svg className="w-4 h-4 shrink-0 transition-transform mr-2" style={{ transform: openFaq.has(i) ? "rotate(180deg)" : "none" }}
                  viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              {openFaq.has(i) && (
                <div className="p-4 text-gray-600 text-[16px] text-left leading-relaxed bg-white border-t border-gray-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />

      {/* ══ TRUST BADGES ══ */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <h2 className="text-gray-900 font-black text-2xl text-center mb-5">Garanties et retours</h2>
        <div className="flex flex-col gap-3">
          {[
            { img: "/icons/waraico.webp", title: "Garantie produit", sub: "Garantie de 30 jours — si non satisfait, nous vous remboursons" },
            { img: "/icons/codincon.webp", title: "Payez après essai", sub: "Vous ne payez rien avant de recevoir et vérifier le produit" },
            { img: "/icons/cussup.webp", title: "Service après-vente", sub: "Notre équipe est à votre disposition toute la semaine" },
            { img: "/icons/shipico.webp", title: "Livraison rapide et fiable", sub: "Nous livrons dans toutes les villes en 24h à 48h" },
          ].map((item, i) => (
            <div key={i} className="px-5 py-6 bg-white rounded-2xl text-center" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.title} className="h-16 w-auto mx-auto mb-3 object-contain" />
              <p className="text-gray-900 font-black text-base mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />

      {/* ══ FOOTER ══ */}
      <footer className="px-5 py-8 mb-20 text-center" style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="inline-flex items-center gap-2 font-black text-sm px-4 py-2 rounded-full mb-4" style={{ background: "#fdf8ee", border: `1px solid ${GOLD}`, color: "#92712a" }}>
          🚚 Livraison gratuite dans toutes les villes du Maroc
        </div>
        <p className="text-gray-400 text-xs">© 2025 Storecoma — Tous droits réservés</p>
        <div className="mx-auto mt-4 w-max">
          <Image src="/storecoma-logo.webp" alt="storecoma" width={90} height={90} className="object-contain" loading="lazy" />
        </div>
      </footer>

      {/* ══ STICKY BUTTON ══ */}
      {formPassed && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="w-full text-black font-black text-base py-4 rounded-2xl active:scale-95 shaked"
            style={{ background: "#ffd200", boxShadow: "0 4px 24px rgba(255,210,0,0.5)" }}>
            🔥 Commander maintenant — Paiement à la livraison
          </button>
        </div>
      )}
    </div>
  )
}
