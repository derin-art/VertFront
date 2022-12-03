import { type } from "os";
import AltMainCenter from "../AltMainCenter";

type AnotherMainProps = {
  other?: boolean;
};

export default function AnotherMain(props: AnotherMainProps) {
  const bak = [1, 2, 3, 4, 5, 6];
  return (
    <div
      className={`${
        props.other ? "bg-black" : "bg-white"
      } h-screen flex items-center justify-center relative duration-300`}
    >
      {bak.map((item) => {
        return (
          <div
            className={`${
              props.other ? "border-white" : "border-black"
            }  w-1/6 border-r duration-300 h-full`}
            key={item}
          ></div>
        );
      })}
      <AltMainCenter openTimeLine={true}></AltMainCenter>
    </div>
  );
}
