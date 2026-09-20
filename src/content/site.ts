/**
 * ÚNICO archivo que hay que editar para cambiar el contenido del sitio.
 *
 * - `common`: datos que no cambian con el idioma (nombre, email, redes, proyectos base).
 * - `es` / `en`: textos por idioma. Ambos deben cumplir la interfaz `Content`
 *   para que TypeScript avise si falta algo en alguno de los dos.
 */
import type { Locale } from "@/lib/i18n";

export const common = {
  firstName: "Jeisson",
  lastName: "Espinosa",
  name: "Jeisson Espinosa",
  email: "jeissonespinosar@gmail.com",
  url: "https://jeissonespinosa.com",
  country: "Colombia",
  timezone: "America/Bogota",
  timezoneLabel: "GMT-5",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jeissonespinosaproduct/" },
    { label: "GitHub", href: "https://github.com/Jeissonespinosa" },
  ],
} as const;

type Project = {
  title: string;
  category: string;
  description: string;
  href: string;
  domain: string;
  image: string;
};

type Service = {
  number: string;
  kicker: string;
  title: string;
  description: string;
  tags: string[];
};

type SectionHeading = {
  label: string;
  title: [string, string];
  aside?: string;
};

export interface Content {
  role: string;
  intro: string;
  availability: string;
  nav: { label: string; href: string }[];
  ui: {
    scroll: string;
    view: string;
    backToTop: string;
    openMenu: string;
    closeMenu: string;
    goHome: string;
    switchLang: string; // etiqueta del botón que cambia al OTRO idioma
    stars: string;
  };
  stats: string[];
  sections: {
    services: SectionHeading;
    work: SectionHeading;
    experience: SectionHeading;
    testimonials: SectionHeading;
  };
  services: Service[];
  about: {
    label: string;
    title: [string, string];
    statement: string;
    closing: string;
    rating: string;
    trusted: string;
  };
  projects: Project[];
  experience: { role: string; company: string; period: string }[];
  testimonials: { quote: string; author: string; role: string }[];
  contact: {
    label: string;
    title: [string, string];
    subtitle: string;
    copyEmail: string;
    copied: string;
    linkedin: string;
  };
}

/* ------------------------------------------------------------------ */
/* Proyectos: datos comunes (imagen, enlace). Los textos van por idioma */
/* ------------------------------------------------------------------ */
const projectBase = {
  spanishStory: {
    href: "https://thespanishstorychannel.com/",
    domain: "thespanishstorychannel.com",
    image: "/projects/thespanishstorychannel.jpg",
  },
  tropicert: {
    href: "https://tropicert-web.vercel.app/",
    domain: "tropicert-web.vercel.app",
    image: "/projects/tropicert.jpg",
  },
  cdaSumapaz: {
    href: "https://cda-sumapaz.vercel.app/",
    domain: "cda-sumapaz.vercel.app",
    image: "/projects/cda-sumapaz.jpg",
  },
  lawwork: {
    href: "https://lawwork.co/",
    domain: "lawwork.co",
    image: "/projects/lawwork.jpg",
  },
  grandRiver: {
    href: "https://grandriverclothing.com/",
    domain: "grandriverclothing.com",
    image: "/projects/grandriver.jpg",
  },
  passGallery: {
    href: "https://passgallery.com/",
    domain: "passgallery.com",
    image: "/projects/passgallery.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* ESPAÑOL                                                             */
/* ------------------------------------------------------------------ */
const es: Content = {
  role: "Diseñador de producto & Desarrollador web",
  intro:
    "Diseño y construyo sitios web, productos digitales y automatizaciones con IA para negocios que quieren crecer.",
  availability: "Disponible para nuevos proyectos",
  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Contacto", href: "#contacto" },
  ],
  ui: {
    scroll: "Desplázate",
    view: "Ver",
    backToTop: "Volver arriba",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    goHome: "Ir al inicio",
    switchLang: "EN",
    stars: "5 estrellas",
  },
  stats: [
    "5+ años de experiencia",
    "40+ proyectos entregados",
    "20+ clientes satisfechos",
    "100% enfoque en resultados",
    "Next.js · Webflow · Shopify",
    "Automatización con IA",
  ],
  sections: {
    services: {
      label: "Servicios",
      title: ["Lo que", "hago"],
      aside:
        "Diseño, desarrollo y automatizo productos digitales que ayudan a los negocios a vender más y operar mejor.",
    },
    work: {
      label: "Proyectos",
      title: ["Trabajo", "seleccionado"],
      aside:
        "Una selección de sitios y productos en producción, construidos para marcas de Colombia y Estados Unidos.",
    },
    experience: {
      label: "Trayectoria",
      title: ["Mi", "experiencia"],
      aside: "Los equipos y proyectos donde he dejado huella a lo largo de los años.",
    },
    testimonials: {
      label: "Testimonios",
      title: ["Lo que dicen", "mis clientes"],
    },
  },
  services: [
    {
      number: "01",
      kicker: "Presencia digital",
      title: "Diseño y desarrollo web",
      description:
        "Sitios rápidos, con animaciones cuidadas y optimizados para SEO y conversión. Diseñados para representar tu marca y convertir visitas en clientes.",
      tags: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Vercel"],
    },
    {
      number: "02",
      kicker: "Del concepto al mercado",
      title: "Diseño de producto",
      description:
        "Llevo ideas de concepto a producto: alcance, flujos, wireframes y prototipos alineados con lo que los usuarios realmente necesitan.",
      tags: ["Figma", "UX/UI", "MVP", "Prototipado", "Design systems"],
    },
    {
      number: "03",
      kicker: "Ventas en línea",
      title: "E-commerce",
      description:
        "Tiendas en línea que venden: catálogo, checkout, integraciones de pago y envío, y optimización continua de la conversión.",
      tags: ["Shopify", "Webflow", "Pasarelas de pago", "Analítica"],
    },
    {
      number: "04",
      kicker: "Alto impacto",
      title: "IA y automatización",
      description:
        "Agentes y flujos automatizados que atienden clientes, califican leads y eliminan trabajo manual repetitivo dentro de tu operación.",
      tags: ["Claude", "OpenAI", "n8n", "Make", "APIs"],
    },
    {
      number: "05",
      kicker: "Ventas y marketing",
      title: "CRM y embudos",
      description:
        "Implemento CRMs y embudos automatizados que nutren, segmentan y convierten. Cada paso se mide y se optimiza.",
      tags: ["HubSpot", "GoHighLevel", "Email marketing", "SEO"],
    },
    {
      number: "06",
      kicker: "Acompañamiento",
      title: "Consultoría",
      description:
        "Diagnóstico, hoja de ruta y acompañamiento para equipos que quieren adoptar tecnología e IA con criterio.",
      tags: ["Estrategia digital", "Auditorías", "Workshops"],
    },
  ],
  about: {
    label: "Sobre mí",
    title: ["Tecnología", "con criterio"],
    statement:
      "Diseñador. Desarrollador. Constructor. Resuelvo problemas de negocio con diseño, código e inteligencia artificial. Combino visión de producto con ejecución técnica para que cada cosa que construyo genere resultados medibles desde la primera semana.",
    closing: "Menos ruido, más resultados.",
    rating: "4.9",
    trusted: "Clientes confían en mi trabajo",
  },
  projects: [
    {
      ...projectBase.spanishStory,
      title: "The Spanish Story Channel",
      category: "Sitio web · Next.js",
      description:
        "Plataforma para aprender español con historias cortas nivel A1: videos, guías de estudio descargables y un juego interactivo.",
    },
    {
      ...projectBase.tropicert,
      title: "TropiCert",
      category: "Plataforma · Next.js",
      description:
        "Organismo de certificación agropecuaria. Sitio corporativo con portal de operadores, documentos y solicitud de certificación en línea.",
    },
    {
      ...projectBase.cdaSumapaz,
      title: "CDA del Sumapaz",
      category: "Sitio web · Next.js",
      description:
        "Centro de diagnóstico automotor en Fusagasugá. Agenda de turnos en línea, contacto por WhatsApp y blog optimizado para búsquedas locales.",
    },
    {
      ...projectBase.lawwork,
      title: "LawWork",
      category: "Sitio web · Webflow",
      description:
        "Firma de abogados especialistas en derecho corporativo. Sitio editorial con blog y catálogo de servicios legales.",
    },
    {
      ...projectBase.grandRiver,
      title: "Grand River Clothing",
      category: "E-commerce · Shopify",
      description:
        "Tienda en línea de jeans para hombre y mujer en Estados Unidos, con colecciones, reseñas y programa de descuentos.",
    },
    {
      ...projectBase.passGallery,
      title: "Pass Gallery",
      category: "Sitio web · Webflow",
      description:
        "Sitio de marketing para una plataforma de galerías y venta de impresiones para fotógrafos profesionales.",
    },
  ],
  experience: [
    { role: "Diseñador de producto & Desarrollador web", company: "Freelance", period: "2022 – Actualidad" },
    { role: "Desarrollador web", company: "Freelance", period: "2020 – 2022" },
    { role: "Marketing digital", company: "Agencia local", period: "2019 – 2020" },
  ],
  testimonials: [
    {
      quote:
        "Jeisson entendió el negocio en la primera llamada. El sitio quedó rápido, claro y empezó a traer clientes desde el primer mes.",
      author: "María González",
      role: "CEO, empresa de servicios",
    },
    {
      quote:
        "Automatizó procesos que llevábamos años haciendo a mano. Ahora el equipo se dedica a vender, no a copiar datos.",
      author: "Carlos Restrepo",
      role: "Director de Operaciones",
    },
    {
      quote: "Rápido, claro y con criterio. Nos ayudó a lanzar el producto en semanas, no meses.",
      author: "Laura Méndez",
      role: "Cofundadora, startup",
    },
    {
      quote: "La tienda quedó funcionando perfecto y las ventas subieron. Muy recomendado.",
      author: "Andrés Pérez",
      role: "Gerente Comercial",
    },
  ],
  contact: {
    label: "Contacto",
    title: ["Hablemos", "de tu proyecto"],
    subtitle:
      "¿Tienes una idea, un sitio que necesita mejorar o un proceso que quieres automatizar? Escríbeme y lo revisamos juntos.",
    copyEmail: "Copiar email",
    copied: "¡Copiado!",
    linkedin: "Escribir por LinkedIn",
  },
};

/* ------------------------------------------------------------------ */
/* ENGLISH                                                             */
/* ------------------------------------------------------------------ */
const en: Content = {
  role: "Product Designer & Web Developer",
  intro:
    "I design and build websites, digital products and AI automations for businesses that want to grow.",
  availability: "Available for new projects",
  nav: [
    { label: "Services", href: "#servicios" },
    { label: "About", href: "#sobre-mi" },
    { label: "Work", href: "#proyectos" },
    { label: "Experience", href: "#experiencia" },
    { label: "Contact", href: "#contacto" },
  ],
  ui: {
    scroll: "Scroll",
    view: "View",
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    goHome: "Go to top",
    switchLang: "ES",
    stars: "5 stars",
  },
  stats: [
    "5+ years of experience",
    "40+ projects delivered",
    "20+ happy clients",
    "100% focused on results",
    "Next.js · Webflow · Shopify",
    "AI automation",
  ],
  sections: {
    services: {
      label: "Services",
      title: ["What I", "do"],
      aside:
        "I design, build and automate digital products that help businesses sell more and run smoother.",
    },
    work: {
      label: "Work",
      title: ["Selected", "projects"],
      aside:
        "A selection of live sites and products built for brands in Colombia and the United States.",
    },
    experience: {
      label: "Career",
      title: ["My", "experience"],
      aside: "The teams and projects where I've made an impact over the years.",
    },
    testimonials: {
      label: "Testimonials",
      title: ["What clients", "say"],
    },
  },
  services: [
    {
      number: "01",
      kicker: "Digital presence",
      title: "Web design & development",
      description:
        "Fast websites with polished animations, optimized for SEO and conversion. Built to represent your brand and turn visitors into clients.",
      tags: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Vercel"],
    },
    {
      number: "02",
      kicker: "From concept to market",
      title: "Product design",
      description:
        "I take ideas from concept to product: scope, flows, wireframes and prototypes aligned with what users actually need.",
      tags: ["Figma", "UX/UI", "MVP", "Prototyping", "Design systems"],
    },
    {
      number: "03",
      kicker: "Online sales",
      title: "E-commerce",
      description:
        "Online stores that sell: catalog, checkout, payment and shipping integrations, and continuous conversion optimization.",
      tags: ["Shopify", "Webflow", "Payment gateways", "Analytics"],
    },
    {
      number: "04",
      kicker: "High impact",
      title: "AI & automation",
      description:
        "Agents and automated workflows that serve customers, qualify leads and remove repetitive manual work from your operation.",
      tags: ["Claude", "OpenAI", "n8n", "Make", "APIs"],
    },
    {
      number: "05",
      kicker: "Sales & marketing",
      title: "CRM & funnels",
      description:
        "I implement CRMs and automated funnels that nurture, segment and convert. Every step is measured and optimized.",
      tags: ["HubSpot", "GoHighLevel", "Email marketing", "SEO"],
    },
    {
      number: "06",
      kicker: "Guidance",
      title: "Consulting",
      description:
        "Assessment, roadmap and hands-on support for teams that want to adopt technology and AI with good judgment.",
      tags: ["Digital strategy", "Audits", "Workshops"],
    },
  ],
  about: {
    label: "About me",
    title: ["Technology", "with judgment"],
    statement:
      "Designer. Developer. Builder. I solve business problems with design, code and artificial intelligence. I combine product vision with technical execution so that everything I build delivers measurable results from week one.",
    closing: "Less noise, more results.",
    rating: "4.9",
    trusted: "Clients trust my work",
  },
  projects: [
    {
      ...projectBase.spanishStory,
      title: "The Spanish Story Channel",
      category: "Website · Next.js",
      description:
        "A platform to learn Spanish through short A1-level stories: videos, downloadable study guides and an interactive game.",
    },
    {
      ...projectBase.tropicert,
      title: "TropiCert",
      category: "Platform · Next.js",
      description:
        "Agricultural certification body. Corporate site with an operators portal, document center and online certification requests.",
    },
    {
      ...projectBase.cdaSumapaz,
      title: "CDA del Sumapaz",
      category: "Website · Next.js",
      description:
        "Vehicle inspection center in Fusagasugá. Online appointment booking, WhatsApp contact and a blog optimized for local search.",
    },
    {
      ...projectBase.lawwork,
      title: "LawWork",
      category: "Website · Webflow",
      description:
        "Corporate law firm. Editorial website with a blog and a catalog of legal services.",
    },
    {
      ...projectBase.grandRiver,
      title: "Grand River Clothing",
      category: "E-commerce · Shopify",
      description:
        "Online store for men's and women's jeans in the United States, with collections, reviews and a discount program.",
    },
    {
      ...projectBase.passGallery,
      title: "Pass Gallery",
      category: "Website · Webflow",
      description:
        "Marketing site for a gallery-sharing and print-sales platform built for professional photographers.",
    },
  ],
  experience: [
    { role: "Product Designer & Web Developer", company: "Freelance", period: "2022 – Present" },
    { role: "Web Developer", company: "Freelance", period: "2020 – 2022" },
    { role: "Digital Marketing", company: "Local agency", period: "2019 – 2020" },
  ],
  testimonials: [
    {
      quote:
        "Jeisson understood the business on the first call. The site is fast, clear, and started bringing in clients within the first month.",
      author: "María González",
      role: "CEO, services company",
    },
    {
      quote:
        "He automated processes we had been doing by hand for years. Now the team focuses on selling, not copying data.",
      author: "Carlos Restrepo",
      role: "Operations Director",
    },
    {
      quote: "Fast, clear and thoughtful. He helped us launch the product in weeks, not months.",
      author: "Laura Méndez",
      role: "Co-founder, startup",
    },
    {
      quote: "The store works perfectly and sales went up. Highly recommended.",
      author: "Andrés Pérez",
      role: "Sales Manager",
    },
  ],
  contact: {
    label: "Contact",
    title: ["Let's talk", "about your project"],
    subtitle:
      "Have an idea, a site that needs work, or a process you want to automate? Send me a message and let's look at it together.",
    copyEmail: "Copy email",
    copied: "Copied!",
    linkedin: "Message on LinkedIn",
  },
};

const content: Record<Locale, Content> = { es, en };

export function getSite(locale: Locale) {
  return { ...common, ...content[locale], locale };
}

export type Site = ReturnType<typeof getSite>;
