import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import React, { useRef, Suspense } from "react";
import Tar from "../../public/TestImages/onesheet.jpg";

import glsl from "babel-plugin-glsl/macro"; // <--- Module to import
import * as THREE from "three";
import { BoxGeometry } from "three";

const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  glsl`
    precision mediump float;
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(cos(position), 1.0);
    }
    `,
  glsl`
  void main(){
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
  `
);

let uniforms = {
  uTime: { type: "f", value: 0.0 },
};

extend({ WaveShaderMaterial });

const sds = new THREE.PointsMaterial({});

const mat = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: ` precision mediump float;
    uniform float uTime;
    void main(){
        float newX = sin(position.x * uTime) * cos(position.y * uTime);
        vec3 newPosition = vec3(position.x, newX, position.z);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }`,
  fragmentShader: ` void main(){
      gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
  }`,
  wireframe: true,
});

const Cata = () => {
  const ref1 = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref1.current.uTime = clock.elapsedTime;
    uniforms.uTime.value = clock.elapsedTime;
  });

  


  return (
    <mesh ref={ref1} material={mat}>
      {/* 
        <waveShaderMaterial></waveShaderMaterial> */}

      <coneBufferGeometry args={[10, 10, 40]}></coneBufferGeometry>
    </mesh>
  );
};

const Yam = () => {
  const ref1 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    ref1.current.uTime = clock.elapsedTime;
    uniforms.uTime.value = clock.elapsedTime;
  });

  const rehal = new THREE.PointsMaterial({
    color: "white",
  });
  return (
    <points ref={ref1} material={rehal}>
      {/* 
        <waveShaderMaterial></waveShaderMaterial> */}

      <sphereBufferGeometry args={[10, 10, 30, 30]}></sphereBufferGeometry>
    </points>
  );
};

export default function BatmanBegins() {
  return (
    <Canvas>
      <OrbitControls></OrbitControls>
      <Cata></Cata>
    </Canvas>
  );
}
