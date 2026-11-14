# Mantelek Power Rentals — landing

Landing de una sola página para Mantelek Power Rentals (renta y venta de plantas de luz en Monterrey).

**Stack:** Next.js 16 (App Router), React 19, GSAP + Lenis para animaciones, Tailwind v4 (solo el reset base; los estilos son CSS por sección en `src/styles/`).

## Estructura

| Ruta | Qué hay |
| --- | --- |
| `src/content/home.ts` | Todos los textos, enlaces e imágenes de la página. Para cambiar contenido, edita aquí. |
| `src/components/sections/` | Secciones: `Capacities` (hero), `About`, `Enduro` (soluciones y sectores), `Preorder` (contacto), `Footer`. |
| `src/styles/` | CSS de cada sección. |
| `public/media/mantelek/` | Fotos y recortes de equipos. |
| `src/app/opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx` | Imagen para compartir en redes y favicon (se generan en el build). |
| `src/app/robots.ts`, `sitemap.ts` | `robots.txt` y `sitemap.xml`. |

## Desarrollo

```bash
npm install
npm run dev
```

> **Mac Intel con macOS que bloquea binarios nativos:** si `npm run dev` falla con
> "library load disallowed by system policy" o "Turbopack is not supported on this
> platform", usa Webpack: `npx next dev --webpack -p 3001`.

Comprobaciones antes de publicar:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Publicar en Vercel

1. Sube el proyecto a un repositorio de GitHub (o GitLab / Bitbucket).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio. Vercel detecta Next.js solo:
   - Framework: **Next.js**
   - Build command: `next build` (el de `package.json`)
   - Output: automático
   - Node.js: 20 o superior (el valor por defecto de Vercel sirve)
3. Variables de entorno: ninguna es obligatoria. Cuando conectes un dominio propio,
   agrega `NEXT_PUBLIC_SITE_URL` (ver `.env.example`) para que los metadatos y el
   sitemap usen ese dominio.
4. Deploy. Cada push a `main` publica a producción y cada rama/PR genera una vista previa.

Si el build de Vercel fallara en el paso de CSS (Turbopack + Tailwind), cambia el
*Build Command* del proyecto a `next build --webpack`: es el build que se verificó en local.

## Pendientes de contenido

- Confirmar el rango de capacidad (20–3,500 kVA), qué equipo corresponde a cada
  pestaña y "Soporte técnico 24/7".
- Recortes en alta resolución de los equipos de 500–1,500 y 1,500–3,000 kVA
  (los actuales miden 480 px de ancho).
- Varios enlaces del footer llevan a páginas de mantelek.mx (`SITE_MAIN` en
  `src/content/home.ts`). Si esta landing reemplaza a mantelek.mx, hay que
  actualizarlos.
