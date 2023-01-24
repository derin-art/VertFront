import axios from "axios";
import Back from "../public/TestImages/Back.jpg";
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

export default function Risque(props: ProductProps) {
  return (
    <div className="md:h-screen h-fit w-full bg-white flex items-center justify-center">
      <div className="w-4/5 h-4/5 space-y-4 md:space-y-0 flex items-center py-20 md:py-0 justify-around bg-white relative md:flex-row flex-col">
        <div className="absolute top-2 left-2 text-3xl font-SecFont hidden md:block">
          NightLife
        </div>
        {props.allItems.data.map((item) => {
          return <ItemLinks data={item} key={item._id}></ItemLinks>;
        })}
      </div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=NightLife`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
  }
  return { props: { allItems: { data: data.data } } };
}
