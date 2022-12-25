import axios, { AxiosError } from "axios";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import Star from "../../public/icons/star";
import CartIcon from "../../public/icons/cartIcon";
import {
  increment,
  decrement,
  addToCart,
  removeFromCart,
} from "../../Features/cartSlice";
import {
  setOpenLoginRedux,
  setOpenLoginReduxSet,
} from "../../Features/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { login, addToMongoDataWishlist } from "../../Features/authSlice";
import { ifErrorUpdate, notify, update } from "../../hooks/useToastPopup";
import { async } from "@firebase/util";

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
  console.log(useAppSelector((state) => state.cart.value));

  const userLoginState = useAppSelector((state) => state.user.value);
  const loginMenuReduxState = useAppSelector(
    (state) => state.user.value.openLoginRedux
  );
  const loggedIn: boolean = userLoginState.email && userLoginState.uid;

  console.log(
    "sd",
    useAppSelector((state) => state.user.value)
  );

  const removeFromWishlist = async () => {
    const data = await axios
      .put(
        `http://${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/api/customerChanges?email=${userLoginState.email}&Remove=${true}`,
        { item: props.data }
      )
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      dispatch(addToMongoDataWishlist(data.data));
    }
  };

  const isInMongoData = useAppSelector((state) => state.user.value.mongoData)
    ? userMongoDataRedux.WishList.find(
        (item: any) => item._id === props.data._id
      )
    : false;

  console.log("sdd", isInMongoData);

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
            `http://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?email=${userLoginState.email}`
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
        `http://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/customerChanges?email=${userLoginState.email}`,
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
    <div className="w-screen h-screen flex items-center justify-center z-30">
      <div className="w-4/5 h-4/5  flex md:flex-row flex-col items-center justify-center">
        <div className="relative -mt-8 md:mt-0">
          {isInMongoData && (
            <div className="absolute left-2 top-1">
              {" "}
              {Star("20", "20", "fill-red-500")}
            </div>
          )}

          <LazyLoadImage
            className="md:h-[450px] md:w-[330px] h-[400px] object-cover  shadow-md "
            loading="lazy"
            alt={props.data.name}
            src={props.data.urls[0].imgUrl}
            placeholderSrc={props.data.urls[0].blurUrl}
          ></LazyLoadImage>
        </div>

        <div className="h-2/4 w-full text-black bg-white border absolute -bottom-1/3 rounded-t-[60px] md:hidden">
          <div>
            <div className="mt-2 flex flex-col items-center justify-center">
              <div className="flex justify-around w-full mb-2">
                <button className="text-xl">+</button>
                <button>{Star("24", "24", "fill-red-500")}</button>
                <button className="text-xl">-</button>
              </div>
              <div className="flex text-sm w-full">
                {" "}
                <p className="w-1/2 border-r flex items-center  justify-center p-1 font-Oswald flex-wrap">
                  {props.data.name}{" "}
                </p>{" "}
                <p className="w-1/2 flex items-center justify-center p-1 font-PlayI text-red-500">
                  ${props.data.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/5 hidden z-30 md:flex md:h-[450px] md:w-[330px] h-[180px] w-[132px] flex-col p-2">
          <div className="font-Oswald md:text-5xl">{props.data.name}</div>
          <div className="md:text-4xl font-Grad text-red-500">
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

export async function getServerSideProps(context: any) {
  const { req, query, res, asPath, pathname } = context;
  const id = query.product;

  const data: any = await axios
    .get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/editItem?id=${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (data) {
    console.log(data.data);
  }
  return { props: { data: data.data } };
}
