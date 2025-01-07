"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { gsap } from "gsap";
import Image from "next/image";
import Candle from "@/app/Component/Candle";
import Graffiti from "@/app/Component/Graffiti";
import Loader from "../../Component/Loader";

export default function UserPage({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [callGraffiti, setCallGraffiti] = useState(false);
  const router = useRouter();

  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const contentRef = useRef(null);
  const containerRefMobile = useRef(null);
  const frontRefMobile = useRef(null);
  const contentRefMobile = useRef(null);

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await paramsPromise;
      setParams(unwrappedParams);
    }

    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", params.id); // Access `id` here after unwrapping
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.error("User not found");
          router.push("/404");
          return;
        }

        setUserData(docSnap.data());
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, router]);

  const handleClick = () => {
    const tl = gsap.timeline();

    const containerBounds = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const offsetX = (windowWidth - 1100) / 2;
    const offsetY = windowHeight / 4.2;

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

    //animation for mobile screens
    tl.to(frontRefMobile.current, {
      rotationX: -180,
      transformOrigin: "top center",
      duration: 1.5,
      ease: "power3.inOut",
    });
    tl.to(
      containerRefMobile.current,
      {
        height: "900px",
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

  const handleBlowCandle = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setShowCard(true);
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let extinguishTimeout = null;
      const checkSound = () => {
        analyser.getByteFrequencyData(dataArray);
        const rms = Math.sqrt(
          dataArray.reduce((sum, value) => sum + value ** 2, 0) /
            dataArray.length
        );

        if (rms > 60 && !isExtinguished) {
          if (!extinguishTimeout) {
            extinguishTimeout = setTimeout(() => {
              setIsExtinguished(true);
              console.log("Candle extinguished!");
              setCallGraffiti(true);
              stream.getTracks().forEach((track) => track.stop());
            }, 300); // Debounce duration
          }
        } else if (rms <= 60) {
          clearTimeout(extinguishTimeout);
          extinguishTimeout = null;
        }

        if (!isExtinguished) {
          requestAnimationFrame(checkSound);
        }
      };
      checkSound();
    });
  };

  if (loading) return <Loader />;

  if (!userData) return <p>No data has been fetched</p>;

  return (
    <div className="w-full h-screen flex flex-col items-center relative bg-[#F1EEE0]">
      {/* card for xl(width-1024>) screens */}
      {showCard && (
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
                {userData.name}
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
                  {userData.message}
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
                <Candle
                  isExtinguished={isExtinguished}
                  className="mr-72 mb-14"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="mr-56 mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="mr-36 mb-0"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="mr-44 mb-12"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="mr-24 mb-5"
                />
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
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-16 mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-7 mb-[90px]"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-28 mb-0"
                />
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
      )}

      {/* card for mobile(width-640px<) screens */}
      {showCard && (
        <div
          className="relative w-full h-full flex sm:hidden md:hidden lg:hidden flex-col items-center justify-center cursor-pointer"
          ref={containerRefMobile}
          onClick={handleClick}
        >
          {/* frontside */}
          <div
            ref={frontRefMobile}
            className="w-[90%] h-[46%] bg-cover bg-[url('/carddd.jpg')] overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
          >
            <div
              ref={contentRefMobile}
              className="w-[100%] h-[100%] flex flex-col justify-center items-center"
            >
              <div className="w-[90%] h-[13%] flex items-center justify-center bg-[#418ae3] card-title absolute top-20 left-1/2 -translate-x-1/2 z-30">
                <p className="uppercase text-[35px] font-semibold font-barlow">
                  happy birthday!
                </p>
              </div>
              <div className="w-[410px] h-[170px] flex justify-center items-center bg-green-500 card-name text-center relative overflow-visible"></div>
              <p className="text-[4.1rem] leading-[1] font-barlow uppercase absolute z-40 font-semibold ">
                {userData.name}
              </p>
            </div>
          </div>
          <div className="w-[1px] h-[95%] bg-[#9F8A6B] relative z-40 mr-[410px] shadow-[rgba(0,0,0,0.61)_-42px_0px_114px_-40px]"></div>

          {/* backside */}
          <div className="absolute w-[90%] h-[46%] bg-cover bg-[url('/carddd.jpg')] z-5 flex items-center flex-col overflow-hidden">
            <p className="font-barlow text-[4.5rem] leading-[1.15] font-semibold uppercase text-[#020817]">
              Blow!
            </p>
            <p className="font-barlow text-[20px] font-semibold uppercase text-[#020817]">
              (for a suprise)
            </p>
            {callGraffiti && (
              <div className="absolute z-[50] bottom-full h-full w-full items-center justify-center flex text-center px-5">
                <p className="italic text-xl font-normal font-geistSans transition-opacity ease-in duration-100">
                  {userData.message}
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
                className="w-[100%] h-[86%]"
              />

              {/* candles */}
              <div className="absolute bottom-[65%] flex items-center rounded-b-[80%] rounded-t-[80%] w-[87%] px-1 h-[20%]">
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[80%] mb-8"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[4%] mb-8 z-10"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[11%] mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[18%] mb-1"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[31%] mb-6"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[25%] mb-3 z-10"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[37%] -mb-2"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[44%] mb-0"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[55%] mb-7"
                />
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
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[75%] mb-1"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[85%] mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[92%] mb-9"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* card for Smaller(width-640px<768) screens */}
      {showCard && (
        <div
          className="relative w-full h-full sm:flex hidden md:hidden lg:hidden flex-col items-center justify-center cursor-pointer"
          ref={containerRefMobile}
          onClick={handleClick}
        >
          {/* frontside */}
          <div
            ref={frontRefMobile}
            className="w-[60%] h-[55vw] bg-cover bg-[url('/carddd.jpg')] overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
          >
            <div
              ref={contentRefMobile}
              className="w-[100%] h-[100%] flex flex-col justify-center items-center"
            >
              <div className="w-[65%] h-[13%] flex items-center justify-center bg-[#418ae3] card-title absolute top-[20%] left-1/2 -translate-x-1/2 z-30">
                <p className="uppercase text-[35px] font-semibold font-barlow">
                  happy birthday!
                </p>
              </div>
              <div className="w-[100%] h-[170px] flex justify-center items-center bg-green-500 card-name text-center relative overflow-visible"></div>
              <p className="text-[4.1rem] leading-[1] font-barlow uppercase absolute z-40 font-semibold ">
                {userData.name}
              </p>
            </div>
          </div>

          {/* backside */}
          <div className="absolute w-[60%] h-[55vw] bg-cover bg-[url('/carddd.jpg')] z-5 flex items-center flex-col overflow-hidden">
            <p className="font-barlow text-[4.5rem] leading-[1.15] font-semibold uppercase text-[#020817]">
              Blow!
            </p>
            <p className="font-barlow text-[20px] font-semibold uppercase text-[#020817]">
              (for a suprise)
            </p>
            {callGraffiti && (
              <div className="absolute z-[50] bottom-full h-full w-full items-center justify-center flex text-center px-5">
                <p className="italic text-xl font-normal font-geistSans transition-opacity ease-in duration-100">
                  {userData.message}
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
                className="w-[100%] h-[86%]"
              />

              {/* candles */}
              <div className="absolute bottom-[65%] flex items-center rounded-b-[80%] rounded-t-[80%] w-[87%] px-1 h-[20%]">
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[80%] mb-8"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[4%] mb-8 z-10"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[11%] mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[18%] mb-1"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[31%] mb-6"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[25%] mb-3 z-10"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[37%] -mb-2"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[44%] mb-0"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[55%] mb-7"
                />
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
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[75%] mb-1"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[85%] mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[92%] mb-9"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* card for Tablets(Medium Screens, width-768<) */}
      {showCard && (
        <div
          className="relative w-full h-full hidden sm:hidden lg:hidden xl:hidden 2xl:hidden md:flex flex-col items-center justify-center cursor-pointer"
          ref={containerRefMobile}
          onClick={handleClick}
        >
          {/* frontside */}
          <div
            ref={frontRefMobile}
            className="w-[55%] h-[55vw] bg-cover bg-[url('/carddd.jpg')] overflow-hidden text-center flex items-center justify-center absolute z-[15] will-change-transform card"
          >
            <div
              ref={contentRefMobile}
              className="w-[100%] h-[100%] flex flex-col justify-center items-center"
            >
              <div className="w-[53%] h-[10%] flex items-center justify-center bg-[#418ae3] card-title absolute top-[25%] left-1/2 -translate-x-1/2 z-30">
                <p className="uppercase text-[4vw] font-semibold font-barlow">
                  happy birthday!
                </p>
              </div>
              <div className="w-[100%] h-[25%] flex justify-center items-center bg-green-500 card-name text-center"></div>
              <p className="text-[8vw] leading-[1] font-barlow uppercase absolute z-40 font-semibold w-[90%]">
                {userData.name}
              </p>
            </div>
          </div>
          {/* backside */}
          <div className="absolute w-[55%] h-[55vw] bg-cover bg-[url('/carddd.jpg')] z-5 flex items-center flex-col">
            <p className="pt-10 font-barlow text-[7vw] leading-[1.15] font-semibold uppercase text-[#020817]">
              Blow!
            </p>
            <p className="font-barlow text-[2vw] font-semibold uppercase text-[#020817]">
              (for a suprise)
            </p>
            {callGraffiti && (
              <div className="absolute z-[60] bottom-full h-full w-full items-center justify-center flex text-center px-5">
                <p className="italic text-xl font-normal font-geistSans transition-opacity ease-in duration-100">
                  {userData.message}
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
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[80%] mb-8"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[4%] mb-8 z-10"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[11%] mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[18%] mb-1"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[31%] mb-6"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[25%] mb-3 z-10"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[37%] -mb-2"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[44%] mb-0"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[55%] mb-7"
                />
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
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[75%] mb-1"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[85%] mb-5"
                />
                <Candle
                  isExtinguished={isExtinguished}
                  className="ml-[92%] mb-9"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Graffiti */}
      {callGraffiti && <Graffiti />}

      {/* mic allow permission dialouge */}
      {!showCard && (
        <div className="w-full h-screen z-50 bg-[#f1eee06d] flex flex-col items-center justify-center relative gap-10">
          <button
            onClick={handleBlowCandle}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold"
          >
            Allow Microphone!
          </button>
          <p className="font-lexend mb-20">
            First allow the mic to move further
          </p>
        </div>
      )}
      <div className="absolute lg:bottom-0 md:bottom-0 -bottom-48 text-center h-10 w-full font-lexend text-xs">
        Made with 💗 by Aayush
      </div>
    </div>
  );
}
