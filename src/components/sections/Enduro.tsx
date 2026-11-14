"use client";

import { useRef } from "react";
import { solutions as enduro } from "@/content/home";
import { Draggable, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Media } from "../ui/Media";

// Recorrido tipo GPS que se dibuja con el scroll (viewBox 1000×2000).
const TRAIL =
  "M560 0 C548 60 540 110 520 150 S470 225 420 232 L250 236 C200 238 160 262 140 300 L90 400 C70 440 90 470 130 500 L310 690 C360 735 420 750 520 752 L640 760 C690 770 710 820 720 880 L735 960 C745 1010 790 1060 860 1090 L930 1120 C960 1160 950 1230 925 1300 L880 1390 C850 1440 790 1470 700 1490 L560 1520 C500 1540 470 1590 450 1660 L430 1790 C410 1860 330 1920 220 1960 L120 2000";

/**
 * Sección "terreno": una línea de recorrido que se dibuja con el scroll,
 * imágenes con parallax, una galería arrastrable con inercia y un bloque final de texto.
 */
export function Enduro() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // Línea de recorrido
      gsap.fromTo(
        ".enduro__trail",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom bottom", scrub: 0.5 },
        },
      );

      // Parallax: cada elemento con data-speed se desplaza a distinta velocidad.
      q<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { yPercent: speed * 25 },
          {
            yPercent: speed * -25,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Entrada de los bloques de texto
      q<HTMLElement>(".enduro__text").forEach((block) => {
        gsap.from(block.children, {
          autoAlpha: 0,
          y: 30,
          stagger: 0.1,
          scrollTrigger: { trigger: block, start: "top 80%" },
        });
      });

      SplitText.create(".enduro__story-p", {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 100,
            stagger: 0.04,
            scrollTrigger: { trigger: ".enduro__story", start: "top 75%" },
          }),
      });
      gsap.from(".enduro__story-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        scrollTrigger: { trigger: ".enduro__story", start: "top 80%" },
      });

      // Galería infinita: avanza sola y se puede arrastrar con inercia.
      const el = track.current!;
      const half = () => el.scrollWidth / 2;
      const wrap = (v: number) => gsap.utils.wrap(-half(), 0, v);
      const setX = gsap.quickSetter(el, "x", "px");
      let x = 0;
      let base = 0;
      let held = false;
      const tick = (_t: number, dt: number) => {
        if (!held) x -= dt * 0.05;
        setX(wrap(x));
      };
      gsap.ticker.add(tick);

      const proxy = document.createElement("div");
      const [drag] = Draggable.create(proxy, {
        type: "x",
        trigger: el,
        inertia: true,
        onPress() {
          held = true;
          base = x - this.x;
        },
        onDrag() {
          x = base + this.x;
        },
        onThrowUpdate() {
          x = base + this.x;
        },
        onRelease() {
          if (!this.isThrowing) held = false;
        },
        onThrowComplete() {
          held = false;
        },
      });

      return () => {
        gsap.ticker.remove(tick);
        drag.kill();
      };
    },
    { scope: root },
  );

  return (
    <section id="soluciones" ref={root} className="enduro theme-dark" data-nav-theme="dark">
      <svg className="enduro__path" viewBox="0 0 1000 2000" preserveAspectRatio="none" aria-hidden>
        <path className="enduro__trail" d={TRAIL} />
      </svg>

      <div className="wrap enduro__grid">
        <div className="enduro__img--built" data-speed="0.4">
          <Media item={enduro.built.media} className="enduro__img enduro__img--landscape" sizes="40vw" />
        </div>
        <div className="enduro__text enduro__text--built">
          <h2 className="heading-l">{enduro.built.title}</h2>
          <p className="paragraph-regular">{enduro.built.text}</p>
        </div>

        <div className="enduro__img--racing" data-speed="0.8">
          <Media item={enduro.racing.media} className="enduro__img enduro__img--landscape" sizes="40vw" />
        </div>
        <div className="enduro__text enduro__text--racing">
          <h2 className="heading-l">{enduro.racing.title}</h2>
          <p className="paragraph-regular">{enduro.racing.text}</p>
        </div>
        <div className="enduro__img--video" data-speed="0.5">
          <Media item={enduro.racing.video} className="enduro__img enduro__img--landscape" sizes="40vw" label="Video loop" />
        </div>
      </div>

      <div id="proyectos" className="wrap enduro__sectors-head">
        <h2 className="heading-l">{enduro.sectorsTitle}</h2>
      </div>
      <div className="enduro__marquee">
        <div ref={track} className="enduro__track">
          {[...enduro.gallery, ...enduro.gallery].map((item, i) => (
            <div key={i} className="enduro__slide">
              <Media item={item} className="enduro__slide-media" sizes="33vw" />
              <span className="enduro__slide-label">
                <span className="eyebrow">{String((i % enduro.gallery.length) + 1).padStart(2, "0")}</span>
                <span className="heading-s">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap enduro__story">
        <hr className="enduro__story-rule" />
        <h3 className="heading-m enduro__story-title">{enduro.story.title}</h3>
        {enduro.story.columns.map((text, i) => (
          <p key={i} className="paragraph-regular enduro__story-p">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
