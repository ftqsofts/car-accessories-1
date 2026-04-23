import { NextRequest, NextResponse } from "next/server"

const MOBILE_RE = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|Mobile/i
const TABLET_RE = /iPad|Android(?!.*Mobile)|Tablet/i

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? ""
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/products")) {
    return NextResponse.next()
  }

  if (!MOBILE_RE.test(ua) && !TABLET_RE.test(ua)) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.mp4|.*\\.svg).*)"],
}
