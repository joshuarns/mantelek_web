import type { MouseEvent } from "react";
import { isExternal } from "@/content/home";

/**
 * `primary` (amarillo), `ghost` (contorno) y `red` (CTA de cotización) son
 * rectangulares, con flecha sin círculo.
 */
type Variant = "light" | "accent" | "outline" | "primary" | "ghost" | "red";

interface ButtonProps {
  href: string;
  children: string;
  variant?: Variant;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/** Botón píldora con ícono circular y hover de texto que "rueda" hacia arriba. */
export function Button({ href, children, variant = "light", className = "", onClick }: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`btn btn--${variant} ${className}`}
      {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="btn__text" data-text={children}>
        <span>{children}</span>
      </span>
      <span className="btn__icon" aria-hidden>
        <ArrowIcon />
      </span>
    </a>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="btn__arrow">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
