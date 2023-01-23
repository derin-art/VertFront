import { useAppSelector, useAppDispatch } from "../hooks/useDispatch";
import { ToastContainer, toast } from "react-toastify";
import { setOpenLoginRedux } from "../Features/authSlice";
import { clearCart } from "../Features/cartSlice";
import { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ifErrorUpdate, notify, update } from "../hooks/useToastPopup";
import CartItem from "../components/ModernTake/CartItem";
import axios from "axios";

export default function Cart() {
  const toastId: any = useRef(null);
  type CartItemsType = {
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
  const dispatch = useAppDispatch();
  const reduceItemsToGetQuantityArray: any[] = [];
  const originalIds: string[] = [];
  const cartItems = useAppSelector((state) => state.cart.value.cartItems);
  cartItems.forEach((item: CartItemsType) => {
    const inOriginalIdArray = originalIds.find((id) => {
      id === item._id;
    });
    if (inOriginalIdArray) return;
    else {
      originalIds.push(item._id);
    }
  });

  originalIds.forEach((id) => {
    let quantity: number = 0;
    cartItems.forEach((item: CartItemsType) => {
      if (item._id === id) {
        quantity += 1;
      }
    });
    const item = cartItems.find((item: CartItemsType) => {
      return item._id === id;
    });
    if (
      reduceItemsToGetQuantityArray.find((item) => {
        return item._id === id;
      })
    )
      return;
    else reduceItemsToGetQuantityArray.push({ ...item, quantity });
  });
  const userLoginState = useAppSelector((state) => state.user.value);
  let grandTotal = 0;
  reduceItemsToGetQuantityArray.forEach((item) => {
    grandTotal += item.price * item.quantity;
  });

  const loggedIn: boolean = userLoginState.email && userLoginState.uid;

  const checkOutRequest = async () => {
    if (!loggedIn) {
      dispatch(setOpenLoginRedux());
      return;
    }
    if (reduceItemsToGetQuantityArray.length === 0) {
      toast.info("Cart is Empty 🤨");
      return;
    }
    const date = new Date();

    const newArrayForBougth = reduceItemsToGetQuantityArray.map((item) => {
      return {
        ...item,
        time: date.toLocaleTimeString(),
        date: date.toLocaleDateString(),
      };
    });

    notify(toastId, "Processing Payment Details");

    const data = await axios
      .put(
        `https://${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/api/customerChanges?email=${userLoginState.email}&Bought=${true}`,
        { item: newArrayForBougth }
      )
      .catch((err) => {
        console.log(err);
        ifErrorUpdate(toastId, "An error occured, please check your internet");
      });
    if (data) {
      update(toastId, "Purchase Successful!");
      dispatch(clearCart());
    }
  };

  return (
    <div className="flex items-center justify-center pt-20  h-screen relative overflow-hidden bg-white text-black">
      <div className=" md:p-4 p-2 w-full  md:w-4/5 h-full">
        <div className="font-Inter text-red-500 text-sm ml-2 -mt-2">Cart</div>
        <div className="flex md:flex-row flex-col w-full h-full">
          <div className="flex flex-col w-full md:w-3/4 h-96  md:h-4/5 overflow-auto z-30 p-2">
            {reduceItemsToGetQuantityArray.length > 0 ? (
              reduceItemsToGetQuantityArray.map((item) => {
                return (
                  <div key={item._id} className="mb-4">
                    <CartItem key={item._id} data={item}></CartItem>
                  </div>
                );
              })
            ) : (
              <div className="font-Inter text-lg">Wow, such empty. 😺</div>
            )}
          </div>
          <div className="md:flex flex-col z-30 text-4xl items-center w-1/4 hidden  h-4/5 font-Oswald border-l border-black">
            <div className="pt-4 ">Grand Total</div>
            <div className="font-PlayI ">${grandTotal}</div>
            <button
              onClick={() => {
                checkOutRequest();
              }}
              className="mt-20 font-Inter border border-black text-white bg-red-500 p-2 text-sm z-30"
            >
              Check Out
            </button>
          </div>
          <div className="h-2/4 w-full flex items-center  flex-col text-black bg-white border z-30 absolute left-0 -bottom-1/3 border-t md:hidden">
            <div className="text-black font-Inter">Grand Total</div>
            <div className="font-PlayI ">${grandTotal}</div>
            <button
              onClick={() => {
                checkOutRequest();
              }}
              className="border border-black mt-1 font-Poppins p-2 text-xs bg-red-500 text-white"
            >
              CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
