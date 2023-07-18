import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { Box } from "@react-three/drei";
import { type } from "os";

type BoxCprops = {
  place: number[];
};

export default function BoxC(props: BoxCprops) {
  const mesh: any = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh} position={props.place}>
      <boxBufferGeometry
        attach={"geometry"}
        args={[1, 1, 1, 1]}
      ></boxBufferGeometry>
      <meshStandardMaterial
        color="lightBlue"
        attach={"material"}
      ></meshStandardMaterial>
    </mesh>
  );
}
