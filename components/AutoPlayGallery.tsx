import { type } from "node:os";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import SwipeableViews from "react-swipeable-views";
import BagIcon from "../public/icons/BagIcon";
import { autoPlay } from "react-swipeable-views-utils";

type AutoPropsType = { index: number; setIndex: any };

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const styles = {
  root: {
    position: "relative",
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff",
  },
  slide1: {
    backgroundColor: "#FEA900",
  },
  slide2: {
    backgroundColor: "#B3DC4A",
  },
  slide3: {
    backgroundColor: "#6AC0FF",
  },
};

export default function Auto(props: AutoPropsType) {
  const [index, setIndex] = useState(0);
  const autoPlayArray = [
    {
      bg: "bg-[url('../public/TestImages/A8.jpg')] bg-bottom",
      button: "Formal Casual",
    },

    {
      bg: "bg-[url('../public/TestImages/WWWW.jpg')] bg-bottom",
      button: "TShirts",
    },
    {
      bg: "bg-[url('../public/TestImages/A10.jpg')] bg-bottom",
      button: "Varsity",
      blue: true,
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-end w-full ">
      <AutoPlaySwipeableViews
        index={index}
        onChangeIndex={(index) => {
          setIndex((prev) => {
            return index;
          });
        }}
        interval={3000}
        enableMouseEvents={true}
        className="w-full"
      >
        {autoPlayArray.map((item) => {
          return (
            <div
              key={item.bg}
              className={`h-screen flex-col items-center ${item.bg} justify-center flex  w-full object-none bg-cover`}
            >
              <button className="absolute w-32 h-14 text-white flex flex-col items-center justify-center bg-black p-2 font-Inter border-red-500 border text-[10px]">
                Shop {item.button} {BagIcon("fill-red-500", "20", "20")}
              </button>
            </div>
          );
        })}
      </AutoPlaySwipeableViews>
      <div className="flex space-x-8 absolute bottom-4 ">
        {autoPlayArray.map((item, indexA) => {
          return (
            <button
              key={indexA}
              onClick={() => {
                setIndex(indexA);
              }}
              className={`h-[13px] rounded-full border-gray-800 border ${
                indexA === index ? "bg-red-500 w-8" : "bg-black w-4"
              } duration-300`}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
