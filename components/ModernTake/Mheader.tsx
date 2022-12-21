import { motion } from "framer-motion";
import { useState } from "react";
import CartIcon from "../../public/icons/cartIcon";
import { useRouter } from "next/router";
import useFramerAnimation from "../../hooks/useFramerAnimation";
import { useAppSelector } from "../../hooks/useDispatch";
import { changeCollectionBool } from "../../Features/collectionAnimSlice";
import LoginUser from "../../public/icons/loginUser";
import LoginImg from "../../public/TestImages/LoginImg.jpg";
import NotLoginUser from "../../public/icons/notLoginUser";
import Link from "next/link";

export default function Mheader() {
  const router = useRouter();
  const [newUser, setNewUser] = useState(false);
  const { ITEM } = router.query;
  const Links = ["home", "items"];
  const otherLinks = ["SHIRTS", "JACKETS", "T-SHIRTS"];
  const [openLogin, setOpenLogin] = useState(false);
  const collectionBool = useAppSelector((state) => state.collection.value);
  const cartVal = useAppSelector((state) => state.cart.value);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const dataForLogin = [{ name: "Email" }, { name: "Password" }];
  const dataForNewUser = [
    { name: "Name" },
    { name: "Email" },
    { name: "Password" },
    { name: "Verify Password" },
  ];
  console.log(collectionOpen);
  let isOnRisque = router.asPath === "/Risque";
  const isOnOtherCollection =
    router.asPath === "/Casual" || router.asPath === "/Formal";
  return (
    <div className="">
      <div
        className={`w-full font-Poppins text-xs fixed p-6 pl-2 md:p-0 flex duration-300 items-center ${
          collectionOpen ? "z-[100]" : "z-30"
        } ${
          !isOnRisque && !collectionBool
            ? "bg-black text-white"
            : isOnOtherCollection
            ? "bg-black text-white"
            : "text-black"
        }   ${isOnRisque && "text-red-500"}`}
      >
        <div className="flex ">
          {Links.map((item, index) => {
            if (item === "items") {
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
                  onClick={() => {
                    if (item === "items") {
                      setOpenLogin(false);
                      setCollectionOpen((prev) => !prev);
                    } else {
                      setOpenLogin(false);
                      setCollectionOpen(false);
                    }
                  }}
                  className={`md:mr-8  h-full z-50 md:p-6    hover:text-red-500 duration-300`}
                >
                  {item === "items" ? (
                    item
                  ) : (
                    <Link className="border " href={"/"}>
                      {item}
                    </Link>
                  )}
                </motion.button>
              );
            } else {
              return (
                <motion.div
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
                  onClick={() => {
                    if (item === "items") {
                      setCollectionOpen((prev) => !prev);
                    } else {
                      setCollectionOpen(false);
                    }
                  }}
                  className={`md:mr-8 h-full z-50  md:p-6 hover:text-red-500 duration-300`}
                >
                  {item === "items" ? (
                    item
                  ) : (
                    <Link className=" p-6 " href={"/"}>
                      {item}
                    </Link>
                  )}
                </motion.div>
              );
            }
          })}
        </div>
        <div className=" font-SecFont flex items-center justify-center absolute right-4 border-black md:text-4xl text-xl line-through h-full">
          <button
            onClick={() => {
              setCollectionOpen(false);
              setOpenLogin((prev) => !prev);
            }}
            className="relative mr-6 "
          >
            {NotLoginUser("fill-red-500", "20", "20")}
          </button>{" "}
          <div className="relative mr-6 ">
            <span className="absolute font-Oswald text-sm -right-2 -top-2 h-4 w-4  flex items-center justify-center rounded-full">
              {cartVal.itemsNo}
            </span>
            {CartIcon("fill-red-500", "20", "20")}
          </div>{" "}
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
            className="pl-2 z-50"
          >
            {ITEM ? <span className="text-red-500">{ITEM}</span> : ""} Vert
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={collectionOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.56 }}
        className={`w-full h-screen fixed top-0 bg-transparent  backdrop-blur-sm ${
          collectionOpen ? "z-40" : "z-[0]"
        }`}
      >
        {useFramerAnimation(
          <div className="absolute h-screen  w-full top-8 flex z-40 flex-col items-center  ">
            <div className="mt-20 text-center ">
              {otherLinks.map((item, index) => {
                return (
                  <motion.div
                    initial={{ x: -400 }}
                    animate={{ x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15,
                    }}
                    key={item}
                    className="lg:text-7xl xl:text-8xl text-3xl text-red-500 blur-none font-Berk  border-black w-screen mb-8 "
                  >
                    <Link
                      onClick={() => {
                        setCollectionOpen((prev) => !prev);
                      }}
                      href={`/items/${item}`}
                    >
                      {item}!
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>,
          collectionOpen
        )}
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={openLogin ? { opacity: 1, y: 0 } : { opacity: 0, y: -400 }}
        transition={{ duration: 0.56 }}
        className={`w-full h-screen fixed top-16 bg-transparent  backdrop-blur-sm ${
          openLogin ? "z-40" : "z-[0]"
        }`}
      >
        <div className="absolute h-screen  w-screen top-0 flex z-40 flex-col items-center justify-center ">
          <div className="-mt-10 crossBackGround shadow-md w-4/5 h-4/5 md:w-2/5 md:h-3/5 bg-white rounded-3xl flex flex-col items-center justify-center border  blur-none">
            <div className="absolute text-red-500 font-Oswald top-10">Vert</div>
            {newUser ? (
              <div className="flex flex-col items-center justify-center">
                {dataForLogin.map((loginDetails) => {
                  return (
                    <input
                      key={loginDetails.name}
                      placeholder={loginDetails.name}
                      className="p-2  border-b border-red-500 mb-2 font-Poppins"
                    ></input>
                  );
                })}
                <button className="mt-4 border border-black p-2 font-Poppins text-sm">
                  Login
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {dataForNewUser.map((loginDetails) => {
                  return (
                    <input
                      key={loginDetails.name}
                      placeholder={loginDetails.name}
                      className="p-2  border-b border-red-500 mb-2 font-Poppins"
                    ></input>
                  );
                })}
                <button className="mt-4 border border-black p-2 font-Poppins text-sm">
                  Create Account
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setNewUser((prev) => !prev);
              }}
              className="mt-4 text-xs font-Poppins"
            >
              {newUser ? "New User?" : "I'm familiar with your game."}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
