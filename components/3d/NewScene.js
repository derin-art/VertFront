import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import React, { useRef, Suspense, useState, useEffect } from "react";
import Tar from "../../public/TestImages/onesheet.jpg";

import glsl from "babel-plugin-glsl/macro"; // <--- Module to import
import * as THREE from "three";

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  glsl`           
    precision mediump float;  

    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);
    
    void main() {
      vUv = uv;

      vec3 pos = position;
      float noiseFreq = 1.5;
      float noiseAmp = 0.25;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z );
      pos.z += snoise3(noisePos) * noiseAmp; 
      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  glsl`           
    precision mediump float;

  
    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vWave;

   

    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0);
    }
  `
);

extend({ WaveShaderMaterial });

/* const AlternatePlane = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.uTime = clock.elapsedTime;
  });

  const [image] = useLoader(THREE.TextureLoader, [Tar.src]);

  return (
    <mesh position={[5, 0, 0]}>
      <planeBufferGeometry args={[2, 3, 40, 40]} />
      <newShaderMaterial
        uTexture={image}
        ref={ref}
        uColor={"pink"}
        attach="material"
      />
      <OrbitControls></OrbitControls>
    </mesh>
  );
}; */

const WaveShaderMateria = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  glsl`
    precision mediump float;
 
    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);

    void main() {
      vUv = uv;

      vec3 pos = position;
      float noiseFreq = 1.4;
      float noiseAmp = 0.25;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // Fragment Shader
  glsl`
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vWave;

    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

extend({ WaveShaderMateria });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
  ]);

  return (
    <mesh>
      <planeBufferGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMateria uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Scene1 = () => {
  return (
    <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};

const Plane = () => {
  const ref22 = useRef();
  useFrame(({ clock }) => (ref22.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [Tar.src]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry args={[2.0, 3.0, 40, 40]} />
      <waveShaderMateria uTexture={image} ref={ref22} uColor={"pink"} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 40, position: [0, 0, 6] }}>
      <OrbitControls></OrbitControls>
      <Suspense fallback={null}>
        <Plane />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
