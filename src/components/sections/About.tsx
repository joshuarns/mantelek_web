"use client";

import { useRef } from "react";
import { about } from "@/content/home";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Button } from "../ui/Button";
import { Media } from "../ui/Media";

/** Fondo a pantalla completa con parallax y texto que se "enciende" palabra por palabra. */
export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about__bg",
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      SplitText.create(".about__title", {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: ".about__title", start: "top 85%", end: "bottom 45%", scrub: true },
            },
          ),
      });

      gsap.from(".about__reveal", {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        scrollTrigger: { trigger: ".about__content", start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="nosotros" ref={root} className="about theme-dark" data-nav-theme="dark">
      <div className="about__bg-wrap" aria-hidden>
        <Media item={about.background} className="about__bg" label="Imagen de fondo" />
        <div className="about__overlay" />
      </div>

      <div className="wrap about__content">
        <h2 className="heading-l about__title">{about.title}</h2>
        <div className="about__body">
          <p className="paragraph-m about__reveal">{about.text}</p>
          <div className="about__reveal">
            <Button href={about.cta.href} variant="outline">
              {about.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
