import { Suspense } from "react";
import FinalCanvas from "../components/3d/SilverHand";

export default function AnotherScroll() {
  return (
    <div>
      <Suspense fallback={null}>
        {" "}
        <FinalCanvas></FinalCanvas>
      </Suspense>
    </div>
  );
}
