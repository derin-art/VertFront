import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import earthImg from "../../public/TestImages/Map.jpg";
import TarSheet from "../../public/TestImages/onesheet.jpg";
import TarSheet1 from "../../public/TestImages/onesheet1.jpg";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion-3d";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ReactThreeFiber } from "@react-three/fiber";

import { BufferAttribute } from "three";
import { useLoader } from "@react-three/fiber";
import BoxC from "./BoxC";

import * as THREE from "three";

import {
  Box,
  Edges,
  OrbitControls,
  shaderMaterial,
  Sparkles,
} from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

import React from "react";

type BoxMeshProps = {
  place: number[];
  args?: number[];
};

const GlobeMesh = ({ count = 1000 }) => {
  const base = new THREE.TextureLoader().load(earthImg.src);
  const colorBase = useLoader(TextureLoader, earthImg.src);

  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.z += 0.01));

  const vertices = [];

  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({ color: "red" });
  material.size = 2;
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (0.1 - Math.random()) * 3.5);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);

  return (
    <points
      material={material}
      visible
      castShadow
      ref={ref}
      position={[10, 10, 10]}
    >
      <Edges></Edges>
      <directionalLight intensity={0.5} />

      <sphereBufferGeometry attach="geometry" args={[20, 32, 42]}>
        {" "}
      </sphereBufferGeometry>

      <meshBasicMaterial color={"#d1d5db"}></meshBasicMaterial>
    </points>
  );
};

const SaturnSpeaks = (props: {
  position?: [x: number, y: number, z: number];
  size?: [x: number, y: number, z: number];
  color?: string;
}) => {
  const material = new THREE.PointsMaterial({
    color: props.color ? props.color : "black",
  });
  material.size = 0.5;
  return (
    <points
      position={props.position ? props.position : [0, 0, 0]}
      material={material}
    >
      <directionalLight intensity={0.5} />

      <sphereBufferGeometry
        attach="geometry"
        args={props.size ? props.size : [10, 32, 42]}
      >
        {" "}
      </sphereBufferGeometry>

      <meshBasicMaterial color={"#d1d5db"}></meshBasicMaterial>
    </points>
  );
};

const Rings = (props: {
  position?: [x: number, y: number, b: number];
  rotation?: [x: number, y: number, b: number];
  size?: [x: number, y: number, b: number];
  color?: string;
  wireframe?: boolean;
}) => {
  const geometry = props.size
    ? new THREE.RingGeometry(props.size[0], props.size[1], props.size[2])
    : new THREE.RingGeometry(6, 14, 32);

  const material = new THREE.MeshBasicMaterial({
    color: props.color ? props.color : "red",
    side: THREE.DoubleSide,
    combine: THREE.MixOperation,
    transparent: true,
    opacity: 0.5,
    refractionRatio: 0.5,
    wireframe: props.wireframe ? props.wireframe : false,
  });

  const Lambertmaterial = new THREE.MeshLambertMaterial({
    color: props.color ? props.color : "green",
  });

  const MetalMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.5,
    clearcoat: 0.6,
    color: props.color ? props.color : "green",
  });

  const depthMaterial = new THREE.MeshDepthMaterial({
    side: THREE.DoubleSide,
  });

  const rehal = new THREE.PointsMaterial({
    color: props.color ? props.color : "black",
  });
  rehal.size = 1;
  const mesh = new THREE.Mesh(geometry, material);
  const ref1 = useRef<THREE.Mesh>(null!);
  const ref2 = useRef<THREE.Points>(null!);
  const vet = new THREE.Vector3(1, 0, 0);
  const ang = Math.PI / 2;

  const MeshObj = (
    <mesh
      ref={ref1}
      material={material}
      geometry={geometry}
      position={props.position ? props.position : [1, 5, 7]}
      rotation={props.rotation ? props.rotation : [-Math.PI / 2, 0, 0]}
    >
      <directionalLight intensity={0.5} />

      <ringBufferGeometry
        args={props.size ? props.size : [5, 14, 32]}
      ></ringBufferGeometry>

      <meshBasicMaterial
        color={props.color ? props.color : "red"}
        transparent={true}
        opacity={0.5}
      ></meshBasicMaterial>
    </mesh>
  );

  return <>{MeshObj}</>;
};

const PointRings = (props: {
  position?: [x: number, y: number, b: number];
  rotation?: [x: number, y: number, b: number];
  size?: [x: number, y: number, b: number];
  color?: string;
  type?: string;
}) => {
  const geometry = new THREE.RingGeometry(6, 14, 32);

  const rehal = new THREE.PointsMaterial({
    color: props.color ? props.color : "black",
  });
  rehal.size = 1;

  const ref1 = useRef<THREE.Mesh>(null!);
  const ref2 = useRef<THREE.Points>(null!);
  const vet = new THREE.Vector3(1, 0, 0);
  const ang = Math.PI / 2;
  useFrame(() => {
    ref2.current.rotation.z = 0.008 + ref2.current.rotation.z;
  });
  const PointsObj = (
    <points
      ref={ref2}
      material={rehal}
      geometry={geometry}
      position={props.position ? props.position : [1, 5, 7]}
      rotation={props.rotation ? props.rotation : [-Math.PI / 2, 0, 0]}
    >
      <directionalLight intensity={0.5} />

      <ringBufferGeometry
        attach="geometry"
        args={props.size ? props.size : [5, 14, 32]}
      ></ringBufferGeometry>
    </points>
  );

  return <>{PointsObj}</>;
};

const BoxMesh = (props: BoxMeshProps) => {
  const base = new THREE.TextureLoader().load(earthImg.src);
  const colorBase = useLoader(TextureLoader, earthImg.src);
  const mesh = useRef<THREE.Mesh>(null!);
  /*   useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  }); */

  const [image] = useLoader(THREE.TextureLoader, [TarSheet1.src]);

  const base1 = new THREE.TextureLoader().load(TarSheet1.src);
  const base22 = useLoader(TextureLoader, TarSheet1.src);
  const material = new THREE.MeshLambertMaterial({
    map: base22,
  });
  const MetalMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.5,
    clearcoat: 0.6,
    color: "green",
  });
  return (
    <mesh material={material} ref={mesh} position={props.place} castShadow>
      <Edges></Edges>

      <sphereBufferGeometry
        args={[30, 12, 8, 0, 1.7, 1, 1.2]}
      ></sphereBufferGeometry>
      <meshDepthMaterial
        map={base1}
        depthTest={true}
        attach={"material"}
        colorWrite={true}
      ></meshDepthMaterial>
    </mesh>
  );
};

const WaveMaterial = shaderMaterial(
  // Uniforms
  {},
  // Vertexshader
  glsl` 
      void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)
  }`,
  // Fragmentshader
  glsl`
      void main(){
        gl_FragColor = vec4(0.0, 0.4, 1.0, 1.0)
      }
  `
);

extend({ WaveMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Object3DNode<
        typeof WaveMaterial,
        typeof WaveMaterial
      >;
    }
  }
}

const PlaneSheet = () => {
  const colorBase = useLoader(TextureLoader, TarSheet.src);

  return (
    <mesh position={[0, 0, 5]}>
      <planeBufferGeometry cargs={[7, 4]}></planeBufferGeometry>
      <waveMaterial attach={"material"}></waveMaterial>
    </mesh>
  );
};

const BasicBlock = (props: {}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={mesh} castShadow>
      <Edges></Edges>

      <dodecahedronBufferGeometry args={[4, 0]}></dodecahedronBufferGeometry>
      <meshStandardMaterial
        color="lightBlue"
        attach={"material"}
      ></meshStandardMaterial>
    </mesh>
  );
};

const CameraAnimation = () => {
  const [started, setStarted] = useState(false);
  const vec = new THREE.Vector3();

  useEffect(() => {
    setStarted(true);
  });

  useFrame((state) => {
    if (started) {
      state.camera.lookAt(10, 2, 0);
      state.camera.position.lerp(vec.set(10, 10, -4), 0.008);
    }
    return null;
  });
  return null;
};

function Begin3d() {
  const [ortho, set] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      set((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const JUPRINGS = [
    { color: "#15803d", in: 6, out: 6.4 },
    { color: "#86efac", in: 6.4, out: 6.45 },
    { color: "#16a34a", in: 7, out: 7.5 },

    { color: "#4ade80", in: 14, out: 16 },
  ];

  const [light, setLight] = useState(false);

  return (
    <div className="flex w-full h-screen items-center justify-center border ">
      <button className="a bg-white rounded-full p-2 right-[50%]">
        Explore Synopsis
      </button>
      {typeof window !== "undefined" && (
        <Canvas
          shadowMap
          camera={{
            position: [-40, 0, 0],
            fov: 10,
            aspect: window.innerWidth / window.innerHeight,
            isPerspectiveCamera: true,
            left: 10,
          }}
          style={{
            width: "80vw",
            height: "100vh",
          }}
        >
          <PerspectiveCamera
            position={[-60, 19, 2]}
            fov={10}
            makeDefault={true}
          />
          <group>
            {" "}
            {/*   {JUPRINGS.map((item) => {
              return (
                <Rings
                  size={[item.in, item.out, 70]}
                  key={item.color}
                  position={[0, 0, 0]}
                  color={item.color}
                ></Rings>
              );
            })} */}
            {/*     <Rings
              size={[5, 7, 40]}
              position={[0, 0, 0]}
              rotation={[Math.PI / 4, 4, 5]}
              color="green"
              wireframe={true}
            ></Rings> */}
            {/*    <PointRings
              key={"122"}
              size={[6, 13, 40]}
              position={[0, 0, 0]}
              color="black"
            ></PointRings>
            <PointRings
              key={"1"}
              size={[10, 13, 40]}
              rotation={[Math.PI / 0.4, 2, 4]}
              position={[0, 0, 0]}
              color="black"
            ></PointRings> */}
            <BoxMesh place={[0, 0, 0]}></BoxMesh>
            {/*   <BoxMesh place={[0, 0, 0]}></BoxMesh> */}
            <PlaneSheet></PlaneSheet>
            <motion.pointLight
              position={[0, 10, 0]}
              intensity={10}
            ></motion.pointLight>
            {/*  <SaturnSpeaks color="white" size={[3, 20, 20]}></SaturnSpeaks> */}
          </group>
          <OrbitControls makeDefault dampingFactor={0.3} />
          <pointLight position={[-10, 0, -20]} intensity={3}></pointLight>
          <pointLight position={[0, 10, 0]} intensity={1}></pointLight>
          <motion.spotLight
            intensity={10}
            position={[0, 10, 0]}
          ></motion.spotLight>
          {/*  <motion.directionalLight
            castShadow
            position={[0, 10, 0]}
            shadow-mapSize-width={1050}
            shadow-mapSize-height={1050}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            intensity={1}
            animate={{ y: 6 }}
          ></motion.directionalLight> */}
          {/* <ambientLight color={"white"} intensity={10}></ambientLight> */}
          {/*   <group>
            <mesh
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -3, 0]}
            >
              <planeBufferGeometry
                attach={"geometry"}
                args={[100, 100]}
              ></planeBufferGeometry>
              <shadowMaterial attach={"material"}></shadowMaterial>
            </mesh>
          </group>
          <BoxMesh place={[4, 4, -2]}></BoxMesh>
          <GlobeMesh></GlobeMesh>
          <BoxMesh args={[3, 4, 4, 5]} place={[10, 0, 10]}></BoxMesh>
          <BoxMesh place={[4, 0, 3]}></BoxMesh> */}
        </Canvas>
      )}
    </div>
  );
}

export default React.memo(Begin3d);
