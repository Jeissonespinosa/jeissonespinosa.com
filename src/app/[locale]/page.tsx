import { notFound } from "next/navigation";
import { getSite } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);

  return (
    <>
      <Nav site={site} />
      <main>
        <Hero site={site} />
        <Services site={site} />
        <About site={site} />
        <Work site={site} />
        <Experience site={site} />
        <Testimonials site={site} />
      </main>
      <Contact site={site} />
    </>
  );
}
