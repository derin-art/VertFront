import axios from "axios";
import ItemLinks from "../components/PagesComponents/ItemLinks";
import { type } from "os";

type ShirtsProps = {
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
export default function Future(props: ShirtsProps) {
  const finalArray = [];
  const chunkSize = 2;
  for (let i = 0; i < props.allItems.data.length; i += chunkSize) {
    const chunk = props.allItems.data.slice(i, i + chunkSize);
    // do whatever
    finalArray.push(chunk);
  }
  return (
    <div>
      <div className="fixed flex h-screen w-full flex-col items-center border justify-center">
        <div className="glitch-wrapper absolute -top-40 md:top-0 text-sm lg:text-3xl xl:text-4xl z-40 font-Berk tracking-wider">
          <div className="glitch" data-glitch=" Vert Future State">
            Vert Future State
          </div>
        </div>{" "}
      </div>
      {finalArray.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-around h-screen snapChild"
          >
            {item.map((product) => {
              return (
                <div key={product._id} className="z-20">
                  <ItemLinks key={product._id} data={product}></ItemLinks>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps(context: any) {
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=Future`
    )
    .catch((err) => {
      console.log(err);
    });

  return { props: { allItems: { data: data.data } } };
}
