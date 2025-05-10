import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * NextJSのmiddleware設定
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("accessToken")?.value
  const isProtectedPage = config.matcher.some((route) => pathname.startsWith(route))

  if (isProtectedPage) {
    if (!token) {
      const signInUrl = new URL("/signin", request.url)
      signInUrl.searchParams.append("callbackUrl", pathname)

      return NextResponse.redirect(signInUrl)
    }
    try {
      //APIトークン(jwt)検証
      //todo
    } catch (e) {
      //トークンリフレッシュ
      //todo
    }
  }

  return NextResponse.next()
}

// 本middlewareを適用するURL
export const config = {
  matcher: ["/dashboard", "/signup", "/signin"],
}
