import Image from "next/image";
import Var from "../../public/TestImages/VAR2.png";

export default function Varsity() {
  const allText = [{ text: "V" }, { text: "FOR" }, { text: "VARSITY" }];
  return (
    <div className="h-screen flex snapChild items-center justify-center">
      <button className="absolute mt-48 font-Grad">
        Explore our Varsity Offering
      </button>
      <div className="absolute text-9xl font-SecFont">V FOR VARSITY</div>
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
