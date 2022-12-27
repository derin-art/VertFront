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
    date?: string;
    time?: string;
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
  Wish: boolean;
};

export default function WishBuyItem(props: CartItemProps) {
  const dispatch = useAppDispatch();
  const itemWithoutQuantity = { ...props.data };
  const newData = delete itemWithoutQuantity["quantity"];
  return (
    <div className="flex border w-full p-2 relative border-black">
      <div className="flex items-center justify-center">
        <LazyLoadImage
          className="md:h-[150px] h-[75px] w-[56px] object-cover md:w-[112px]"
          loading="lazy"
          alt={props.data.name}
          src={props.data.urls[0].imgUrl}
          placeholderSrc={props.data.urls[0].blurUrl}
        ></LazyLoadImage>
      </div>
      <div className="flex flex-col ml-2 font-Poppins w-2/4 ">
        <p className="lg:text-2xl md:text-xl text-xs  font-Poppins">
          {" "}
          {props.data.name}
        </p>
        <p className="lg:text-base md:text-sm text-[9px]">
          {props.data.itemCollection} Collection
        </p>
        <p className="md:text-sm text-[10px]">
          {!props.Wish && `${props.data.date}`}
        </p>
        <p className="md:text-sm text-[10px]">
          {!props.Wish && `${props.data.time}`}
        </p>

        <div className="flex text-[10px] mt-2 space-x-2 md:space-x-4"></div>
      </div>
      <div className="absolute text-sm md:right-2 right-1 flex flex-col md:text-2xl font-Poppins">
        <div className="">
          {" "}
          ${props.data.price} {!props.Wish && `x ${props.data.quantity}`}
        </div>
        <div
          className={`${
            props.Wish && "hidden"
          } md:text-4xl text-lg justify-self-end font-PlayI`}
        >
          ${props.data.quantity && props.data.price * props.data.quantity}
        </div>
      </div>
    </div>
  );
}
