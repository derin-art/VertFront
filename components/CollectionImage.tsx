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
          className={`absolute text-4xl hidden sm: ${
            vertical ? "top-8" : " top-8 "
          } -right-2 font-SecFont duration-300 ${
            props.other ? "text-red-500" : "text-PineGreen"
          }`}
        >
          {version}
        </div>
      );
    } else if (version === "Casual") {
      return (
        <div
          className={`absolute text-5xl hidden sm:  ${
            vertical ? "left-[45px] bottom-10" : "left-24 bottom-10"
          } font-Poppins tracking-[20px] text-white`}
        >
          {version}
        </div>
      );
    } else if (version === "Risque") {
      return (
        <div
          className={`absolute text-3xl hidden sm:   ${
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
      className={`relative flex flex-col items-center jusify-center group ${
        vertical ? "lg:m-8 m-2" : "p-2"
      } ${
        props.version === "Jewerly" && "hidden"
      } hover:scale-105 duration-300 z-50`}
    >
      <div className="absolute -bottom-10 md:hidden text-red-500 z-50 font-SecFont md:text-2xl">
        {props.version === "Risque" ? "NightLife" : props.version}
      </div>
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
          width={300}
          height={400}
          unoptimized={true}
          className={` object-cover  ${
            vertical
              ? "lg:h-[397px] lg:w-[300px] md:h-[267px] md:w-[200px] h-[200px] w-[147px] shadow-lg"
              : "h-[200px] w-[200px]"
          }  ${!props.other ? "border-white" : "border-black border"} ${
            props.version === "Formal" ? "border" : "border"
          } `}
          alt="Collection Image"
          src={props.img.src}
        ></Image>
      </div>
      <div className="h-1/4 w-full absolute bg-red-500 font-Poppins hidden md:block bottom-0 flex flex-col text-black text-xs text-right p-2">
        trademark ®VERT 2017
        <div>styled by giancoo caldi</div>
        <div>model: alex corr</div>
        <div className="absolute left-2 text-black z-50 top-1 lg:top-2 font-SecFont md:text-base lg:text-2xl">
          {props.version === "Risque" ? "NightLife" : props.version}
        </div>
      </div>
    </div>
  );
}
