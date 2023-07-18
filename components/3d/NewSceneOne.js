import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import React, { useRef, Suspense } from "react";
import Tar from "../../public/TestImages/onesheet.jpg";
import Normal from "../../public/TestImages/Gravel_001_Normal.jpg";
import { TextureLoader } from "three";
import glsl from "babel-plugin-glsl/macro"; // <--- Module to import
import * as THREE from "three";

const loader = new THREE.FileLoader();

loader.load("../Shaders/shader.frag", function (data) {
  fShader = data;
});

const NewShaderMaterial = shaderMaterial(
  // Uniforms
  { uTime: 0 },
  // Vertexshader
  glsl`
  precision mediump float; 
  
    varying vec2 vUc;

    varying float vWave;

      

    #pragma glslify: cnoise3 = require(glsl-noise/simplex/3d);
    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

    uniform float uTime; 
  #pragma glslify: cnoise3 = require(glsl-noise/simplex/3d);
  void main(){
       vec3 pos = position;

      float noiseFreq = 1.5;

   

      float noiseAmp = 0.34;

      vec3 noisePos = vec3(pos.x,pos.y * noiseFreq + uTime, pos.z );

      pos.z += cnoise3(noisePos) * noiseAmp; 

      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragmentshader
  glsl`
    precision mediump float;  
    #pragma glslify: snoise2 = require(glsl-noise/simplex/2d);
    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
    #pragma glslify: snoise4 = require(glsl-noise/simplex/4d);
    #pragma glslify: cnoise2 = require(glsl-noise/classic/2d);
    #pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
    #pragma glslify: cnoise4 = require(glsl-noise/classic/4d);
    #pragma glslify: pnoise2 = require(glsl-noise/periodic/2d);
    #pragma glslify: pnoise3 = require(glsl-noise/periodic/3d);
    #pragma glslify: pnoise4 = require(glsl-noise/periodic/4d);
    
    void main(){
 
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
  `
);

extend({ NewShaderMaterial });

const AlternatePlane = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.uTime = clock.elapsedTime;
  });

  const [image] = useLoader(THREE.TextureLoader, [Tar.src]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry args={[2, 3, 40, 40]} />
      <newShaderMaterial
        uTexture={image}
        ref={ref}
        uColor={"pink"}
        attach="material"
      />
      {/*       <meshBasicMaterial
        color={"red"}
        side={THREE.DoubleSide}
      ></meshBasicMaterial> */}
      <OrbitControls></OrbitControls>
    </mesh>
  );
};

const Plane = () => {
  const base22 = useLoader(TextureLoader, Tar.src);
  const material = new THREE.MeshLambertMaterial({
    map: base22,
  });
  return (
    <mesh material={material} position={[0, 0, -4]}>
      <planeBufferGeometry args={[6 * 4, 10 * 4]}></planeBufferGeometry>
    </mesh>
  );
};

const NEW = () => {
  const [image] = useLoader(THREE.TextureLoader, [Normal.src]);
  const material1 = new THREE.MeshPhysicalMaterial({
    envMap: image,
    roughness: 0.1,
    clearcoat: 0.6,
    clearcoatNormalMap: image,
    transmission: 1,
    thickness: 4,
  });
  const ref = useRef(null);
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.z += 0.01));
  return (
    <mesh ref={ref} material={material1}>
      <sphereBufferGeometry args={[4]}></sphereBufferGeometry>
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={1.0}>
        {/* <AlternatePlane></AlternatePlane> */}
        <NEW></NEW>
        <pointLight color={"blue"} intensity={2}></pointLight>
        <Plane></Plane>
        <OrbitControls></OrbitControls>
      </ambientLight>
    </Canvas>
  );
};

export default Scene;
