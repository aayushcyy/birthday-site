import React, { useEffect } from "react";
import { gsap } from "gsap";

export default function evelopeAni({ card, car }) {
  if (!card || !car) return;

  const tl = gsap.timeline();

  tl.from(card, {
    y: -400,
    duration: 2,
  });

  return tl;
}
