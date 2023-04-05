import Image from "next/image";
import Link from "next/link";
import Var from "../../public/TestImages/VAR2.png";
import useMediaQuery from "../../hooks/useMediaQuery";

import { useState } from "react";
import { type } from "os";

type VarsityProps = {
  toastId: any;
};

export default function Varsity(props: VarsityProps) {
  const allText = [{ text: "V" }, { text: "FOR" }, { text: "VARSITY" }];
  const [isMouseOverExplore, setMouseIsOverExplore] = useState(false);
  return (
    <div className="h-screen bg-white flex md:snap-center items-center justify-center border-b border-black">
      <Link
        href={"/Varsity"}
        onMouseOver={() => {
          setMouseIsOverExplore((prev) => true);
        }}
        onMouseLeave={() => {
          setMouseIsOverExplore((prev) => false);
        }}
        className="absolute mt-48 font-Berk border text-black border-black p-2 z-20"
      >
        Explore our Varsity Offering
      </Link>
      <div
        className={`absolute xl:text-9xl lg:text-7xl duration-300 text-4xl font-Grad ${
          isMouseOverExplore ? "text-red-500" : "text-black"
        }`}
      >
        V FOR VARSITY
      </div>
      <Image
        className=""
        src={Var.src}
        height={1000}
        width={320}
        unoptimized={true}
        alt="Varsity"
      ></Image>
    </div>
  );
}
