import React from "react";
import { gsap } from "gsap";

export default function Graffiti() {
  const colorArr = [
    "#1356eb",
    "#23a0a4",
    "#d71201",
    "#fec449",
    "#5CB338",
    "#344CB7",
    "#FF8383",
    "#A02334",
    "#5E1675",
    "#D04848",
  ];
  const graffiti = document.querySelector(".graffiti");

  // Falling effect
  gsap.to(graffiti, {
    y: 600, // Fall distance
    rotation: 45, // Slight rotation during the fall
    duration: 4, // Duration of the fall
    ease: "bounce.out", // Bounce effect at the bottom
  });

  // Dripping effect
  for (let i = 0; i < 10; i++) {
    const drip = document.createElement("div");
    drip.classList.add("drip");
    document.body.appendChild(drip);

    // Randomize initial position near graffiti
    gsap.set(drip, {
      position: "absolute",
      width: `${Math.random() * 5 + 2}px`,
      height: `${Math.random() * 10 + 5}px`,
      rotate: `${Math.random() * 90}deg`,
      backgroundColor: `${colorArr[`${Math.floor(Math.random() * 10)}`]}`,
      top: Math.random() * 50 + 50 + "px",
      left: Math.random() * window.innerWidth + "px",
    });

    // Animate each drip
    gsap.to(drip, {
      y: 500, // Drip fall distance
      duration: Math.random() * 2 + 1, // Random duration
      opacity: 0, // Fade out as it falls
      ease: "power1.out",
      onComplete: () => drip.remove(), // Remove drip after animation
    });
  }

  return (
    <div class="graffiti-container w-[90%] top-0 absolute h-[90vh] overflow-hidden bg-transparent z-[100]"></div>
  );
}
