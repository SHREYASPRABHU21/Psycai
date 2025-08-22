import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for auth routes and tools
  const pathname = request.nextUrl.pathname
  
  if (pathname.startsWith('/login') || 
      pathname.startsWith('/signup') || 
      pathname.startsWith('/tools') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next')) {
    return NextResponse.next()
  }
  
  // Add any other middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
