import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { motion } from "framer-motion-3d";
import { useRef, useState } from "react";
import Cake from "../../public/TestImages/CakeTexture.jpg";
import Sucked from "../../public/TestImages/SuckedBg.png";
import Sucked1 from "../../public/TestImages/Sucked.png";
import Scene from "./NewScene";

function Plan() {
  const colorBase = useLoader(TextureLoader, Sucked.src);
  const [image] = useLoader(THREE.TextureLoader, [Cake.src]);
  const colorBase1 = useLoader(TextureLoader, Sucked1.src);
  let geom = new THREE.PlaneGeometry(80, 14, 20, 20);
  var material = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    map: colorBase1,
    transmission: 1,

    color: "white",
  });

  var material1 = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    envMap: image,
    roughness: 0,
    clearcoat: 0,
    clearcoatNormalMap: image,
    transmission: 0.9,
    metalness: 0,
    thickness: 0,
    color: "white",
    toneMapped: false,
    map: colorBase1,
  });

  function planeCurve(g: any, z: any) {
    let p = g.parameters;
    let hw = p.width * 0.5;

    let a = new THREE.Vector2(-hw, 0);
    let b = new THREE.Vector2(0, z);
    let c = new THREE.Vector2(hw, 0);

    let ab = new THREE.Vector2().subVectors(a, b);
    let bc = new THREE.Vector2().subVectors(b, c);
    let ac = new THREE.Vector2().subVectors(a, c);

    let r =
      (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));

    let center = new THREE.Vector2(0, z - r);
    let baseV = new THREE.Vector2().subVectors(a, center);
    let baseAngle = baseV.angle() - Math.PI * 0.5;
    let arc = baseAngle * 2;

    let uv = g.attributes.uv;
    let pos = g.attributes.position;
    let mainV = new THREE.Vector2();
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = 1 - uv.getX(i);
      let y = pos.getY(i);
      mainV.copy(c).rotateAround(center, arc * uvRatio);
      pos.setXYZ(i, mainV.x, y, -mainV.y);
    }

    pos.needsUpdate = true;
  }

  planeCurve(geom, 20);
  return (
    <mesh position={[0, 4, 10]} geometry={geom} material={material1}>
      <ambientLight intensity={1}></ambientLight>
    </mesh>
  );
}

const RealBagel = () => {
  const [image] = useLoader(THREE.TextureLoader, [Cake.src]);
  const [rad, setRad] = useState(false);
  const mat = new THREE.MeshMatcapMaterial({
    color: "white",
    bumpMap: image,
    bumpScale: 0.1,
    alphaMap: image,
    toneMapped: false,
  });
  const ref2 = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (clock.elapsedTime % 2) {
      setRad(true);
    } else {
      setRad(false);
    }
  });
  return (
    <motion.mesh
      position={[0, 0, -7]}
      ref={ref2}
      animate={{ scaleY: [1, 0.9, 1], scaleX: [1, 0.86, 1] }}
      transition={{
        repeat: Infinity,
        duration: 2,

        ease: "easeInOut",
      }}
      material={mat}
    >
      {" "}
      <OrbitControls></OrbitControls>
      <torusBufferGeometry args={[10, 5, 16, 100]}></torusBufferGeometry>
      <Edges color={"white"}></Edges>
    </motion.mesh>
  );
};

const NEW = () => {
  const [image] = useLoader(THREE.TextureLoader, [Cake.src]);
  const material1 = new THREE.MeshPhysicalMaterial({
    envMap: image,
    roughness: 0.1,
    clearcoat: 0.1,
    clearcoatNormalMap: image,
    transmission: 1,
    metalness: 0,
    thickness: 2,
    color: "white",
  });
  const ref = useRef(null);
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.z += 0.01));
  return (
    <mesh ref={ref} material={material1}>
      <sphereBufferGeometry args={[4]}></sphereBufferGeometry>
    </mesh>
  );
};

export default function Bagel() {
  const material1 = new THREE.MeshBasicMaterial({
    color: "#f9fafb",
    toneMapped: false,
  });
  return (
    <Canvas>
      {/* <Plan></Plan> */}
      <RealBagel></RealBagel>
      {/*   <mesh material={material1} position={[0, 0, -10]}>
        <planeBufferGeometry args={[300, 300]}></planeBufferGeometry>
      </mesh>{" "} */}
    </Canvas>
  );
}
