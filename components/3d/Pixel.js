import * as THREE from "three";
import { Canvas, useLoader, extend } from "@react-three/fiber";
import WWW from "../../public/TestImages/WWW.jpg";
import { useRef } from "react";
import glsl from "babel-plugin-glsl/macro";
import { OrbitControls, shaderMaterial } from "@react-three/drei";

const WaveShader = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
  },
  // Vertexshader
  glsl`
    precision mediump float;
    
    varying vec2 vUc;
    void main(){
        vUc = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
  // Fragmentshader
  glsl`
  varying vec2 vUc;
  void main(){
      vec3 texture = texture2D(uTexture, vUc).rgb;
      gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }`
);

extend({ WaveShader });

export default function Pixel() {
  const [image] = useLoader(THREE.TextureLoader, [WWW.src]);

  const mat = new THREE.ShaderMaterial({
    vertexShader: `precision mediump float;
      void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
        `,
    fragmentShader: `
        precision mediump float;
        varying vec2 vUc;

        void main(){
        vUc = uv;
        vec2 newUV = (vUc - vec2(0.5))*aspect + vec2(0.5);
        gl_FragColor = texture2D(uTexture,newUV);
        }
        `,
  });

  const ref2 = useRef(null);

  return (
    <Canvas>
      <mesh>
        <planeBufferGeometry args={[6, 10]}></planeBufferGeometry>
        <OrbitControls></OrbitControls>
        <waveShader ref={ref2} attach="material" uTexture={image}></waveShader>
      </mesh>
    </Canvas>
  );
}
