import axios from "axios";
import { type } from "os";

import ItemLinks from "../../components/PagesComponents/ItemLinks";

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

export default function Shirts(props: ProductProps) {
  const finalArray = [];
  const finalArrayMobile = [];
  const chunkSize = 3;
  const chunkSizeMobile = 2;
  for (let i = 0; i < props.allItems.data.length; i += chunkSize) {
    const chunk = props.allItems.data.slice(i, i + chunkSize);

    finalArray.push(chunk);
  }
  console.log("sd", finalArray);

  for (let i = 0; i < props.allItems.data.length; i += chunkSizeMobile) {
    const chunk = props.allItems.data.slice(i, i + chunkSizeMobile);

    finalArrayMobile.push(chunk);
  }
  return (
    <div className="bg-white">
      {finalArray.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-around h-screen hidden md:flex snapChild"
          >
            {item.map((product) => {
              return (
                <div className=" z-10 " key={product._id}>
                  <ItemLinks key={product._id} data={product}></ItemLinks>
                </div>
              );
            })}
          </div>
        );
      })}

      {finalArrayMobile.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-around h-screen md:hidden flex snapChild"
          >
            {item.map((product) => {
              return (
                <div className=" z-10 " key={product._id}>
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
  let collectionName: string;

  const { req, query, res, asPath, pathname } = context;
  console.log(query);
  switch (query.ITEM) {
    case "SHIRTS": {
      collectionName = "Shirts";
      break;
    }
    case "JACKETS": {
      collectionName = "Jacket";
      break;
    }
    case "T-SHIRTS": {
      collectionName = "Tshirts";
      break;
    }
    default: {
      throw new Error(
        "Query at /items/Query does not match any database search patterns"
      );
    }
  }
  const host = req.headers.host;
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=${collectionName}`
    )
    .catch((err) => {
      console.log(err);
    });

  return { props: { allItems: { data: data.data } } };
}
