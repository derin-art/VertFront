import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import Star from "../../public/icons/star";
import { addToCart, removeFromCart } from "../../Features/cartSlice";
import { setOpenLoginRedux } from "../../Features/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { login, addToMongoDataWishlist } from "../../Features/authSlice";
import { ifErrorUpdate, notify, update } from "../../hooks/useToastPopup";

type ProductProps = {
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
  };
};

export default function Product(props: ProductProps) {
  const dispatch = useAppDispatch();
  const toastId: any = useRef(null);
  const userMongoDataRedux = useAppSelector(
    (state) => state.user.value.mongoData
  );

  const userLoginState = useAppSelector((state) => state.user.value);
  const loginMenuReduxState = useAppSelector(
    (state) => state.user.value.openLoginRedux
  );
  const loggedIn: boolean = userLoginState.email && userLoginState.uid;

  const removeFromWishlist = async () => {
    notify(toastId, "Removing from Wishlist");
    const data = await axios
      .put(
        `https://${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/api/customerChanges?email=${userLoginState.email}&Remove=${true}`,
        { item: props.data }
      )
      .catch((err) => {
        console.log(err);
        ifErrorUpdate(toastId, "An error occured, please check your internet");
      });
    if (data) {
      dispatch(addToMongoDataWishlist(data.data));
      update(toastId, "Operation Successful");
    }
  };

  const isInMongoData = useAppSelector((state) => state.user.value.mongoData)
    ? userMongoDataRedux.WishList.find(
        (item: any) => item._id === props.data._id
      )
    : false;

  const cartButtons = [
    {
      name: "Add to Cart",
      sign: "+",
      func: () => dispatch(addToCart(props.data)),
    },
    {
      name: "Remove from Cart",
      sign: "-",
      func: () => dispatch(removeFromCart(props.data._id)),
    },
  ];

  const addToWishList = async () => {
    if (!loggedIn) {
      dispatch(setOpenLoginRedux());
      return;
    }
    notify(toastId, "Adding to WishList");

    try {
      if (!loggedIn && !userLoginState.mongoData) {
        const userMongoData: any = await axios
          .get(
            `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?email=${userLoginState.email}`
          )
          .catch((err) => {
            console.log(err);
            return;
          });
        if (userMongoData) {
          dispatch(
            login({
              mongoData: userMongoData.data,
            })
          );
          if (
            userMongoData.WishList.find(
              (item: any) => item._id === props.data._id
            )
          ) {
            ifErrorUpdate(toastId, "Item already Wishlisted");
            return;
          }
        }
      }
      if (
        userMongoDataRedux.WishList.find(
          (item: any) => item._id === props.data._id
        )
      ) {
        ifErrorUpdate(toastId, "Item already Wishlisted");
        return;
      }
      const data = await axios.put(
        `https://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?email=${userLoginState.email}`,
        { item: props.data }
      );

      if (data) {
        dispatch(addToMongoDataWishlist(data.data));
        update(toastId, "Wishlisted Successfully");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 433) {
          ifErrorUpdate(toastId, "Item already Wishlisted");
          return;
        }
      }
      console.log(err);
      ifErrorUpdate(toastId, "An error occurred, please check your internet");
    }
  };

  return (
    <div className="w-screen h-screen  flex items-center justify-center z-30 bg-white text-black overflow-y-hidden">
      <div className="w-4/5 h-4/5  flex md:flex-row flex-col items-center justify-center">
        <div className="relative -mt-8 md:mt-0">
          {isInMongoData && (
            <div className="absolute left-2 top-1">
              {" "}
              {Star("20", "20", "fill-red-500")}
            </div>
          )}

          <Image
            className="md:h-[450px] md:w-[330px] h-[400px] object-cover  shadow-md "
            loading="lazy"
            alt={props.data.name}
            src={props.data.urls[0].imgUrl}
            height={450}
            width={330}
            unoptimized={true}
          ></Image>
        </div>

        <div className="h-1/6 w-full text-black bg-white border-t border-x absolute bottom-0 rounded-t-[60px] md:hidden ">
          <div>
            <div className="mt-2 flex flex-col items-center justify-center">
              <div className="flex justify-around w-full mb-2">
                <button
                  onClick={() => {
                    dispatch(addToCart(props.data));
                  }}
                  className="text-xl"
                >
                  +
                </button>
                <button
                  onClick={async () => {
                    if (isInMongoData) {
                      removeFromWishlist();
                      return;
                    } else {
                      addToWishList();
                    }
                  }}
                  className="font-Oswald text-red-500"
                >
                  {isInMongoData ? "Remove From WishList" : "Add to WishList"}
                </button>
                <button
                  onClick={() => {
                    dispatch(removeFromCart(props.data._id));
                  }}
                  className="text-xl"
                >
                  -
                </button>
              </div>
              <div className="flex text-sm w-full">
                {" "}
                <p className="w-1/2 border-r flex items-center  justify-center p-2 font-Oswald flex-wrap">
                  {props.data.name}{" "}
                </p>{" "}
                <p className="w-1/2 flex items-center justify-center p-1 font-Grad text-red-500">
                  ${props.data.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/5 hidden z-30 md:flex md:h-[450px] md:w-[330px] h-[180px] w-[132px] flex-col p-2">
          <div className="font-Oswald md:text-5xl">{props.data.name}</div>
          <div className="md:text-4xl font-Grad text-red-500 mt-1">
            ${props.data.price}
          </div>
          <div className="font-Poppins mt-4">{props.data.Description}</div>
          <div className="flex  mt-4">
            {cartButtons.map((item) => {
              return (
                <button
                  onClick={() => {
                    item.func();
                  }}
                  key={item.name}
                  className="border p-2 mr-2 hover:bg-black bg-white hover:text-white duration-300 border-black z-30 font-Poppins text-xs"
                >
                  <span className="text-red-500">{item.sign}</span> {item.name}
                </button>
              );
            })}
          </div>
          <div className="mt-1">
            {isInMongoData ? (
              <div className="font-Poppins text-xs flex-col flex ">
                {" "}
                <button
                  onClick={async () => {
                    removeFromWishlist();
                  }}
                  className="mt-1 font-Poppins text-xs border p-2 border-black w-fit hover:text-white duration-300 hover:bg-black"
                >
                  Remove from WishList
                </button>
              </div>
            ) : (
              <button
                onClick={async () => {
                  addToWishList();
                }}
                className="border border-black p-2 font-Poppins hover:text-white duration-300 hover:bg-black text-xs flex items-center justify-center"
              >
                {Star("10", "10", "mr-1 fill-red-500")} Add to WishList
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const data: any = await axios
    .get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/Images`)
    .catch((err) => {
      console.log(err);
    });
  return {
    paths: data.data.map((item: any) => {
      return { params: { product: item._id } };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }: any) {
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/editItem?id=${params.product}`
    )
    .catch((err) => {
      console.log(err);
    });

  return { props: { data: data.data } };
}
