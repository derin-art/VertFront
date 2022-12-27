import { type } from "os";
import Header from "./Header";
import Mheader from "./ModernTake/Mheader";
import "react-toastify/dist/ReactToastify.css";

type WrapperProps = {
  children: any;
};

export default function Wrapper(props: WrapperProps) {
  return (
    <div className="w-full ">
      <Mheader></Mheader>
      <div className="">{props.children}</div>
    </div>
  );
}
