import { motion } from "framer-motion";

export default function Mheader() {
  const Links = ["home", "collection"];
  return (
    <div className="w-full font-Poppins text-xs fixed flex items-center z-50 bg-AltBlack text-white border-y border-white">
      <div className="">
        {Links.map((item, index) => {
          return (
            <motion.button
              initial={{
                opacity: 0,
                skewX: "20deg",
              }}
              whileInView={{
                opacity: 1,
                skewX: "0deg",
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              key={item}
              className={`mr-8 border-black h-full ${
                index === 0 ? "border-r" : "border-x"
              }  p-6`}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
      <div className=" font-SecFont flex items-center justify-center absolute right-4 border-black text-4xl line-through border-l h-full">
        <motion.p
          initial={{
            opacity: 0,
            skewX: "20deg",
          }}
          whileInView={{
            opacity: 1,
            skewX: "0deg",
          }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="pl-2"
        >
          {" "}
          Vert
        </motion.p>
      </div>
    </div>
  );
}
