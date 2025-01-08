"use client";

import React, { useRef } from "react";
import Candle from "./Candle";
import Image from "next/image";
import gsap from "gsap";

//xl screen bole toh 14inch Laptops
export default function CardLgScreens({
  name,
  message,
  isExtinguished,
  callGraffiti,
}) {
  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const contentRef = useRef(null);

  const handleClick = () => {
    const tl = gsap.timeline();

    const containerBounds = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    const offsetX = windowWidth - 1150;

    //animation for larger screens
    tl.to(frontRef.current, {
      rotationY: -180,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power3.inOut",
    });
    tl.to(
      containerRef.current,
      {
        width: "900px",
        x: -offsetX,
        duration: 0.5,
        ease: "expo.inOut",
      },
      "<"
    );
    tl.to(
      contentRef.current,
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
      className="relative w-full h-full hidden sm:hidden lg:flex xl:hidden 2xl:hidden md:hidden flex-col items-center justify-center cursor-pointer"
      ref={containerRef}
      onClick={handleClick}
    >
      {/* frontside */}
      <div
        ref={frontRef}
        className="w-[35%] h-[56.9%] bg-cover bg-[url('/carddd.jpg')] overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
      >
        <div
          ref={contentRef}
          className="w-[100%] h-[100%] flex flex-col justify-center items-center"
        >
          <div className="w-[70%] h-[10%] flex items-center justify-center bg-[#418ae3] card-title absolute top-[20%] left-1/2 -translate-x-1/2 z-30">
            <p className="uppercase text-[3vw] font-semibold font-barlow">
              happy birthday!
            </p>
          </div>
          <div className="w-[100%] h-[30%] flex justify-center items-center bg-green-500 card-name text-center"></div>
          <p className="text-[7vw] leading-[1] font-barlow uppercase absolute z-40 font-semibold w-[90%]">
            {name}
          </p>
        </div>
      </div>
      {/* backside */}
      <div className="absolute w-[35%] h-[56.95%] bg-cover bg-[url('/carddd.jpg')] z-5 flex items-center flex-col">
        <p className="pt-3 font-barlow text-[7vw] leading-[1.15] font-semibold uppercase text-[#020817]">
          Blow!
        </p>
        <p className="font-barlow text-[2vw] font-semibold uppercase text-[#020817]">
          (for a suprise)
        </p>
        {callGraffiti && (
          <div className="absolute z-[60] right-full h-full w-full items-center justify-center flex text-center px-5">
            <p className="italic text-lg font-normal font-geistSans transition-opacity ease-in duration-100">
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
            className="w-[90%] h-[86%]"
          />

          {/* candles */}
          <div className="absolute bottom-[65%] flex items-center rounded-b-[80%] rounded-t-[80%] w-[80%] px-1 h-[20%]">
            <Candle isExtinguished={isExtinguished} className="ml-[80%] mb-8" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[4%] mb-8 z-10"
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
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[68%] mb-10"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[62%] -mb-2"
            />
            <Candle isExtinguished={isExtinguished} className="ml-[75%] mb-1" />
            <Candle isExtinguished={isExtinguished} className="ml-[85%] mb-5" />
            <Candle isExtinguished={isExtinguished} className="ml-[92%] mb-9" />
          </div>
        </div>
      </div>
    </div>
  );
}
