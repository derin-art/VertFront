import { useAppSelector } from "../hooks/useDispatch";
import CartItem from "../components/ModernTake/CartItem";

export default function Cart() {
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

  let grandTotal = 0;
  reduceItemsToGetQuantityArray.forEach((item) => {
    grandTotal += item.price * item.quantity;
  });

  console.log("arr", reduceItemsToGetQuantityArray);

  return (
    <div className="flex items-center justify-center pt-20  h-screen">
      <div className=" p-4 w-4/5 h-full">
        <div className="font-Oswald text-red-500 text-sm ml-2 -mt-2">Cart</div>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-3/4 h-4/5 overflow-auto z-30 p-2">
            {reduceItemsToGetQuantityArray.map((item) => {
              return (
                <div key={item._id} className="mb-4">
                  <CartItem key={item._id} data={item}></CartItem>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col z-30 text-4xl items-center w-1/4  h-4/5 font-Oswald">
            <div className="pt-4 ">Grand Total</div>
            <div className="font-PlayI ">${grandTotal}</div>
            <button className="mt-20 font-Poppins border border-black text-white bg-red-500 p-2 text-sm z-30">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
