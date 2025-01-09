"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import envolopeAni from "../animationHooks/evelopeAni";
import carImg from "../../public/car.png";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";

export default function Envelope({ link }) {
  const [display, setDisplay] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  // const card = useRef();
  // const car = useRef();

  // useEffect(() => {
  //   if (card.current && car.current) {
  //     envolopeAni({ card: card.current, car: car.current });
  //   }
  // }, [card, car]);

  // useEffect(() => {
  //   setDisplay(true);
  //   const timer = setTimeout(() => {
  //     setDisplay(false);
  //   }, 7000);
  //   return () => clearTimeout(timer);
  // }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setShowIcon(true);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  bg-[#F1EEE0] z-20 overflow-hidden">
      {display ? (
        <div className="w-full h-screen flex justify-center items-center  bg-[#F1EEE0] z-20 overflow-hidden">
          <div
            ref={car}
            className="w-full h-screen justify-center items-center flex"
          >
            <Image
              src={carImg}
              width={250}
              height={250}
              className="absolute -left-64 bottom-40 opacity-90 z-0"
              alt=""
            />
          </div>
          <div
            ref={card}
            className="w-[300px] h-[545px] bg-cover overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
          >
            <div className="w-[300px] h-[45px] flex items-center justify-center bg-[#418ae3] card-title absolute top-36 left-1/2 -translate-x-1/2">
              <p className="uppercase text-[37px] font-semibold font-barlow">
                happy birthday!
              </p>
            </div>
            <div className="w-full h-[140px] flex justify-center items-center bg-green-500 card-name text-center relative overflow-visible"></div>
            <p className="text-7xl font-barlow uppercase absolute z-40 font-semibold ">
              Aayush <br /> Chaudhary
            </p>
          </div>
        </div>
      ) : (
        <div className="w-[90%] xl:w-[23%] bg-white flex flex-col gap-6">
          <div className="w-full pt-5 px-6 text-lg flex flex-col gap-2">
            <p className="font-lexend text-base text-start">Send this link:</p>
            <div className="w-full flex items-center justify-start gap-1 h-[35px] lg:h-auto bg-[#e9e9e9] rounded-sm overflow-hidden">
              <button
                className="px-2 py-2 bg-purple-200 rounded-sm"
                onClick={copyLink}
              >
                {showIcon ? (
                  <CheckIcon className="size-5 stroke-1.5" />
                ) : (
                  <ClipboardIcon className="size-5 stroke-1.5" />
                )}
              </button>
              <p className="font-normal text-base text-left">{link}</p>
            </div>
          </div>

          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-[#A855F7] font-medium py-[6px] font-lexend text-white text-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
