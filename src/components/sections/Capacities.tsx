"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { capacities, type CapacityIcon } from "@/content/home";
import { Draggable, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Button } from "../ui/Button";

/**
 * Hero — "Generadores eléctricos industriales": fondo industrial nocturno, título en
 * itálica, pestañas de capacidad que cambian el equipo del escenario, piso claro
 * con anillo "360°" (arrastrar gira el equipo) y columna con texto, ventajas y CTA.
 */
export function Capacities() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = useRef(0);

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const products = q<HTMLElement>(".capacities__product");
      gsap.set(products, { autoAlpha: 0 });
      gsap.set(products[0], { autoAlpha: 1 });
      moveIndicator(0, false);
      q(".capacities__tabs")[0]?.classList.add("is-ready");

      // Entrada con el scroll
      const intro = gsap.timeline({
        // Es el hero: corre al cargar (la sección ya está en pantalla).
        delay: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      SplitText.create(".capacities__title-line", {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          intro.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0),
      });
      intro
        .from(".capacities__subtitle", { autoAlpha: 0, y: 20, duration: 1 }, 0.35)
        .from(".capacities__tabs", { autoAlpha: 0, y: 20, duration: 1 }, 0.45)
        .from(".capacities__turntable", { autoAlpha: 0, xPercent: -8, duration: 1.4 }, 0.5)
        .from(".capacities__ring", { autoAlpha: 0, scale: 0.85, duration: 1.2 }, 0.6)
        .from(".capacities__info > *", { autoAlpha: 0, y: 30, duration: 1, stagger: 0.08 }, 0.6)
        .from(".capacities__feature", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.06 }, 0.9);

      // Parallax del fondo
      gsap.fromTo(
        ".capacities__bg",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // "360°": arrastrar en horizontal gira el equipo y al soltar regresa.
      const turntable = q<HTMLElement>(".capacities__turntable")[0];
      const proxy = document.createElement("div");
      const [drag] = Draggable.create(proxy, {
        type: "x",
        trigger: q(".capacities__stage")[0],
        onPress() {
          gsap.killTweensOf(turntable, "rotationY");
          gsap.set(proxy, { x: 0 });
          this.update();
        },
        onDrag() {
          gsap.set(turntable, { rotationY: gsap.utils.clamp(-30, 30, this.x * 0.12) });
        },
        onRelease() {
          gsap.to(turntable, { rotationY: 0, duration: 1.4, ease: "elastic.out(1, 0.45)" });
        },
      });

      const onResize = () => moveIndicator(current.current, false);
      window.addEventListener("resize", onResize);
      return () => {
        drag.kill();
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: root },
  );

  /** Mueve la píldora blanca de la pestaña activa. */
  function moveIndicator(i: number, animate = true) {
    const el = root.current;
    if (!el) return;
    const tab = el.querySelectorAll<HTMLElement>(".capacities__tab")[i];
    const pill = el.querySelector<HTMLElement>(".capacities__tab-pill");
    if (!tab || !pill) return;
    const props = { x: tab.offsetLeft, width: tab.offsetWidth };
    if (animate) gsap.to(pill, { ...props, duration: 0.7 });
    else gsap.set(pill, props);
  }

  const select = contextSafe((i: number) => {
    const prev = current.current;
    if (i === prev) return;
    current.current = i;
    setActive(i);
    moveIndicator(i);

    // En móvil las pestañas se desplazan: centra la activa.
    const tabs = root.current?.querySelector<HTMLElement>(".capacities__tabs");
    const tab = root.current?.querySelectorAll<HTMLElement>(".capacities__tab")[i];
    if (tabs && tab && tabs.scrollWidth > tabs.clientWidth) {
      tabs.scrollTo({ left: tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    }

    const products = gsap.utils.toArray<HTMLElement>(".capacities__product", root.current);
    const dir = i > prev ? 1 : -1;
    gsap.to(products[prev], { autoAlpha: 0, xPercent: -14 * dir, scale: 0.92, duration: 0.5, ease: "power2.in", overwrite: true });
    gsap.fromTo(
      products[i],
      { autoAlpha: 0, xPercent: 14 * dir, scale: 0.92 },
      { autoAlpha: 1, xPercent: 0, scale: 1, duration: 1, delay: 0.25, overwrite: true },
    );
  });

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = capacities.ranges.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    root.current?.querySelectorAll<HTMLButtonElement>(".capacities__tab")[next]?.focus();
  };

  return (
    <section id="capacidades" ref={root} className="capacities theme-dark" data-nav-theme="dark">
      <div className="capacities__bg-wrap" aria-hidden>
        <div className="capacities__bg">
          <Image src={capacities.background.src!} alt="" fill sizes="100vw" loading="eager" className="media__img" />
        </div>
        <div className="capacities__shade" />
        <div className="capacities__floor" />
      </div>

      <div className="wrap capacities__inner">
        <header className="capacities__head">
          <h1 className="capacities__title">
            {capacities.title.map((line) => (
              <span key={line} className="capacities__title-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="capacities__subtitle">{capacities.subtitle}</p>

          <div className="capacities__tabs" role="tablist" aria-label="Capacidad del equipo">
            <span className="capacities__tab-pill" aria-hidden />
            {capacities.ranges.map((range, i) => (
              <button
                key={range.label}
                type="button"
                role="tab"
                id={`capacidad-tab-${i}`}
                aria-selected={i === active}
                aria-controls="capacidad-panel"
                tabIndex={i === active ? 0 : -1}
                className={`capacities__tab${i === active ? " is-active" : ""}`}
                onClick={() => select(i)}
                onKeyDown={onTabKey}
              >
                {range.label}
              </button>
            ))}
          </div>
        </header>

        <div className="capacities__body">
          <div
            id="capacidad-panel"
            role="tabpanel"
            aria-labelledby={`capacidad-tab-${active}`}
            className="capacities__stage"
          >
            <div className="capacities__ring" aria-hidden>
              <span className="capacities__ring-label">360°</span>
            </div>
            <div className="capacities__turntable">
              {capacities.ranges.map((range, i) => (
                <div
                  key={range.label}
                  className="capacities__product"
                  style={{ "--scale": range.scale } as CSSProperties}
                  aria-hidden={i !== active}
                >
                  <div className="capacities__product-shadow" />
                  <Image
                    src={range.product.src}
                    alt={range.product.alt}
                    width={range.product.width}
                    height={range.product.height}
                    sizes="(max-width: 991px) 90vw, 55vw"
                    className="capacities__product-img"
                    draggable={false}
                    loading={i === 0 ? "eager" : undefined}
                    fetchPriority={i === 0 ? "high" : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="capacities__info">
            <h2 className="capacities__heading">{capacities.heading}</h2>
            <p className="capacities__text">
              {capacities.text[0]} <mark className="capacities__pill">{capacities.text[1]}</mark> {capacities.text[2]}
            </p>
            <ul className="capacities__features">
              {capacities.features.map((f) => (
                <li key={f.label} className="capacities__feature">
                  <FeatureIcon icon={f.icon} />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button href={capacities.cta.href} variant="red">
                {capacities.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ icon }: { icon: CapacityIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "capacities__feature-icon",
    "aria-hidden": true,
  };
  switch (icon) {
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13.5 2.5L5 13.5h6.5l-1 8 8.5-11h-6.5l1-8z" />
        </svg>
      );
    case "helmet":
      return (
        <svg {...common}>
          <path d="M3.5 17.5h17M5 17.5a7 7 0 0 1 14 0" />
          <path d="M10 10.8V7.5h4v3.3M8.5 17.5v-4M15.5 17.5v-4" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M6 18l1.6-1.6M16.4 7.6L18 6" />
          <circle cx="12" cy="12" r="6.3" />
        </svg>
      );
    case "sync":
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="8.5" height="6.5" rx="1" />
          <rect x="13" y="5" width="8.5" height="6.5" rx="1" />
          <path d="M6.75 11.5v3h10.5v-3M12 14.5v3.5M8.5 18h7" />
        </svg>
      );
  }
}
