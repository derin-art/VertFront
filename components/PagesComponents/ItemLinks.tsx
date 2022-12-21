import Test3 from "../../public/TestImages/Test3.jpg";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { type } from "os";

type ItemLinkProps = {
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

export default function ItemLink(props: ItemLinkProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <LazyLoadImage
        className="md:h-[300px] md:w-[220px] h-[180px] w-[132px] object-cover  shadow-md"
        src={props.data.urls[0].imgUrl}
        alt={"Test"}
        loading="lazy"
        placeholderSrc={props.data.urls[0].blurUrl}
      ></LazyLoadImage>
      <div className="mt-4 max-w-[220px] flex flex-col items-center justify-center">
        <div className="font-PlayI bg-black text-white p-1 text-center text-xs w-fit px-4">
          ${props.data.price}
        </div>
        <div className="mt-2 font-Poppins text-xs text-center">
          {props.data.name}
        </div>
      </div>
    </div>
  );
}
