"use client";

import React, { useState } from "react";
import {
  UserIcon,
  CalendarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import gift from "../public/gift.png";
import cake2 from "../public/cake.png";
import balloon from "../public/balloon.png";
import animal2 from "../public/animal.png";
import Envelope from "./Component/Envelope";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  const [displayCard, setDisplayCard] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showWaitMsg, setShowWaitMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowWaitMsg(true);
    if (!name || !age || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, message }),
    });

    const result = await response.json();
    if (result.id) {
      setGeneratedLink(`${window.location.origin}/user/${result.id}`);
      setDisplayCard(true);
    }

    console.log(name, age, message);
    setAge("");
    setMessage("");
    setName("");
  };

  return (
    <div className="flex lg:flex-row flex-col w-full min-h-screen items-center text-center">
      <Image
        src={gift}
        width={180}
        height={180}
        className="w-[7rem] absolute right-6 top-[21rem] rotate-12 z-0"
        alt=""
      />
      <Image
        src={cake2}
        width={180}
        height={180}
        className="w-[8rem] absolute left-7 hidden bottom-0 rotate-12 z-0"
        alt=""
      />
      <Image
        src={balloon}
        width={180}
        height={180}
        className="w-[7rem] absolute left-3 top-28 opacity-90 -rotate-12 z-0"
        alt=""
      />
      <Image
        src={animal2}
        width={180}
        height={180}
        className="absolute right-5 bottom-1 hidden opacity-90 -rotate-12 z-0"
        alt=""
      />
      {!displayCard && (
        <div className="flex flex-col items-center gap-28 min-h-screen pb-0">
          <div className="flex relative w-full pt-12 text-center flex-col items-center">
            <div className="bg-[#E7B251] w-[65%] h-[5rem] absolute rotate-[8deg] top-[68px]  skewed-div2"></div>

            <div className="bg-[#E3645A] w-[65%] absolute top-[10rem] h-[6rem] skew-y-2 -skew-x-12 transform skewed-div"></div>

            <div className="bg-[#619FEB] w-[50%] absolute h-[6rem] top-[16rem] -rotate-[7deg] z-[5]"></div>
            <p className="uppercase text-[5.1rem] text-[#020817] w-[90%] leading-tight font-barlow font-semibold z-[6] tracking-tight">
              create a<br />
              birthday
              <br />
              card!
            </p>
          </div>
          <div className="w-[85%] bg-white shadow-lg h-fit px-[1rem] pt-7 pb-4 flex flex-col gap-4 font-lexend mt-[rem] z-10 mb-10">
            <p className="font-lexend font-normal text-sm">
              Enter the birthday person's name, age, and a custom message that
              will appear after they blow out their candles.
            </p>
            <form
              className="flex flex-col gap-4 text-start"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-normal text-[1rem]">
                  Name
                </label>
                <div className="flex w-full border-2 px-2 py-2 gap-3 font-normal">
                  <UserIcon className="size-6 stroke-2" />
                  <input
                    type="text"
                    className="outline-none"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="age" className="font-normal text-[1rem]">
                  Age
                </label>
                <div className="flex w-full border-2 px-2 py-2 gap-3 font-normal">
                  <CalendarIcon className="size-6 stroke-2" />
                  <input
                    type="number"
                    className="outline-none w-full"
                    id="age"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="msg" className="font-normal text-[1rem]">
                  Message
                </label>
                <div className="flex w-full border-2 px-2 py-2 gap-3 font-normal">
                  <ChatBubbleOvalLeftEllipsisIcon className="size-6 stroke-2" />
                  <input
                    type="text"
                    className="outline-none"
                    id="msg"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className="h-[4.5rem] relative flex flex-col gap-0">
                <button
                  className="w-full bg-[#A855F7] text-white uppercase py-2 text-xl border-b-4 active:border-none border-[#643392] active:mt-1"
                  type="submit"
                >
                  Create
                </button>
                {showWaitMsg && (
                  <div className="flex flex-row h-8 w-full justify-center items-center">
                    {/* <p className="text-xs text-red-600 bottom-0">
                      Please wait!
                    </p> */}
                    <div className="relative">
                      <DotLottieReact
                        src="https://lottie.host/5a269627-0014-4d61-b508-06f1ea663f7d/yCKtYlLyee.lottie"
                        loop={true}
                        autoplay={true}
                        style={{
                          width: "140px",
                          height: "70px",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {displayCard && <Envelope link={generatedLink} />}
      <div className="h-10 w-full font-lexend text-xs ">
        Made with 💗 by Aayush
      </div>
    </div>
  );
}
