import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

/**
 * Redirige "/" (y cualquier ruta sin prefijo de idioma) a /es o /en
 * según el idioma preferido del navegador.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept
    .toLowerCase()
    .split(",")
    .map((part) => part.trim().slice(0, 2))
    .find((code) => (locales as readonly string[]).includes(code));

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred ?? defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye assets estáticos y archivos con extensión
  matcher: ["/((?!_next|api|fonts|projects|favicon.ico|.*\\..*).*)"],
};
