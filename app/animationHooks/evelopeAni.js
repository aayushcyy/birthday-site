import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function evelopeAni({ card, car }) {
  if (!card || !car) return;

  const tl = gsap.timeline();

  tl.from(card, {
    y: -400,
    duration: 2,
  })
    .to(card, {
      rotate: 90,
      duration: 1,
      y: 100,
      z: 1,
      scale: 0.2,
    })
    .to(card, {
      y: -100,
      x: -41,
      duration: 1,
    })
    .to(car, {
      x: 950,
      duration: 2,
      z: 10,
    })
    .to(car, {
      x: 930,
      duration: 0.5,
    })
    .to(card, {
      y: 12,
      duration: 0.9,
    })
    .to(car, {
      y: 1,
      delay: -0.1,
    })
    .to(car, {
      y: -1,
    })
    .to(car, {
      x: 1800,
      duration: 0.9,
    })
    .to(card, {
      x: 1400,
      delay: -0.9,
      duration: 1.8,
    });

  return tl;
}
