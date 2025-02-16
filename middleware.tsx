import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

/**
 * NextJSのmiddleware設定
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
  const session = await auth()
  const pathname = request.nextUrl.pathname
  const isAuthPage = pathname === "/signin" || pathname === "/signup"
  const isProtectedPage =
    !pathname.startsWith("/") &&
    !pathname.startsWith("/about") &&
    !pathname.startsWith("/signin") &&
    !pathname.startsWith("/signup")

  // if (!session && !isAuthPage) {
  if (!session && isProtectedPage) {
    // 未認証時のリダイレクト先
    return NextResponse.redirect(new URL("/signin", request.url))
  }
  if (session && isAuthPage) {
    // 認証済みで認証ページにアクセスした場合のリダイレクト先（認証後のリダイレクト先）
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  if (!session && !isAuthPage && !pathname.startsWith("/api")) {
    // 未認証かつ認証ページ以外の場合のリダイレクト
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

// 本middlewareを適用するURL
export const config = {
  matcher: ["/dashboard/:path*", "/signup", "/signin"],
}
