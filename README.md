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
| `src/app/opengraph-image.png`, `icon.png`, `apple-icon.png` | Imagen para compartir en redes, favicon e ícono de iPhone. |
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
npm run cpanel   # build estático + mantelek-cpanel.zip listo para subir
```

## Publicar en cPanel

El sitio se exporta como archivos estáticos (`output: "export"` en `next.config.ts`):
Apache los sirve directamente, sin Node.js en el servidor.

1. `npm run cpanel` compila el sitio en `out/` y genera `mantelek-cpanel.zip` en la raíz del proyecto.
2. En cPanel → **Administrador de archivos** → `public_html` (o la carpeta raíz del dominio).
   Activa **Configuración → Mostrar archivos ocultos** para ver el `.htaccess`.
3. Respalda y borra los archivos del sitio anterior, **Cargar** el zip y luego clic derecho → **Extraer**.
   `index.html`, `.htaccess`, `_next/` y `media/` deben quedar directamente dentro de `public_html`.
4. Borra el zip del servidor.

El sitio está pensado para la raíz del dominio (las rutas empiezan con `/`); no funciona dentro de una subcarpeta.
El `.htaccess` (en `public/`) fuerza HTTPS, quita el `www`, comprime, configura la caché y usa `404.html`.
Para que la redirección a HTTPS funcione, el dominio necesita certificado SSL (cPanel → **SSL/TLS Status** → AutoSSL).

**Dominio:** los metadatos, `sitemap.xml` y `robots.txt` usan `https://mantelek.mx`. Para compilar
para otro dominio (por ejemplo, un subdominio de prueba):

```bash
NEXT_PUBLIC_SITE_URL=https://prueba.mantelek.mx npm run cpanel
```

**Imágenes:** en modo estático se sirven tal cual (sin el optimizador de Next), así que conviene
subirlas ya optimizadas: WebP/JPG de ~1600 px de lado mayor y < 400 KB.

**Ver el resultado en local:** después de `npm run cpanel`,
`python3 -m http.server 3002 --directory out` y abre http://localhost:3002.

> El comando usa `next build --webpack` porque en algunas Mac macOS bloquea los binarios
> nativos de Turbopack. El resultado es el mismo sitio estático.

## Pendientes de contenido

- Confirmar el rango de capacidad (20–3,500 kVA), qué equipo corresponde a cada
  pestaña y "Soporte técnico 24/7".
- Recortes en alta resolución de los equipos de 500–1,500 y 1,500–3,000 kVA
  (los actuales miden 480 px de ancho).
- Varios enlaces del footer llevan a páginas de mantelek.mx (`SITE_MAIN` en
  `src/content/home.ts`). Si esta landing reemplaza a mantelek.mx, hay que
  actualizarlos.
