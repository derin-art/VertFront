import axios from "axios";
import { type } from "os";

import ItemLinks from "../components/PagesComponents/ItemLinks";

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

export default function Shirts(props: ShirtsProps) {
  const finalArray = [];
  const chunkSize = 3;
  for (let i = 0; i < props.allItems.data.length; i += chunkSize) {
    const chunk = props.allItems.data.slice(i, i + chunkSize);
    // do whatever
    finalArray.push(chunk);
  }
  console.log("sd", finalArray);
  return (
    <div className="bg-white">
      {finalArray.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-around h-screen snapChild"
          >
            {item.map((product) => {
              return (
                <div key={product._id}>
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

export async function getServerSideProps(context: any) {
  const { req, query, res, asPath, pathname } = context;
  const host = req.headers.host;
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=Shirts`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
    console.log(data.data);
  }
  return { props: { allItems: { data: data.data } } };
}
