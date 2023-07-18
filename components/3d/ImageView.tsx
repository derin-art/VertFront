import { motion } from "framer-motion";
import Image from "next/image";
import A8 from "../../public/TestImages/A8.jpg";

export default function ImageView() {
  const Mmm = () => {
    return (
      <svg
        viewBox="0 0 100 100"
        className="w"
        filter="blur(40px)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M79.5,63.5Q65,77,45.5,84.5Q26,92,15,71Q4,50,16,31Q28,12,51,10Q74,8,84,29Q94,50,79.5,63.5Z"
          stroke="none"
          height="100%"
          width="100%"
          stroke-width="0"
          fill="#47e6e4"
        ></path>
      </svg>
    );
  };

  const Mnns = () => {
    return (
      <svg
        viewBox="0 0 100 100"
        filter="blur(40px)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M72.5,61.5Q69,73,54,85Q39,97,23.5,83.5Q8,70,16.5,54Q25,38,33,25Q41,12,55,19Q69,26,72.5,38Q76,50,72.5,61.5Z"
          stroke="none"
          height="100%"
          width="100%"
          stroke-width="0"
          fill="#ec3282"
        ></path>
      </svg>
    );
  };

  const MnnsIndigo = () => {
    return (
      <svg
        viewBox="0 0 100 100"
        filter="blur(40px)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M72.5,61.5Q69,73,54,85Q39,97,23.5,83.5Q8,70,16.5,54Q25,38,33,25Q41,12,55,19Q69,26,72.5,38Q76,50,72.5,61.5Z"
          stroke="none"
          height="100%"
          width="100%"
          stroke-width="0"
          fill="rgb(79 70 229)"
        ></path>
      </svg>
    );
  };

  const MnnsAl = () => {
    return (
      <svg
        viewBox="0 0 100 100"
        filter="blur(40px)"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <path
          d="M72.5,61.5Q69,73,54,85Q39,97,23.5,83.5Q8,70,16.5,54Q25,38,33,25Q41,12,55,19Q69,26,72.5,38Q76,50,72.5,61.5Z"
          stroke="none"
          height="100%"
          width="100%"
          stroke-width="0"
          fill="#10b981"
        ></path>
      </svg>
    );
  };

  const Bl = () => {
    return (
      <svg
        viewBox="0 0 100 100"
        filter="blur(20px)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M84,66Q82,82,66,80Q50,78,35,79Q20,80,11.5,65Q3,50,14,37.5Q25,25,37.5,19Q50,13,64.5,17Q79,21,82.5,35.5Q86,50,84,66Z"
          stroke="none"
          height="100%"
          width="100%"
          stroke-width="0"
          fill="#252525"
        ></path>
      </svg>
    );
  };
  return (
    <div className="w-full relative h-screen text-9xl font-Armate flex items-center justify-center ">
      <div className="w-full h-screen flex items-center justify-center relative hidden">
        <div className="w-1/2 z-30 h-40 top-10 absolute ">{Mmm()}</div>
        <div className="w-1/2 h-40 top-10 absolute">{Mnns()}</div>
        <div className="w-1/2 h-52 z-20 top-10 absolute">{Mnns()}</div>
        <div className="w-1/3 h-24 z-40 top-32 absolute hidden ">{Bl()}</div>
        <div className="w-1/4 h-52 p-6 bg-black absolute z-40 mt-20 blur-md rounded-full"></div>

        <div className="font-Armate text-9xl text-white absolute z-50 px-14 mt-20 rounded-full ">
          tar
        </div>

        <motion.div
          style={{
            display: "inline-block",
            overflow: "hidden",
          }}
          className="absolute "
        >
          <motion.div
            initial={{ opacity: 1, x: "100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <Image src={A8.src} alt="SOme" width={200} height={200}></Image>
          </motion.div>
        </motion.div>
      </div>
      <div className="w-full h-full flex items-center justify-center relative ">
        <div className="absolute w-1/3 flex items-center justify-center left-4 ">
          <div className="absolute w-1/2 h-1/2 bg-black blur-lg z-30 rounded-full"></div>
          <div className="absolute z-40 text-white"> DO</div>
          {Mmm()}
        </div>

        <div className="absolute w-1/3 flex items-center justify-center right-10 -bottom-1/4">
          <div className="absolute w-1/2 h-1/2 bg-black blur-lg z-30 rounded-full"></div>
          <div className="absolute z-40 text-white"> In?</div>
          {Mnns()}
        </div>
        <div className="absolute w-1/3 flex items-center justify-center right-1/4 top-0">
          <div className="absolute w-1/2 h-1/2 bg-black blur-lg z-30 rounded-full"></div>
          <div className="absolute z-40 text-white"> Faith</div>
          {MnnsIndigo()}
        </div>
        <div className="absolute w-1/3 flex items-center justify-center -bottom-1/3">
          <div className="absolute w-1/2 h-1/2 bg-black blur-lg z-30 rounded-full"></div>
          <div className="absolute z-40 text-white">You</div>
          {MnnsAl()}
        </div>
      </div>
      <div className="flex flex-col relative font-Armate  w-full justify-start hidden">
        {["Do", "You", "Have", "Faith", "In"].map((item) => {
          return (
            <div
              className={`z-40  ${
                item === "Faith" ? "text-black ml-20 mt-4" : ""
              } ${item === "You" ? "text-white opacity-25  ml-24 mt-6" : ""}`}
              key={item}
            >
              {item}
              <div
                className={` ${
                  item === "Have" ? "hidden" : "hidden"
                } w-full h-full absolute z-0`}
              >
                <div className="w-2/4 h-3/4 border bg-black absolute rounded-full blur-lg z-20"></div>
                {MnnsAl()}
              </div>
            </div>
          );
        })}
        <div className="w-screen h-1/2 absolute flex items-center justify-center  z-0 mt-10 -ml-4">
          <div className="w-3/4 h-3/6 border bg-black absolute rounded-full blur-lg z-20"></div>
          <div className="w-full h-full absolute z-0 mb-20">{Mnns()}</div>
        </div>
      </div>
    </div>
  );
}
