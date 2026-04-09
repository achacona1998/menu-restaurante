# Menú Restaurante (QR) — UI Premium

Aplicación web de menú digital para restaurantes (ideal para QR en mesa), con experiencia visual premium: secciones, destacados, buscador, filtros, modal de detalle, carrito persistente y microinteracciones.

## Características

- Menú por secciones con navegación sticky.
- Destacados en carrusel (items con `isFeatured: true`).
- Búsqueda por nombre, descripción, ingredientes y etiquetas.
- Filtros por tags (chips).
- Modal de producto con selector de cantidad y accesibilidad mejorada (Escape + focus trap).
- Carrito persistente (localStorage), con barra inferior fija de “Ver pedido”.
- Toast “Añadido al pedido” con acción “Deshacer”.
- Precios formateados con `Intl.NumberFormat` (locale configurable).

## Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Lucide React (iconos)
- Vitest + Testing Library (tests)
- ESLint (flat config)

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Instalación

```bash
npm install
```

## Scripts

```bash
# Desarrollo (HMR)
npm run dev

# Lint
npm run lint

# Tests
npm run test

# Build de producción
npm run build

# Previsualizar build localmente
npm run preview
```

## Configuración del menú (branding y contenido)

Edita el archivo [menuData.ts](file:///d:/Proyectos%20Portafolio/3-%20Idea/Menu/menu-restaurante/src/data/menuData.ts).

Campos principales:

- `restaurantName`: nombre del restaurante.
- `currency`: moneda (por ejemplo `"EUR"`).
- `locale`: locale para formateo (por ejemplo `"es-ES"`).
- `sections`: secciones del menú con `items`.
- `items[].isFeatured`: si es `true`, aparece en “Destacados”.
- `items[].tags`: se usan para chips de filtro.

## Mesa por URL (QR)

Puedes indicar el número de mesa por query string:

- `?mesa=12`
- `?table=12`

Ejemplo:

```
http://localhost:5173/?mesa=12
```

## Logo / Favicon (reemplazo del logo de Vite)

El favicon se reemplazó por un icono estilo “navbar” (utensilios en dorado).

- Archivo: [public/favicon.svg](file:///d:/Proyectos%20Portafolio/3-%20Idea/Menu/menu-restaurante/public/favicon.svg)
- Referencia en HTML: [index.html](file:///d:/Proyectos%20Portafolio/3-%20Idea/Menu/menu-restaurante/index.html)

Si quieres usar un logo real del restaurante, reemplaza `public/favicon.svg` por tu SVG.

## Deploy (producción)

Esta app es estática: el build genera `dist/`.

1. Construir:
   ```bash
   npm run build
   ```
2. Publicar la carpeta `dist/` en tu hosting.

Netlify / Vercel:

- Build command: `npm run build`
- Publish directory: `dist`

## Notas

- El carrito se guarda en `localStorage` del navegador.
- El botón “Confirmar pedido” actualmente es UI; para enviar el pedido (WhatsApp/API/caja) hay que definir el flujo de checkout.

