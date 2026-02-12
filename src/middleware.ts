import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for session token in cookies
  const sessionToken = request.cookies.get("next-auth.session-token")?.value || 
                       request.cookies.get("__Secure-next-auth.session-token")?.value
  const isLoggedIn = !!sessionToken

  const isApiAuthRoute = pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/services", "/contact", "/blog", "/projects"].some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  const isAuthRoute = pathname.startsWith("/auth")
  const isClientRoute = pathname.startsWith("/client")
  const isAdminRoute = pathname.startsWith("/admin")

  // Allow API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect logged in users away from auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/client/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Protect client routes
  if (isClientRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    return NextResponse.next()
  }

  // Protect admin routes - Note: role check happens in page components
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)","/api/auth/:path*"],
}
