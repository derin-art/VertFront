import axios from "axios";
import ItemLinks from "../components/PagesComponents/ItemLinks";

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

export default function Casual(props: ProductProps) {
  return (
    <div className="flex items-center justify-around bg-white h-fit md:h-screen w-screen">
      <div className="w-4/5 h-4/5 space-y-4 md:space-y-0 flex items-center py-20 md:py-0 justify-around bg-white relative md:flex-row flex-col">
        <div className="absolute top-2 left-2 text-3xl font-SecFont md:block hidden">
          Casual
        </div>
        {props.allItems.data.map((item, index) => {
          return <ItemLinks data={item} key={item._id}></ItemLinks>;
        })}
      </div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=Casual`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
  }
  return { props: { allItems: { data: data.data } } };
}
