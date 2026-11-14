"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;

/** Instancia global de Lenis (null si el usuario prefiere menos movimiento). */
export function getLenis() {
  return instance;
}

/** Hace scroll suave a un elemento, selector o posición en px. */
export function scrollTo(target: string | number | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  const top = typeof el === "number" ? el : (el?.getBoundingClientRect().top ?? 0) + window.scrollY;
  window.scrollTo({ top: top + offset, behavior: "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, wheelMultiplier: 1 });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
