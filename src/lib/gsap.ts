"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  Draggable,
  InertiaPlugin,
  CustomEase,
  useGSAP,
);

// Curva principal de las animaciones (salida rápida, frenado largo).
CustomEase.create("brand", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "brand", duration: 1 });

export { gsap, ScrollTrigger, SplitText, Draggable, useGSAP };
