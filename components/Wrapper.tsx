import { type } from "os";
import { useRef } from "react";
import Mheader from "./ModernTake/Mheader";
import "react-toastify/dist/ReactToastify.css";
import { update, ifErrorUpdate, notify } from "../hooks/useToastPopup";

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
