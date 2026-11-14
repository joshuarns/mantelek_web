"use client";

import Image from "next/image";
import { useRef } from "react";
import { cta as preorder } from "@/content/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "../ui/Button";

/**
 * Escena de parallax por capas (fondo → título → capa media → primer plano)
 * con un contador tipo odómetro "01/50" y un CTA final.
 */
export function Preorder() {
  const root = useRef<HTMLElement>(null);
  const digits = String(preorder.total).length;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const counter = q(".preorder__count")[0] as HTMLElement;
      const fill = q(".preorder__progress-fill")[0] as HTMLElement;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const n = Math.max(1, Math.ceil(self.progress * preorder.total));
            counter.textContent = String(n).padStart(digits, "0");
            fill.style.transform = `scaleY(${self.progress})`;
          },
        },
      });

      tl.fromTo(".preorder__layer--back", { yPercent: 0, scale: 1.15 }, { yPercent: -6, scale: 1, duration: 1 }, 0)
        .fromTo(".preorder__title", { yPercent: 70 }, { yPercent: -30, duration: 0.6 }, 0)
        .to(".preorder__title", { autoAlpha: 0, duration: 0.15 }, 0.5)
        .fromTo(".preorder__layer--middle", { yPercent: 0 }, { yPercent: 14, duration: 1 }, 0)
        .fromTo(".preorder__layer--front", { yPercent: 0 }, { yPercent: 30, duration: 1 }, 0)
        .to(".preorder__veil", { opacity: 0.55, duration: 0.3 }, 0.55)
        .from(".preorder__panel > *", { autoAlpha: 0, y: 40, stagger: 0.04, duration: 0.25 }, 0.6)
        .from(".preorder__disclaimer", { autoAlpha: 0, duration: 0.2 }, 0.75);
    },
    { scope: root },
  );

  const total = String(preorder.total).padStart(digits, "0");

  return (
    <section id="contacto" ref={root} className="preorder theme-dark" data-nav-theme="dark">
      <div className="preorder__sticky">
        <Layer kind="back" src={preorder.layers.back} />
        <h2 className="heading-xxl preorder__title">{preorder.title}</h2>
        <Layer kind="middle" src={preorder.layers.middle} />
        <Layer kind="front" src={preorder.layers.front} />
        <div className="preorder__veil" aria-hidden />

        <div className="preorder__indicator eyebrow" aria-hidden>
          <span>
            <span className="preorder__count">{"1".padStart(digits, "0")}</span>/{total}
          </span>
          <span className="preorder__progress">
            <span className="preorder__progress-fill" />
          </span>
          <span>
            {total}/{total}
          </span>
        </div>

        <div className="preorder__panel">
          <p className="paragraph-m">{preorder.text}</p>
          <p className="paragraph-m">
            <strong>{preorder.highlight}</strong>
          </p>
          <div className="btn-row">
            <Button href={preorder.primary.href} variant="light">
              {preorder.primary.label}
            </Button>
            <Button href={preorder.secondary.href} variant="accent">
              {preorder.secondary.label}
            </Button>
          </div>
        </div>

        <p className="preorder__disclaimer">{preorder.footnote}</p>
      </div>
    </section>
  );
}

const RIDGES = {
  back: { color: "#1c3a63", base: 0.55, amp: 0.12, seed: 3 },
  middle: { color: "#112640", base: 0.7, amp: 0.1, seed: 7 },
  front: { color: "#09182d", base: 0.86, amp: 0.06, seed: 11 },
} as const;

function Layer({ kind, src }: { kind: keyof typeof RIDGES; src: string }) {
  return (
    <div className={`preorder__layer preorder__layer--${kind}`} aria-hidden>
      {src ? (
        <Image src={src} alt="" fill sizes="100vw" className={`media__img preorder__layer-img--${kind}`} />
      ) : (
        <Ridge {...RIDGES[kind]} sky={kind === "back"} />
      )}
    </div>
  );
}

/** Silueta de cerros generada (placeholder de cada capa del parallax). */
function Ridge({ color, base, amp, seed, sky }: { color: string; base: number; amp: number; seed: number; sky: boolean }) {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * 1000;
    const y =
      1000 *
      (base -
        amp * (0.6 * Math.sin(i * 0.35 + seed) + 0.3 * Math.sin(i * 0.9 + seed * 2) + 0.1 * Math.sin(i * 2.3 + seed)));
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="preorder__ridge">
      {sky && (
        <>
          <defs>
            <linearGradient id="preorder-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5f8fc0" />
              <stop offset="0.6" stopColor="#2a5a92" />
              <stop offset="1" stopColor="#183f72" />
            </linearGradient>
          </defs>
          <rect width="1000" height="1000" fill="url(#preorder-sky)" />
        </>
      )}
      <polygon points={`0,1000 ${pts.join(" ")} 1000,1000`} fill={color} />
    </svg>
  );
}
