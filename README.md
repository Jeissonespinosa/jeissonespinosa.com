# jeissonespinosa.com

Portfolio de una sola página (home) en **español e inglés**, construido con **Next.js 16 + React 19 + Tailwind v4**, animaciones con **GSAP / ScrollTrigger** y scroll suave con **Lenis**. Referencia visual: [nikolaradeski.com](https://nikolaradeski.com/).

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build de producción
npm run lint    # lint
```

## Idiomas

- `/es` → español, `/en` → inglés.
- `/` redirige al idioma del navegador (español por defecto). La lógica está en `src/proxy.ts`.
- El botón **EN / ES** de la navegación cambia de idioma.

## Editar el contenido

Todo el texto, enlaces, servicios, proyectos, experiencia y testimonios están en **un solo archivo**:

```
src/content/site.ts
```

- `common`: datos que no dependen del idioma (nombre, email, redes, país, zona horaria).
- `es` y `en`: los textos de cada idioma. Los dos objetos cumplen la misma interfaz `Content`, así que TypeScript avisa si falta algo en uno de ellos.
- Las capturas de los proyectos están en `public/projects/`. Para cambiar una, reemplaza el archivo y ajusta la ruta `image` en `projectBase`.

## Estructura

```
src/app/[locale]/   layout raíz y página principal (una por idioma)
src/app/globals.css tokens de color y tipografía, utilidades de animación
src/components/     secciones: Nav, Hero, Services, About, Work, Experience, Testimonials, Contact
src/components/ui/  piezas reutilizables: Button (magnético), Clock, Magnetic, ScrollWords, SectionHeader
src/lib/            gsap.ts, lenis.ts, loaded.ts (preloader → animaciones), i18n.ts
src/proxy.ts        redirección de "/" al idioma del navegador
public/fonts/       General Sans y Clash Display (Fontshare) servidas localmente
public/projects/    capturas de los proyectos
```

## Animaciones incluidas

- Preloader con contador y revelado del nombre.
- Entrada del hero línea por línea, parallax del título y resplandor que sigue al mouse.
- Scroll suave (Lenis) sincronizado con ScrollTrigger.
- Revelado de elementos al entrar en pantalla (`data-reveal`).
- Texto que se ilumina palabra por palabra en "Sobre mí".
- Marquees infinitos (estadísticas y testimonios), pausan al pasar el mouse.
- Cursor personalizado con etiqueta "Ver" sobre los proyectos.
- Botones magnéticos con texto deslizante.
- Parallax en las tarjetas de proyectos.
- Navegación que se oculta al bajar y aparece al subir; menú móvil a pantalla completa.

Todo respeta `prefers-reduced-motion`.

## Deploy en Vercel

Vercel detecta Next.js automáticamente; no hay variables de entorno. Cuando el dominio esté listo, agrégalo en **Settings → Domains** del proyecto y confirma que `url` en `src/content/site.ts` coincide.
