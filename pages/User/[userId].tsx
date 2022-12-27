import { useAppSelector } from "../../hooks/useDispatch";
import WishBuyItem from "../../components/ModernTake/WishBuyItem";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

type UserProps = {
  allItems: {
    data: any;
  };
};

export default function UserData(props: UserProps) {
  const userMongoDataRedux = useAppSelector(
    (state) => state.user.value.mongoData
  );
  const [isOnWishList, setIsOnWishList] = useState(true);
  return (
    <div className="flex items-center justify-center pt-20  h-screen relative  bg-white text-black">
      <div className="md:p-4 p-2 w-full  md:w-4/5 h-full">
        <div className="font-Oswald text-red-500 text-sm   flex space-x-4 mb-2">
          <button
            onClick={() => {
              setIsOnWishList(true);
            }}
            className={`duration-300 p-2 border-t border-black bg-white  border-x border ${
              isOnWishList && "bg-red-500 text-white"
            }`}
          >
            {" "}
            WishList
          </button>
          <button
            className={`duration-300 p-2 border-t border-black bg-white  border-x border ${
              !isOnWishList && "bg-red-500 text-white"
            }`}
            onClick={() => {
              setIsOnWishList(false);
            }}
          >
            Buying History
          </button>
        </div>
        {isOnWishList ? (
          <div className="flex  flex-col w-full h-4/5 overflow-auto ">
            {props.allItems.data.WishList.map((item: any) => {
              return (
                <Link
                  href={`/products/${item._id}`}
                  key={item._id}
                  className="mb-2"
                >
                  <WishBuyItem
                    Wish={true}
                    data={item}
                    key={item._id}
                  ></WishBuyItem>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex  flex-col w-full h-4/5 overflow-auto ">
            {props.allItems.data.Bought.map((item: any) => {
              return (
                <div key={item._id} className="mb-2">
                  <WishBuyItem
                    Wish={false}
                    data={item}
                    key={item._id}
                  ></WishBuyItem>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query, res, asPath, pathname } = context;
  console.log("as", query);
  const userId = query.userId;
  const data: any = await axios
    .get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}//api/customerChanges?id=${userId}`
    )
    .catch((err) => {
      console.log(err);
    });
  if (data) {
    console.log(data.data);
  }
  return { props: { allItems: { data: data.data } } };
}
