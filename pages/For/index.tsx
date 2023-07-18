import Bagel from "../../components/3d/Bagel";
import { motion } from "framer-motion";
import {
  DistortionText,
  LiquidDistortionText,
  FliesText,
  SplitColorChannelText,
} from "react-text-fun";
import Pixel from "../../components/3d/Pixel";
import Script from "next/script";
import { useEffect, useState } from "react";
import Every from "../../components/3d/Every";

var MouseSpeed = require("mouse-speed");

export default function Me() {
  const [sdsd, setsdsd] = useState(false);
  const [hover, setHover] = useState(false);
  const [roate, setRotat] = useState(0);

  const [mousespeed, setMouseSpeed] = useState(0);

  useEffect(() => {
    setsdsd(true);
  });
  var onCalcSpeed = function () {
    var speedX = speed.speedX;
    var speedY = speed.speedY;
    // do anything you want with speed values

    setMouseSpeed((prev) => {
      if (speedX > 150) {
        return speedX;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      var centerX = window.innerWidth * 0.5;
      var centerY = window.innerHeight * 0.5;
      var mouseTolerance = 0.2;
      setRotat(((e.offsetX - centerX) / centerX) * mouseTolerance);
    });
  }, []);

  /*  var speed = new MouseSpeed();
  speed.init(onCalcSpeed); */
  console.log(roate);

  return (
    <div>
      <div className="h-screen w-full font-Inter flex items-center justify-center">
        <div className="absolute text-9xl z-30 flex items-center space-x-14 border border-black">
          Suc<span className="">ked </span>
          <span
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className=" relative duration-300"
          >
            <DistortionText
              fill="black"
              fontSize={200}
              text="Into"
              speed={0.1}
              noiseVolatility={3}
              rotation={40 + Math.abs(roate * 100)}
              distortX={10}
              noiseAmplitude={0.3}
              distortY={5}
            ></DistortionText>
          </span>
          <span className="">a Ba</span>
          gel.
        </div>
        <Bagel></Bagel>
      </div>
      <div className="h-screen w-full">{sdsd && <Pixel></Pixel>}</div>
      <div className="h-screen w-full bg-white text-9xl font-Inter flex flex-col items-center justify-center">
        <div>EveryWhere</div>
        <div>EveryWhere</div>
        <div>EveryWhere</div>
        <div>EveryWhere</div>
      </div>
      <div className="w-full h-screen flex items-center justify-center relative">
        <div className="absolute font-Wagon text-7xl z-30 bottom-4 right-10 rounded-full border p-2 flex items-center justify-center text-white border-white">
          Explore
        </div>
        {typeof window !== "undefined" && <Every></Every>}
      </div>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        {/*  <FliesText
          text={"Hey"}
          fill="black"
          fontSize={100}
          cellRadius={0.5}
          cellWidth={0.012}
          speed={2}
          dodge={true}
          dodgeY={0.35}
          dodgeSpread={3.5}
        /> */}
        <SplitColorChannelText
          rotation={85.0}
          rgbOffset={2.8}
          text="Heyy"
          addBlur={false}
          addNoise={true}
        />
      </div>
      <Script src="https://unpkg.com/blotterjs-fork@0.1.0/build/blotter.min.js"></Script>
    </div>
  );
}
