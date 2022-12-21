import axios from "axios";
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
  const cartButtons = [{ name: "Add to Cart" }, { name: "Remove from Cart" }];
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
          <div className="flex justify-between mt-4">
            {cartButtons.map((item) => {
              return (
                <button className="border p-2 border-black z-30 font-Poppins text-sm">
                  {item.name}
                </button>
              );
            })}
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
