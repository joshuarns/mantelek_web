/**
 * Contenido del home.
 *
 * Textos y datos tomados de mantelek.mx. Todo el contenido y las rutas de medios
 * viven aquí para poder cambiarlos sin tocar los componentes. Cualquier `src`
 * vacío se renderiza como placeholder, así que el layout y las animaciones
 * funcionan antes de tener los assets finales.
 *
 * Los assets van en /public/media/... y se referencian como "/media/archivo.webp".
 */

/**
 * Sitio actual de Mantelek. Las páginas que esta landing no tiene (venta, leasing,
 * sectores, aviso de privacidad…) enlazan ahí. Si esta landing pasa a vivir en
 * mantelek.mx, esos enlaces deben apuntar a las nuevas páginas.
 */
export const SITE_MAIN = "https://mantelek.mx";

/** Los enlaces absolutos (http…) se abren en una pestaña nueva. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);

export type MediaTone = "studio" | "forest" | "dirt" | "night" | "accent";

export interface MediaItem {
  src?: string;
  alt: string;
  /** Color del placeholder mientras no hay asset. */
  tone?: MediaTone;
  /** Texto visible sobre la imagen (p. ej. en la galería de sectores). */
  label?: string;
}

export const brand = {
  name: "MANTELEK",
  fullName: "Mantelek Power Rentals",
  /** Logo en azul (sobre fondos claros) y en blanco (sobre fondos oscuros). 730×193 px. */
  logo: { color: "/media/mantelek/firma-mantelek-5.png", white: "/media/mantelek/firma-mantelek-blanco.png", width: 730, height: 193 },
};

export const contact = {
  phone: { label: "81 8373 9111", href: "tel:+528183739111" },
  phoneAlt: { label: "81 1516 0291", href: "tel:+528115160291" },
  whatsapp: { label: "81 1978 3048", href: "https://wa.me/528119783048" },
  email: { label: "ventas@mantelek.mx", href: "mailto:ventas@mantelek.mx" },
  address: ["Rodrigo Gómez #1816", "Col. Nueva Morelos", "Monterrey, Nuevo León"],
};

export const nav = {
  home: { label: "Inicio", href: "#" },
  links: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Soluciones", href: "#soluciones" },
    { label: "Equipos", href: "#capacidades" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: { label: "Solicitar cotización", href: "#contacto" },
};

export const about = {
  title: "Más de 30 años generando energía.",
  text: "Somos una empresa 100% mexicana con más de 30 años de trayectoria, prestando servicios a nivel nacional. Forjando experiencia en el ramo eléctrico a través del suministro de generadores eléctricos.",
  cta: { label: "¿Quiénes somos?", href: `${SITE_MAIN}/quienes-somos/` },
  background: { src: "/media/mantelek/slider5.jpg", alt: "Zona industrial de noche", tone: "forest" } as MediaItem,
};

export const solutions = {
  built: {
    title: "Soluciones en plantas eléctricas.",
    text: "Ofrecemos las mejores soluciones en plantas eléctricas en función de las necesidades de cada proyecto. Un servicio integral para el suministro de energía eléctrica provisional, definitiva o de emergencia.",
    media: { src: "/media/mantelek/Onisvisa_Building.jpg", alt: "Planta eléctrica en obra de construcción", tone: "night" } as MediaItem,
  },
  racing: {
    title: "Nos adaptamos a su proyecto",
    text: "Renta de bancos de carga resistiva, tableros de transferencia y tanques estacionarios para diésel. Todo lo necesario para operar plantas de luz y generadores en sitio u obra.",
    media: { src: "/media/mantelek/construccion-mantelek-4.jpg", alt: "Generador diésel en obra", tone: "dirt" } as MediaItem,
    video: { src: "/media/mantelek/proyectos-especiales-mantelek-1.jpg", alt: "Planta de luz industrial de alta capacidad", tone: "studio" } as MediaItem,
  },
  sectorsTitle: "Sectores que atendemos",
  gallery: [
    { label: "Industrial", src: "/media/mantelek/industria-mantelek-1.jpg", alt: "Renta para industria", tone: "night" },
    { label: "Construcción", src: "/media/mantelek/construccion-mantelek-3.jpg", alt: "Renta para construcción", tone: "dirt" },
    { label: "Espectáculos", src: "/media/mantelek/espectaculos-mantelek-2.jpg", alt: "Renta para espectáculos", tone: "forest" },
    { label: "Telecomunicaciones", src: "/media/mantelek/telecomunicaciones-mantelek-2.jpg", alt: "Renta para telecomunicaciones", tone: "studio" },
    { label: "Comercial", src: "/media/mantelek/industria-mantelek-2.jpg", alt: "Renta para comercios", tone: "night" },
    { label: "Torres de iluminación", src: "/media/mantelek/torre-de-iluminacion-mantelek-1.jpg", alt: "Torre de iluminación", tone: "accent" },
  ] as MediaItem[],
  story: {
    title: "Venta y renta de plantas de luz, generadores y plantas de emergencia.",
    columns: [
      "Mantelek es una empresa líder en renta de plantas de luz, generadores eléctricos, plantas de emergencia, motogeneradores diésel móviles, grupos electrógenos y torres de iluminación.",
      "Ofrecemos un servicio de calidad combinado con honestidad, experiencia y modernidad, con personal altamente capacitado en México y en el extranjero. Liderazgo en Nuevo León y en toda la República.",
    ],
  },
};

export type CapacityIcon = "bolt" | "helmet" | "gear" | "sync";

/** Sección "Generadores eléctricos industriales" (entre Sectores y Contacto). */
export const capacities = {
  title: ["Generadores eléctricos", "industriales"],
  subtitle: "Renta y venta de plantas de luz",
  background: { src: "/media/mantelek/slider5.jpg", alt: "", tone: "night" } as MediaItem,
  /**
   * Pestañas de capacidad. Cada una muestra un equipo recortado (PNG/WebP con
   * transparencia). `scale` es el ancho relativo en el escenario, para que los
   * equipos chicos se vean más chicos que el contenedor de 3,500 kVA.
   */
  ranges: [
    {
      label: "20 – 500 kVA",
      product: { src: "/media/mantelek/planta-l04.webp", width: 1440, height: 883, alt: "Planta de luz con caseta insonorizada para 20 a 500 kVA" },
      scale: 0.78,
    },
    {
      label: "500 – 1,500 kVA",
      product: { src: "/media/mantelek/venta-de-plantas-electricas-2.png", width: 480, height: 300, alt: "Generador eléctrico de 500 a 1,500 kVA" },
      scale: 0.82,
    },
    {
      label: "1,500 – 3,000 kVA",
      product: { src: "/media/mantelek/venta-de-plantas-electricas-1.png", width: 480, height: 300, alt: "Generador eléctrico de 1,500 a 3,000 kVA" },
      scale: 0.92,
    },
    {
      label: "3,500 kVA",
      product: { src: "/media/mantelek/planta1.png", width: 800, height: 395, alt: "Generador eléctrico en contenedor de 3,500 kVA" },
      scale: 1,
    },
  ],
  heading: "Renta de generadores eléctricos en Monterrey",
  /** El texto del medio va resaltado en una píldora amarilla. */
  text: [
    "Soluciones de generación eléctrica para la industria, construcción, comercio, espectáculos y telecomunicaciones, con capacidades desde",
    "20 kVA hasta 3,500 kVA",
    "por unidad.",
  ],
  features: [
    { icon: "bolt", label: "Amplio rango de capacidades 20 – 3,500 kVA" },
    { icon: "helmet", label: "Energía confiable y continua" },
    { icon: "gear", label: "Soporte técnico 24/7" },
    { icon: "sync", label: "Sistemas de sincronización (alta potencia)" },
  ] satisfies { icon: CapacityIcon; label: string }[],
  cta: { label: "Cotizar generador eléctrico", href: "#contacto" },
};

export const cta = {
  title: "Energía para su proyecto",
  /** El contador lateral recorre de 01 a este número (años de trayectoria). */
  total: 30,
  text: "Cuéntenos para qué uso requiere el generador (industrial, construcción, espectáculos, telecomunicaciones o comercial) y le ayudamos a elegir el equipo correcto.",
  highlight: `¡Llame ahora! ${contact.phone.label}`,
  primary: { label: "Llamar ahora", href: contact.phone.href },
  secondary: { label: "Escríbanos por WhatsApp", href: contact.whatsapp.href },
  footnote: `${contact.address.join(", ")} · ${contact.email.label}`,
  /**
   * Capas de la escena de parallax, de atrás hacia adelante (opcionales).
   * `front` es un PNG recortado (el equipo) que queda al frente del título.
   */
  layers: { back: "/media/mantelek/bk-plantas-mantelek.jpg", middle: "", front: "/media/mantelek/planta1.png" },
};

export const footer = {
  title: "Somos la energía que su proyecto necesita.",
  cta: { label: "Contáctenos", href: "#contacto" },
  // Lo que tiene sección en esta página usa su ancla; el resto va a mantelek.mx.
  menu: [
    { label: "Inicio", href: "#" },
    { label: "¿Quiénes somos?", href: "#nosotros" },
    { label: "Venta de plantas de luz", href: `${SITE_MAIN}/venta/` },
    { label: "Leasing", href: `${SITE_MAIN}/leasing/` },
    { label: "Torre de iluminación", href: `${SITE_MAIN}/torre-de-luminacion/` },
    { label: "Proyectos especiales", href: `${SITE_MAIN}/proyectos-especiales/` },
    { label: "Descargas", href: `${SITE_MAIN}/descargas/` },
  ],
  rentals: [
    { label: "Industria", href: `${SITE_MAIN}/industria/` },
    { label: "Construcción", href: `${SITE_MAIN}/construccion/` },
    { label: "Espectáculos", href: `${SITE_MAIN}/espectaculos/` },
    { label: "Telecomunicaciones", href: `${SITE_MAIN}/telecomunicaciones/` },
    { label: "Comercial", href: "#proyectos" },
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/mantelekpowerrentals" },
    { label: "Instagram", href: "https://www.instagram.com/mantelekpowerrentals" },
    { label: "WhatsApp", href: contact.whatsapp.href },
  ],
  legal: [{ label: "Aviso de privacidad", href: `${SITE_MAIN}/aviso-de-privacidad/` }],
  year: 2026,
};
