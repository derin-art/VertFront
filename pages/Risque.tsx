import axios from "axios";
import Back from "../public/TestImages/Back.jpg";

type ProductProps = {
  allItems: {
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
    }[];
  };
};

export default function Risque(props: ProductProps) {
  <div className="h-screen w-full bg-black mt-48">jefefnenf</div>;
}

export async function getServerSideProps(context: any) {
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=NightLife`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
    console.log(data.data);
  }
  return { props: { allItems: { data: data.data } } };
}
