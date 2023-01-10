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

export default function Varsity(props: ProductProps) {
  return (
    <div className=" flex items-center justify-center h-fit md:h-screen w-screen bg-white">
      <div className="w-full h-full bg-transparent flex md:flex-row flex-col space-y-4 md:space-y-0 py-32 md:py-0 justify-around items-center">
        {props.allItems.data.map((item, index) => {
          return (
            <div key={item._id} className={`z-20`}>
              <ItemLinks data={item} key={item._id}></ItemLinks>
            </div>
          );
        })}
      </div>
      <div className="absolute text-black top-20 xl:top-4 w-full flex justify-center z-0">
        {" "}
        <div className="font-Grad md:text-8xl lg:text-9xl  xl:text-[220px] z-20 bord w-full text-center border-black">
          VERTSITY®
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=Varsity`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
  }
  return { props: { allItems: { data: data.data } } };
}
