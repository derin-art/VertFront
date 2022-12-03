import Image from "next/image";
import { type } from "os";

type CollectionImageProps = {
  img?: any;
  width?: number;
  height?: number;
  word?: string;
  version?: string;
  other?: boolean;
};

export default function CollectionImage(props: CollectionImageProps) {
  const vertical = true;
  const header = (version?: string) => {
    if (version === "Formal") {
      return (
        <div
          className={`absolute text-4xl ${
            vertical ? "top-8" : " top-8 "
          } -right-2 font-SecFont duration-300 ${
            props.other ? "text-red-500" : "text-gray-600"
          }`}
        >
          {version}
        </div>
      );
    } else if (version === "Casual") {
      return (
        <div
          className={`absolute text-5xl   ${
            vertical ? "left-[45px] bottom-10" : "left-24 bottom-10"
          } font-Poppins tracking-[20px] text-white`}
        >
          {version}
        </div>
      );
    } else if (version === "Risque") {
      return (
        <div
          className={`absolute text-3xl   ${
            vertical ? "left-[116px] top-8" : "left-24 top-8"
          } font-PlayI text-red-500`}
        >
          {"NightLife"}
        </div>
      );
    } else if (version === "Jewerly") {
      return (
        <div
          className={`absolute text-3xl  bottom-8 right-[84px] font-IMFELL ${
            props.other ? "text-black" : "text-white"
          }`}
        >
          {version}
        </div>
      );
    }
  };

  return (
    <div
      className={`relative ${vertical ? "p-8" : "p-2"} ${
        props.version === "Jewerly" && "hidden"
      } hover:scale-105 duration-300 z-50`}
    >
      <div className="">
        {header(props.version)}
        <div
          className={`${
            props.version === "Jewerly" ? "block" : "hidden"
          }  absolute top-8 ${
            props.other ? "text-black" : "text-white"
          } font-IMFELL text-3xl right-28 duration-300`}
        >
          Vert
        </div>
        <Image
          width={200}
          height={200}
          unoptimized={true}
          className={`${
            props.version === "Jewerly" && "rotate-90"
          } object-cover ${
            vertical ? "h-[400px] w-[300px]" : "h-[200px] w-[200px]"
          } border-y-2 ${
            !props.other ? "border-white" : "border-black border"
          } ${props.version === "Formal" ? "border-x-2" : "border-x-2"}`}
          alt="Collection Image"
          src={props.img.src}
        ></Image>
      </div>
    </div>
  );
}
