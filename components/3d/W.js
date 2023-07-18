import { Canvas, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro"; // <--- Module to import

const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {},

  // Vertexshader
  glsl`            // <--- Here in Use
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragmentshader
  glsl`            // <--- Here in Use
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
);

extend({ WaveShaderMaterial });

const Plane = () => {
  return (
    <mesh>
      <planeBufferGeometry args={[2, 2, 16, 16]} />
      <waveShaderMaterial attach="material" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={1.0} />
      <Plane />
    </Canvas>
  );
};

export default Scene;
