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
    const timeline = gsap.timeline();

    const containerBounds = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    const offsetX = (windowWidth - 1100) / 2;

    timeline.to(frontRef.current, {
      rotationY: -180,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power3.inOut",
    });

    timeline.to(
      containerRef.current,
      {
        width: "900px",
        x: offsetX,
        duration: 0.5,
        ease: "expo.inOut",
      },
      "<"
    );

    timeline.to(
      contentRef.current,
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

        console.log("RMS Volume:", rms);

        if (rms > 50 && !isExtinguished) {
          // Check if already extinguished
          if (!extinguishTimeout) {
            extinguishTimeout = setTimeout(() => {
              setIsExtinguished(true);
              console.log("Candle extinguished!");
              setCallGraffiti(true);
              stream.getTracks().forEach((track) => track.stop());
            }, 300); // Debounce duration
          }
        } else if (rms <= 50) {
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

  if (!userData) return null;

  return (
    <div className="w-full h-screen flex flex-col items-center relative justify-center bg-[#F1EEE0]">
      {showCard && (
        <div
          className="relative w-[450px] h-[500px] flex items-center justify-center cursor-pointer"
          ref={containerRef}
          onClick={handleClick}
        >
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
          <div className="w-[1px] h-[95%] bg-[#9F8A6B] relative z-40 mr-[450px] shadow-[rgba(0,0,0,0.61)_-42px_0px_114px_-40px]"></div>
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
              <Image
                src="/cakeBlow.png"
                width={370}
                height={370}
                alt="Picture of the author"
              />
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
      {callGraffiti && <Graffiti />}
      {!showCard && (
        <div className="w-full h-screen z-50 bg-[#f1eee06d] flex flex-col items-center justify-center relative">
          <p className="-mt-40 font-lexend mb-20">
            First allow the mic to move further
          </p>
          <button
            onClick={handleBlowCandle}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold"
          >
            Allow Microphone!
          </button>
        </div>
      )}
    </div>
  );
}
