import { type } from "os";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { addToCart, removeFromCart } from "../../Features/cartSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";

type CartItemProps = {
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
    quantity?: number;
  };
};

export default function CartItem(props: CartItemProps) {
  const dispatch = useAppDispatch();
  const itemWithoutQuantity = { ...props.data };
  const newData = delete itemWithoutQuantity["quantity"];
  return (
    <div className="flex border w-full p-2 relative border-black">
      <div className="flex items-center justify-center">
        <LazyLoadImage
          className="h-[150px] object-cover w-[112px]"
          loading="lazy"
          alt={props.data.name}
          src={props.data.urls[0].imgUrl}
          placeholderSrc={props.data.urls[0].blurUrl}
        ></LazyLoadImage>
      </div>
      <div className="flex flex-col ml-2 font-Poppins">
        <p className="text-2xl  font-Poppins"> {props.data.name}</p>
        <p>{props.data.itemCollection} Collection</p>
        <div className="flex text-xs space-x-4">
          <button
            onClick={() => {
              dispatch(addToCart(itemWithoutQuantity));
            }}
            className="border border p-2 border-black"
          >
            add item
          </button>
          <button
            onClick={() => {
              dispatch(removeFromCart(itemWithoutQuantity._id));
            }}
            className="border border p-2 border-black"
          >
            remove item
          </button>
        </div>
      </div>
      <div className="absolute right-2 flex flex-col text-2xl font-Poppins">
        <div>
          {" "}
          ${props.data.price} x {props.data.quantity}
        </div>
        <div className=" text-4xl justify-self-end font-PlayI">
          ${props.data.quantity && props.data.price * props.data.quantity}
        </div>
      </div>
    </div>
  );
}
