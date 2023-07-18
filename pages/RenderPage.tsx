import { Suspense } from "react";
import FinalCanvas from "../components/3d/Cannon";

export default function RenderPage() {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={null}>
        <FinalCanvas></FinalCanvas>
      </Suspense>
    </div>
  );
}
