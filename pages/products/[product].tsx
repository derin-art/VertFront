import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import {
  increment,
  decrement,
  addToCart,
  removeFromCart,
} from "../../Features/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  console.log(useAppSelector((state) => state.cart.value));
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
  return (
    <div className="w-screen h-screen flex items-center justify-center z-30">
      <div className="w-4/5 h-4/5  flex items-center justify-center">
        <LazyLoadImage
          className="md:h-[450px] md:w-[330px] h-[400px] object-cover  shadow-md"
          loading="lazy"
          alt={props.data.name}
          src={props.data.urls[0].imgUrl}
          placeholderSrc={props.data.urls[0].blurUrl}
        ></LazyLoadImage>
        <div className="w-2/5 hidden z-30 md:flex md:h-[450px] md:w-[330px] h-[180px] w-[132px] flex-col p-2">
          <div className="font-Poppins md:text-4xl">{props.data.name}</div>
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
                  className="border p-2 mr-2 hover:bg-black bg-white hover:text-white duration-300 border-black z-30 font-Poppins text-xs"
                >
                  <span className="text-red-500">{item.sign}</span> {item.name}
                </button>
              );
            })}
          </div>
          <div className="mt-3">
            <button className="border border-black p-2 font-Poppins text-xs">
              Add to WishList
            </button>
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
