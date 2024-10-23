import { NextResponse, NextRequest } from "next/server";

let locales = ['en', 'fr'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  // Extract the "Accept-Language" header
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // Parse the "Accept-Language" header and split it by commas
    const preferredLanguages = acceptLanguage.split(',').map(lang => lang.trim().split(';')[0]);

    // Find the first locale that matches the supported locales
    for (const lang of preferredLanguages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }
  
  return 'en';
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
