import Footer from "../public/TestImages/Footer2.jpg";
import Nigth from "../public/TestImages/NightlifeNoise.jpg";
import LL1 from "../public/TestImages/LL1.jpg";
import Image from "next/image";

export default function Mans() {
  return (
    <div className="w-full  bg-red-500 relative flex flex-col items-center justify-center">
      <div className="text-white text-5xl font-Berk">Some where b</div>
      <img src={Footer.src}></img>
      <img className="w-[400px]" src={Nigth.src}></img>
      <img className="w-[400px]" src={LL1.src}></img>
    </div>
  );
}
