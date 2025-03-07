"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Graffiti from "@/app/Component/Graffiti";
import Loader from "../../Component/Loader";
import Card4Tablet from "@/app/Component/Card4Tablet";
import CardXLScreens from "@/app/Component/CardXLScreens";
import CardLgScreens from "@/app/Component/CardLgScreens";
import Card4Mobiles from "@/app/Component/Card4Mobiles";
import Link from "next/link";

export default function UserPage({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [callGraffiti, setCallGraffiti] = useState(false);
  const router = useRouter();

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
    <>
      <div className="w-full h-screen flex flex-col items-center relative bg-[#F1EEE0]">
        {/* card for xl(width-1024>) screens ✅ */}
        {showCard && (
          <CardXLScreens
            name={userData.name}
            message={userData.message}
            isExtinguished={isExtinguished}
            callGraffiti={callGraffiti}
          />
        )}

        {/* card for Laptops(14inch) ✅ */}
        {showCard && (
          <CardLgScreens
            name={userData.name}
            message={userData.message}
            isExtinguished={isExtinguished}
            callGraffiti={callGraffiti}
          />
        )}

        {/* card for mobile(width-640px<) screens ✅ */}
        {showCard && (
          <Card4Mobiles
            name={userData.name}
            message={userData.message}
            isExtinguished={isExtinguished}
            callGraffiti={callGraffiti}
          />
        )}

        {/* card for Tablets(Medium Screens, width-768<) ✅ */}
        {showCard && (
          <Card4Tablet
            name={userData.name}
            message={userData.message}
            isExtinguished={isExtinguished}
            callGraffiti={callGraffiti}
          />
        )}

        {/* Graffiti */}
        {callGraffiti && <Graffiti />}

        {/* mic allow permission dialouge */}
        {!showCard && (
          <div className="w-full md:h-full h-[90vh] z-50 bg-[#f1eee06d] flex flex-col items-center justify-center relative md:gap-10 gap-8">
            <button
              onClick={handleBlowCandle}
              className="mt-6 md:px-4 md:py-2 px-2 py-2 text-xs bg-blue-500 text-white rounded font-semibold"
            >
              Allow Microphone!
            </button>
            <p className="font-lexend md:text-lg text-xs mb-20">
              First allow the mic to move further
            </p>
          </div>
        )}
      </div>
      <div className="absolute flex flex-col gap-1 pb-1 lg:bottom-0 md:bottom-0 -bottom-32 text-center h-14 justify-end w-full font-lexend text-[.5rem] lg:text-[.7rem] z-50">
        <p className="text-[10px]">
          Create you own{" "}
          <Link
            href={"https://bdaycard-delta.vercel.app/"}
            className="text-purple-700 italic"
          >
            Click
          </Link>
        </p>
        <p className="text-[10px] z-50">Made with 💗 by Aayush</p>
      </div>
    </>
  );
}
