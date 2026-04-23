import { NextRequest, NextResponse } from "next/server"

const MOBILE_RE = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|Mobile/i

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? ""
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/products")) {
    return NextResponse.next()
  }

  if (!MOBILE_RE.test(ua)) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>متاح فقط على الهاتف</title><style>*{margin:0;box-sizing:border-box}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#111;font-family:sans-serif;padding:2rem}div{text-align:center;color:#fff}p:first-child{font-size:4rem;margin-bottom:1.5rem}p:nth-child(2){font-size:1.5rem;font-weight:900;margin-bottom:.75rem}p:last-child{color:#888;font-size:1rem}</style></head><body><div><p>📱</p><p>هذه الصفحة متاحة فقط على الهاتف</p><p>This page is mobile-only</p></div></body></html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.mp4|.*\\.svg).*)"],
}
