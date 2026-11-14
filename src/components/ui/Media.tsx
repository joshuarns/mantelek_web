import Image from "next/image";
import type { MediaItem } from "@/content/home";

interface MediaProps {
  item: MediaItem;
  className?: string;
  sizes?: string;
  /** Carga inmediata (imágenes visibles al cargar). */
  eager?: boolean;
  /** Etiqueta del placeholder (solo se ve si no hay `src`). */
  label?: string;
}

/**
 * Imagen que cubre su contenedor. Sin `src` dibuja un placeholder con el tono
 * indicado, para poder maquetar y animar antes de tener los assets.
 */
export function Media({ item, className = "", sizes = "100vw", eager, label }: MediaProps) {
  return (
    <div className={`media ${className}`}>
      {item.src ? (
        <Image src={item.src} alt={item.alt} fill sizes={sizes} loading={eager ? "eager" : undefined} className="media__img" />
      ) : (
        <div className={`media__placeholder tone-${item.tone ?? "studio"}`} role="img" aria-label={item.alt}>
          {label && <span className="media__label eyebrow">{label}</span>}
        </div>
      )}
    </div>
  );
}
