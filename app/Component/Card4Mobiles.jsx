"use client";

import React, { useRef } from "react";
import Candle from "./Candle";
import Image from "next/image";
import gsap from "gsap";

export default function Card4Mobiles({
  name,
  message,
  isExtinguished,
  callGraffiti,
}) {
  const containerRefMobile = useRef(null);
  const frontRefMobile = useRef(null);
  const contentRefMobile = useRef(null);

  const handleClick = () => {
    const tl = gsap.timeline();

    const containerBounds = containerRefMobile.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const offsetY = windowHeight / 5;

    //animation for larger screens
    tl.to(frontRefMobile.current, {
      rotationX: -180,
      transformOrigin: "top center",
      duration: 1.5,
      ease: "power3.inOut",
    });
    tl.to(
      containerRefMobile.current,
      {
        height: "100vh",
        y: offsetY,
        duration: 0.5,
        ease: "expo.inOut",
      },
      "<"
    );
    tl.to(
      contentRefMobile.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=1"
    );
  };

  return (
    <div
      className="relative w-full h-full flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden flex-col items-center justify-center cursor-pointer"
      ref={containerRefMobile}
      onClick={handleClick}
    >
      {/* frontside */}
      <div
        ref={frontRefMobile}
        className="w-[70vw] h-[70vw] bg-cover bg-[url('/carddd.jpg')] overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
      >
        <div
          ref={contentRefMobile}
          className="w-[100%] h-[100%] flex flex-col justify-center items-center"
        >
          <div className="w-[60%] h-[10%] flex items-center justify-center bg-[#418ae3] card-title absolute top-10 left-1/2 -translate-x-1/2 z-30">
            <p className="uppercase text-[5vw] font-semibold font-barlow">
              happy birthday!
            </p>
          </div>
          <div className="w-[100%] h-[38%] flex justify-center items-center bg-green-500 card-name text-center relative overflow-visible"></div>
          <p className="text-[14vw] leading-[1] font-barlow uppercase absolute z-40 font-semibold w-[90%]">
            {name}
          </p>
        </div>
      </div>

      {/* backside */}
      <div className="absolute w-[70vw] h-[70vw] bg-cover bg-[url('/carddd.jpg')] z-5 flex items-center flex-col">
        <p className="font-barlow text-[15vw] leading-[1.15] font-semibold uppercase text-[#020817]">
          Blow!
        </p>
        <p className="font-barlow text-[4vw] font-semibold uppercase text-[#020817]">
          (for a suprise)
        </p>
        {callGraffiti && (
          <div className="absolute z-[50] bg-purple-500 bottom-full h-full w-full items-center justify-center flex text-center px-5">
            <p className="italic text-[.6rem] font-normal font-geistSans transition-opacity ease-in duration-100">
              {message}
            </p>
          </div>
        )}

        {/* cake container */}
        <div className="relative w-full -mt-2 flex justify-center">
          {/* cake */}
          <Image
            src="/cakeBlow.png"
            width={370}
            height={370}
            alt="Picture of the author"
            className="w-[100%] h-[80%]"
          />

          {/* candles */}
          <div className="absolute bottom-[65.1%] flex items-center rounded-b-[80%] rounded-t-[80%] w-[87%] px-1 h-[20%]">
            <Candle isExtinguished={isExtinguished} className="ml-[80%] mb-6" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[4%] mb-4 z-10"
            />
            <Candle isExtinguished={isExtinguished} className="ml-[11%] mb-5" />
            <Candle isExtinguished={isExtinguished} className="ml-[18%] mb-1" />
            <Candle isExtinguished={isExtinguished} className="ml-[31%] mb-6" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[25%] mb-3 z-10"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[37%] -mb-2"
            />
            <Candle isExtinguished={isExtinguished} className="ml-[44%] mb-0" />
            <Candle isExtinguished={isExtinguished} className="ml-[55%] mb-7" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[50%] -mb-3"
            />
            <Candle isExtinguished={isExtinguished} className="ml-[68%] mb-8" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[62%] -mb-2"
            />
            <Candle isExtinguished={isExtinguished} className="ml-[75%] mb-1" />
            <Candle isExtinguished={isExtinguished} className="ml-[85%] mb-4" />
            <Candle isExtinguished={isExtinguished} className="ml-[92%] mb-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
