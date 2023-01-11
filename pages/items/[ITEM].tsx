import axios from "axios";
import { type } from "os";
import { QueryClient, useQuery } from "react-query";

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

  for (let i = 0; i < props.allItems.data.length; i += chunkSizeMobile) {
    const chunk = props.allItems.data.slice(i, i + chunkSizeMobile);

    finalArrayMobile.push(chunk);
  }
  return (
    <div className="bg-white lg:p-0 py-20">
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
            style={{ height: "50vh" }}
            className="flex items-center justify-around   md:hidden flex "
          >
            {item.map((product) => {
              return (
                <div className=" z-10 p-2" key={product._id}>
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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { ITEM: "SHIRTS" } },
      { params: { ITEM: "JACKETS" } },
      { params: { ITEM: "T-SHIRTS" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }: any) {
  let collectionName: string;

  switch (params.ITEM) {
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

  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/getStoreItems?collection=${collectionName}`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
    console.log(data);
  }

  return { props: { allItems: { data: data.data } } };
}
