import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import firebaseApp from "../../pages/api/firebase";
import {
  update,
  ifErrorUpdate,
  notify,
  toastOptions,
} from "../../hooks/useToastPopup";
import CartIcon from "../../public/icons/cartIcon";
import { useRouter } from "next/router";
import {
  login,
  logout,
  selectUser,
  setOpenLoginRedux,
  setOpenLoginReduxSet,
} from "../../Features/authSlice";
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "../../pages/api/firebase";
import useFramerAnimation from "../../hooks/useFramerAnimation";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import NotLoginUser from "../../public/icons/notLoginUser";
import LoginUser from "../../public/icons/loginUser";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Mheader() {
  const dispatch = useAppDispatch();
  const toastId: any = useRef(null);
  const loginReduxState = useAppSelector(
    (state) => state.user.value.openLoginRedux
  );

  const router = useRouter();
  const [newUser, setNewUser] = useState(true);
  const { ITEM } = router.query;
  const Links = ["home", "items"];
  const otherLinks = ["SHIRTS", "JACKETS", "T-SHIRTS"];
  const [openLogin, setOpenLogin] = useState(false);
  const collectionBool = useAppSelector((state) => state.collection.value);
  const cartVal = useAppSelector((state) => state.cart.value.cartItems);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  console.log(
    "user",
    useAppSelector((state) => state.user.value)
  );

  const userLoginState = useAppSelector((state) => state.user.value);

  const loggedIn = userLoginState.email && userLoginState.uid;

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userMongoData: any = await axios
          .get(
            `http://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?email=${userAuth.email}`
          )
          .catch((err) => {
            console.log(err);
            return;
          });
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            mongoData: userMongoData.data,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  const dataForLogin = [{ name: "Email" }, { name: "Password" }];
  const dataForNewUser = [
    { name: "Name" },
    { name: "Email" },
    { name: "Password" },
    { name: "Verify Password" },
  ];

  const [loginDetails, setLoginDetails] = useState({ Email: "", Password: "" });

  const [signUpDetails, setSignUpDetails] = useState({
    Name: "",
    Email: "",
    Password: "",
    VerifyPassword: "",
  });

  console.log(loginDetails);

  const LoginIn = async () => {
    if (!loginDetails.Email) {
      toast.error("Email required for login", {
        ...toastOptions(),
        autoClose: 2000,
      });
      return;
    }
    if (!loginDetails.Password) {
      toast.error("Passowrd required for login", {
        ...toastOptions(),
        autoClose: 2000,
      });
      return;
    }
    notify(toastId, "Signing In");
    await signInWithEmailAndPassword(
      auth,
      loginDetails.Email,
      loginDetails.Password
    )
      // returns  an auth object after a successful authentication
      // userAuth.user contains all our user details
      .then(async (userAuth) => {
        console.log("Succesful Login");
        console.log(userAuth);
        // store the user's information in the redux state
        const userMongoData: any = await axios
          .get(
            `http://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?email=${userAuth.user.email}`
          )
          .catch((err) => {
            console.log(err);
            return;
          });
        console.log("sds", userMongoData);
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            mongoData: userMongoData.data,
          })
        );
        update(toastId, "Login Successful");
        setOpenLogin((prev) => !prev);
        setIsUserMenuOpen(false);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            ifErrorUpdate(toastId, "User Not found");
            break;
          case "auth/wrong-password":
            ifErrorUpdate(toastId, "Wrong Password");
            break;
          case "auth/invalid-email":
            ifErrorUpdate(toastId, "Invalid Email");
            break;

          default:
            ifErrorUpdate(toastId, "Bad Connection");
            break;
        }
        console.log(err);
        return;
      });
  };

  const CreateUser = async () => {
    if (!signUpDetails.Email) {
      toast.error("Email required to create user", {
        ...toastOptions(),
        autoClose: 2000,
      });
      return;
    }
    if (!signUpDetails.Password) {
      toast.error("Password required to create user", {
        ...toastOptions(),
        autoClose: 2000,
      });
      return;
    }
    if (!signUpDetails.Name) {
      toast.error("Name required to create user", {
        ...toastOptions(),
        autoClose: 2000,
      });
      return;
    }
    if (signUpDetails.Password != signUpDetails.VerifyPassword) {
      toast.error("Password does not match verify password", {
        ...toastOptions(),
        autoClose: 2000,
      });
      return;
    }
    notify(toastId, "Creating User");
    await createUserWithEmailAndPassword(
      auth,
      signUpDetails.Email,
      signUpDetails.Password
    ).then(async (userAuth) => {
      await axios
        .post(
          `http://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?name=${signUpDetails.Name}&email=${userAuth.user.email}`
        )
        .then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
            })
          );
          setOpenLogin((prev) => !prev);
          setIsUserMenuOpen(false);
          update(toastId, "User created and logged in");
        })
        .catch((err) => {
          console.log(err);
          ifErrorUpdate(
            toastId,
            "An error occured, please check your internet"
          );
          return;
        });
    });
  };

  console.log(collectionOpen);
  let isOnRisque = router.asPath === "/Risque";
  const isOnOtherCollection =
    router.asPath === "/Casual" || router.asPath === "/Formal";

  const isOnTime = router.asPath === "/Time";

  const isOn = !isOnRisque && !collectionBool;

  console.log("rr", isOnRisque, isOnTime);
  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <div
        className={`w-full font-Poppins text-xs fixed p-6 pl-2 md:p-0 flex duration-300 items-center ${
          collectionOpen || loginReduxState ? "z-[100]" : "z-30"
        }  ${
          !isOnRisque
            ? isOn && !isOnTime
              ? "bg-black text-white"
              : isOnOtherCollection
              ? "bg-black text-white"
              : "text-black"
            : "text-red-500"
        }   `}
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
          {loggedIn ? (
            <div className="flex flex-col items-center md:mr-6 mr-4">
              <button
                onClick={() => {
                  setIsUserMenuOpen((prev) => !prev);
                }}
                className="relative"
              >
                {LoginUser("fill-red-500", "20", "20")}
              </button>
              {isUserMenuOpen && (
                <div className="absolute border border-red-500 mt-8 text-xs w-20 shadow-md flex flex-col bg-white text-black">
                  <button
                    onClick={async () => {
                      return await signOut(auth).then(() => {
                        dispatch(logout());
                      });
                    }}
                    className="p-2 border-b border-red-500 hover:text-red-500 duration-300"
                  >
                    LogOut
                  </button>
                  <button className="p-2 hover:text-green-400 duration-300">
                    Your Data
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center mr-6">
              <button
                onClick={() => {
                  setCollectionOpen(false);

                  dispatch(setOpenLoginRedux());
                }}
                className="relative "
              >
                {NotLoginUser("fill-red-500", "20", "20")}
              </button>
            </div>
          )}
          <Link href={"/Cart"} className="relative md:mr-6 mr-2 ">
            <span className="absolute font-Oswald text-sm -right-2 -top-2 h-4 w-4  flex items-center justify-center rounded-full">
              {cartVal.length}
            </span>
            {CartIcon("fill-red-500", "20", "20")}
          </Link>{" "}
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
        animate={
          loginReduxState ? { opacity: 1, y: 0 } : { opacity: 0, y: -400 }
        }
        transition={{ duration: 0.56 }}
        className={`w-full h-screen fixed top-0 bg-transparent  backdrop-blur-sm ${
          loginReduxState ? "z-40" : "z-[0]"
        }`}
      >
        <div className="absolute h-screen mt-10  w-screen top-0 flex  flex-col items-center justify-center ">
          <div className="-mt-10 crossBackGround rounded-lg shadow-md w-4/5 h-4/5 lg:w-2/5 lg:h-3/5 bg-white border border-black flex flex-col items-center justify-center  blur-none">
            <div className="absolute text-red-500 font-PlayI bottom-10 text-3xl">
              Vert
            </div>
            <div className="absolute text-black font-Oswald top-4 text-lg md:text-xl flex flex-col">
              <button
                onClick={() => {
                  dispatch(setOpenLoginRedux());
                }}
                className="font-Poppins text-red-500 hover:text-red-700 duration-300"
              >
                x
              </button>
              {newUser ? "Login" : "Create a new User"}
            </div>
            {newUser ? (
              <div className="flex flex-col items-center justify-center">
                {dataForLogin.map((loginDetails) => {
                  return (
                    <input
                      key={loginDetails.name + "m"}
                      name={loginDetails.name}
                      onChange={(e) => {
                        setLoginDetails((prev) => {
                          return { ...prev, [e.target.name]: e.target.value };
                        });
                      }}
                      placeholder={loginDetails.name}
                      className="p-2  border-b border-red-500 mb-2 font-Poppins"
                    ></input>
                  );
                })}
                <button
                  onClick={() => {
                    LoginIn();
                  }}
                  className="mt-4 border border-black p-2 font-Poppins text-sm"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {dataForNewUser.map((newUserDetails) => {
                  return (
                    <input
                      key={newUserDetails.name}
                      name={newUserDetails.name}
                      onChange={(e) => {
                        setSignUpDetails((prev) => {
                          if (e.target.name === "Verify Password") {
                            return { ...prev, VerifyPassword: e.target.value };
                          }
                          return { ...prev, [e.target.name]: e.target.value };
                        });
                      }}
                      placeholder={newUserDetails.name}
                      className="p-2  border-b border-red-500 mb-2 font-Poppins"
                    ></input>
                  );
                })}
                <button
                  onClick={() => {
                    CreateUser();
                  }}
                  className="mt-4 border border-black p-2 font-Poppins text-sm"
                >
                  Create Account
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setNewUser((prev) => !prev);
              }}
              className="mt-4 text-xs font-Poppins hover:text-red-500 duration-300"
            >
              {newUser ? "New User?" : "I'm familiar with your game."}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
