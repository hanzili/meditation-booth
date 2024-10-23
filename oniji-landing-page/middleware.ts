import { NextResponse, NextRequest } from "next/server";

let locales = ['en', 'fr']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
    const headers = new Headers(request.headers)
    const acceptLanguage = headers.get('accept-language')
    
    if (acceptLanguage) {
        acceptLanguage.split(',').forEach(language => {
            locales.forEach(locale => {
                if (language.includes(locale)) {
                    return locale
                }
            })
        })
    }
    return 'en'
}
 
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|images|music|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}