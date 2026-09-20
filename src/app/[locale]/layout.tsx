import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { getSite } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollReveal from "@/components/ScrollReveal";

const generalSans = localFont({
  src: [
    { path: "../../../public/fonts/GeneralSans-400.woff2", weight: "400" },
    { path: "../../../public/fonts/GeneralSans-500.woff2", weight: "500" },
    { path: "../../../public/fonts/GeneralSans-600.woff2", weight: "600" },
    { path: "../../../public/fonts/GeneralSans-700.woff2", weight: "700" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    { path: "../../../public/fonts/ClashDisplay-500.woff2", weight: "500" },
    { path: "../../../public/fonts/ClashDisplay-600.woff2", weight: "600" },
    { path: "../../../public/fonts/ClashDisplay-700.woff2", weight: "700" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

type Params = Promise<{ locale: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  const title = `${site.name} — ${site.role}`;
  return {
    metadataBase: new URL(site.url),
    title,
    description: site.intro,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      title,
      description: site.intro,
      url: `/${locale}`,
      siteName: site.name,
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description: site.intro },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);

  return (
    <html
      lang={locale}
      className={`${generalSans.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader site={site} />
        <SmoothScroll />
        <ScrollReveal />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
