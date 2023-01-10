import axios from "axios";
import ItemLinks from "../components/PagesComponents/ItemLinks";
import RedBack from "../public/TestImages/RedBack.jpg";

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

export default function Formal(props: ProductProps) {
  return (
    <div className="md:h-screen h-fit w-full bg-[url('../public/TestImages/RedBack.jpg')] flex items-center justify-center">
      <div className="w-4/5 h-4/5 flex items-center justify-around bg-white relative md:flex-row flex-col md:py-0 py-20 space-y-4 md:space-y-0">
        <div className="absolute top-2 left-2 text-3xl font-SecFont md:block hidden">
          Formal
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
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=Formal`
    )
    .catch((err) => {
      console.log(err);
    });

  return { props: { allItems: { data: data.data } } };
}
