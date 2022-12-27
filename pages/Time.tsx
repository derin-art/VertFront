import axios from "axios";
import ItemLinks from "../components/PagesComponents/ItemLinks";
import ScrollIntoView from "react-scroll-into-view";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type ShirtsProps = {
  allItems: {
    data: {
      CollectionDate?: any;
      _id: string;
      name: string;
      price: number;
      Description: string;
      itemCollection: string;
      DateCreated: string;
      urls: {
        imgUrl: string;
        isMain: boolean;
        cloudId: string;
        blurUrl: string;
        imgType: string;
        _id: string;
      }[];
      __v?: any;
    }[];
  };
};

export default function Time(props: ShirtsProps) {
  const finalArray = [];

  const itemDates = [
    { name: "Jan", no: 1 },
    { name: "Feb", no: 2 },
    { name: "March", no: 3 },
    { name: "April", no: 4 },
    { name: "May", no: 5 },
    { name: "June", no: 6 },
    { name: "July", no: 7 },
    { name: "Aug", no: 8 },
    { name: "Sept", no: 9 },
    { name: "Oct", no: 10 },
  ];

  const [place, setPlace] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const chunkSize = 2;
  for (let i = 0; i < props.allItems.data.length; i += chunkSize) {
    const chunk = props.allItems.data.slice(i, i + chunkSize);
    // do whatever
    finalArray.push(chunk);
  }
  console.log("sd", finalArray);

  const variants = {
    out: {
      opacity: 0,
      transition: {
        duration: 0.75,
      },
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.75,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="snap-mandatory snap-y bg-white">
      <div className="text-gray-100 "></div>
      <div className="text-gray-300 "></div>
      <div className="text-gray-400 "></div>
      <div className="text-gray-500"></div>
      <div className="text-gray-200 "></div>

      {finalArray.map((item, index) => {
        return (
          <motion.div
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.6 }}
            onViewportEnter={() => {
              console.log(index, "msd");
              setPlace(index);
            }}
            ref={ref}
            initial={{ opacity: 1 }}
            key={index}
            className={`flex items-center justify-around h-screen snap-center snap-always ${
              index === finalArray.length - 1 ? "" : "mb-12"
            }`}
          >
            {" "}
            <motion.div className="fixed   h-full pt-20  w-full flex justify-center md:hidden">
              <AnimatePresence>
                <motion.div
                  key={place}
                  variants={variants}
                  animate="in"
                  initial="out"
                  exit={"out"}
                  className="flex-col items-start font-Oswald absolute"
                >
                  {itemDates.map((item, index) => {
                    if (index === place) {
                      return <div>{item.name}</div>;
                    }
                  })}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div className="fixed md:flex flex-col text-4xl font-Oswald items-center justify-center text-black hidden ">
              {itemDates.map((item, index) => {
                const remainder = Math.abs(index - place) * 100;
                let val = 700 - remainder;

                return (
                  <motion.div
                    className={` ${
                      index === place
                        ? " text-red-500 scale-150 -skew-x-12"
                        : val > 100
                        ? `text-gray-${val}`
                        : "text-white opacity-0"
                    }  duration-500 mb-4`}
                    key={item.name}
                  >
                    {item.name}
                  </motion.div>
                );
              })}
              <div className="font-PlayI mt-4">2021</div>
            </motion.div>
            {item.map((product) => {
              return (
                <div key={product._id} className="z-20">
                  <ItemLinks key={product._id} data={product}></ItemLinks>
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query, res, asPath, pathname } = context;
  const host = req.headers.host;
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=2021`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
    console.log(data.data);
  }
  return { props: { allItems: { data: data.data } } };
}
