"use client";

import React, { useRef } from "react";
import Candle from "./Candle";
import Image from "next/image";
import gsap from "gsap";

//xl screen bole toh 14inch Laptops
export default function CardXLScreens({
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

    const offsetX = (windowWidth - 1100) / 2;

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
        x: offsetX,
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
      className="relative w-[450px] h-[1000px] hidden lg:hidden xl:flex flex-col items-center justify-center cursor-pointer"
      ref={containerRef}
      onClick={handleClick}
    >
      {/* frontside */}
      <div
        ref={frontRef}
        className="w-[450px] h-[500px] bg-cover bg-[url('/carddd.jpg')] overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
      >
        <div
          ref={contentRef}
          className="w-[300px] h-[140px] flex flex-col justify-center items-center"
        >
          <div className="w-[300px] h-[45px] flex items-center justify-center bg-[#418ae3] card-title absolute top-36 left-1/2 -translate-x-1/2 z-30">
            <p className="uppercase text-[37px] font-semibold font-barlow">
              happy birthday!
            </p>
          </div>
          <div className="w-[450px] h-[170px] flex justify-center items-center bg-green-500 card-name text-center relative overflow-visible"></div>
          <p className="text-7xl font-barlow uppercase absolute z-40 font-semibold ">
            {name}
          </p>
        </div>
      </div>
      <div className="w-[1px] h-[95%] relative z-40 mr-[450px]"></div>
      {/* backside */}
      <div className="absolute w-[450px] h-[500px] bg-cover bg-[url('/carddd.jpg')] z-5 flex items-center justify-center flex-col">
        <p className="font-barlow text-[90px] leading-[1.15] font-semibold uppercase text-[#020817]">
          Blow!
        </p>
        <p className="font-barlow text-[20px] font-semibold uppercase text-[#020817]">
          (for a suprise)
        </p>
        {callGraffiti && (
          <div className="absolute z-40 right-[100%] h-full w-full items-center justify-center flex text-center px-5">
            <p className=" text-xl font-normal font-geistSans transition-opacity ease-in duration-100 ">
              {message}
            </p>
          </div>
        )}
        <div className="relative">
          {/* cake */}
          <Image
            src="/cakeBlow.png"
            width={370}
            height={370}
            alt="Picture of the author"
          />

          {/* candles */}
          <div className="absolute bottom-[54%] flex justify-center items-center bg-[#3a3fda00] w-full px-1 h-[100px]">
            <Candle isExtinguished={isExtinguished} className="mr-72 mb-14" />
            <Candle isExtinguished={isExtinguished} className="mr-56 mb-5" />
            <Candle isExtinguished={isExtinguished} className="mr-36 mb-0" />
            <Candle isExtinguished={isExtinguished} className="mr-44 mb-12" />
            <Candle isExtinguished={isExtinguished} className="mr-24 mb-5" />
            <Candle
              isExtinguished={isExtinguished}
              className="mr-16 mb-1 z-10"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="mr-[123px] mb-[90px] "
            />
            <Candle
              isExtinguished={isExtinguished}
              className="mr-[62px] mb-[95px] "
            />
            <Candle
              isExtinguished={isExtinguished}
              className="mr-[22px] mb-[40px] "
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[10px] -mb-2 z-10"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[95px] mb-24"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[140px] mb-16"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[185px] mb-[100px]"
            />
            <Candle isExtinguished={isExtinguished} className="ml-16 mb-5" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-7 mb-[90px]"
            />
            <Candle isExtinguished={isExtinguished} className="ml-28 mb-0" />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[170px] mb-2"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[210px] mb-5"
            />
            <Candle
              isExtinguished={isExtinguished}
              className="ml-[260px] mb-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
