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
  const isAuthPage = request.nextUrl.pathname.startsWith("/signup")

  if (!session && !isAuthPage) {
    // 未認証時のリダイレクト先
    return NextResponse.redirect(new URL("/signup", request.url))
  }
  if (session && isAuthPage) {
    // 認証済みで認証ページにアクセスした場合のリダイレクト先（認証後のリダイレクト先）
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// 本middlewareを適用するURL
export const config = {
  matcher: ["/dashboard/:path*", "/about/:path*", "/signup"],
}
