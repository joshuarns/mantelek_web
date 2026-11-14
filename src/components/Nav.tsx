"use client";

import Image from "next/image";
import { useRef } from "react";
import { brand, nav } from "@/content/home";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Button } from "./ui/Button";

/**
 * Nav fija. Cambia de color según el tema (`theme-dark` / `theme-light`) de la
 * sección que tiene debajo, igual que el original.
 */
export function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const sections = gsap.utils.toArray<HTMLElement>("[data-nav-theme]");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 2.5%",
        end: "bottom 2.5%",
        onToggle: (self) => {
          if (self.isActive) el.dataset.theme = section.dataset.navTheme;
        },
      });
    });

    gsap.from(el.querySelectorAll(".nav__reveal"), {
      autoAlpha: 0,
      y: -12,
      stagger: 0.05,
      duration: 1,
      delay: 0.4,
    });
  });

  return (
    <header ref={ref} className="nav" data-theme="dark">
      <div className="nav__bar">
        <div className="nav__left">
          <a href={nav.home.href} className="nav__link nav__reveal">
            {nav.home.label}
          </a>
        </div>

        <a href="#" className="nav__logo nav__reveal" aria-label={brand.fullName}>
          <Image src={brand.logo.white} alt="" width={brand.logo.width} height={brand.logo.height} className="nav__logo-img nav__logo-img--white" loading="eager" />
          <Image src={brand.logo.color} alt="" width={brand.logo.width} height={brand.logo.height} className="nav__logo-img nav__logo-img--color" loading="eager" />
        </a>

        <nav className="nav__right">
          {nav.links.map((link) => (
            <a key={link.label} href={link.href} className="nav__link nav__reveal">
              {link.label}
            </a>
          ))}
          <Button href={nav.cta.href} variant="primary" className="nav__reveal">
            {nav.cta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
