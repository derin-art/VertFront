import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import A8 from "../../public/TestImages/A8.jpg";
import * as THREE from "three";
import CateB from "../../public/TestImages/CateB.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { motion as m } from "framer-motion-3d";
import { Canvas, extend } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import tutVertex from "./Shaders/Tut/vertex.glsl";
import tutFrag from "./Shaders/Tut/fragment.glsl";
import { count } from "console";

const Mat = new THREE.RawShaderMaterial({
  vertexShader: `
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  uniform float uFrequency;
  uniform float uTime;
  varying float vTime;

  attribute vec3 position;

  attribute float aRandom;
  varying float vRandom;
  
  void main()
  {
  
    vec4 modelPositionStuff = modelMatrix * vec4(position, 1.0);
    modelPositionStuff.z = sin(modelPositionStuff.x * 2.0) + modelPositionStuff.z;
    modelPositionStuff.z += sin(modelPositionStuff.y * 2.0);
    
 

    gl_Position = projectionMatrix * viewMatrix * modelPositionStuff;
    vRandom = aRandom;
    vTime = uTime;
  }
  `,
  fragmentShader: `
  precision mediump float;
   varying float vRandom;
   varying float vTime;

  void main()
  {
     gl_FragColor = vec4(vTime, 1.0, 0.0, 1.0);
  }
  `,
  uniforms: {
    uFrequency: { value: 10.0 },
    uTime: { value: 1.0 },
  },
});

extend({ Mat });

/* uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  
  attribute vec3 position; */

const NewShader = shaderMaterial(
  //Uniforms
  { uFrequency: 10.0, uTime: 0.0 },
  //Vertex Shader
  glsl` 
  
   precision mediump float;
  uniform float uFrequency;
  uniform float uTime;
  varying float vTime;


  attribute float aRandom;
  varying float vRandom;
  
  void main()
  {
  
    vec4 modelPositionStuff = modelMatrix * vec4(position, 1.0);
    modelPositionStuff.z = sin(modelPositionStuff.x * 2.0 + uTime) + modelPositionStuff.z;
    modelPositionStuff.z += sin(modelPositionStuff.y * 2.0 + uTime);
  
    
 

    gl_Position = projectionMatrix * viewMatrix * modelPositionStuff;
    vRandom = aRandom;
    vTime = uTime;
  }`,
  //Fragment Shader
  glsl` 
   precision mediump float;
   varying float vRandom;
   varying float vTime;

  void main()
  {
     gl_FragColor = vec4(vRandom, vTime, 0.0, 1.0);
  }`
);

extend({ NewShader });

const ShaderObject = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const box = useMemo(() => new THREE.PlaneGeometry(3, 3, 20, 20), []);
  const rands = box.attributes.position.count;
  const newAtt = new Float32Array(rands);
  for (let i = 0; i < rands; i++) {
    newAtt[i] = Math.random();
  }
  box.setAttribute("aRandom", new THREE.BufferAttribute(newAtt, 1));
  useFrame(({ clock }) => {
    shaderRef.current.uTime = clock.getElapsedTime();
  });

  return (
    <mesh geometry={box}>
      <newShader ref={shaderRef}></newShader>
    </mesh>
  );
};

const PointsBox = () => {
  return (
    <points>
      <boxBufferGeometry args={[1, 1, 1, 5, 5]}></boxBufferGeometry>
      <pointsMaterial sizeAttenuation size={0.1}></pointsMaterial>
    </points>
  );
};
const PointsBoxTwo = () => {
  const count = 500;
  const positions = new Float32Array(count * 3);

  /*   for (let i = 0; i < count * 3; i++) {
    const partOfradius = Math.PI * Math.random();
    positions[i] = Math.sin(partOfradius) * 2;
  } */

  const depletedRad = Math.random() * Math.PI * 2;

  /*  for (let i = 0; i < count * 3; i++) {
    const partOfradius = Math.PI * Math.random();
    if (count % 2) {
    }
    if (count % 3) {
    }
    positions[i] = Math.sin(partOfradius) * 2;
  }
 */
  for (let i = 0; i < count; i++) {
    const partOfradius = Math.PI * Math.random() * 2;

    for (let j = 0; j < 3; j++) {
      if (j === 0) {
        positions[j * i] = Math.cos(partOfradius) * 2;
      } else if (j === 1) {
        positions[j * i] = Math.sin(partOfradius) * 2;
      } else {
        positions[j * i] = 1;
      }
    }
  }

  console.log(positions);

  const particlesGeo = useMemo(() => new THREE.BufferGeometry(), []);
  particlesGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  return (
    <points geometry={particlesGeo}>
      <pointsMaterial sizeAttenuation size={0.1}></pointsMaterial>
    </points>
  );
};

const PointsFinal = React.memo(PointsBoxTwo);

const ShaderObjectFinal = React.memo(ShaderObject);

function Tilt() {
  THREE.ColorManagement.legacyMode = false;
  THREE.ColorManagement.workingColorSpace;

  //Add A Plane
  const base = useLoader(TextureLoader, CateB.src);
  var geometry = new THREE.PlaneGeometry(20, 20, 32);
  var material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: base,
    toneMapped: false,
  });
  var plane = new THREE.Mesh(geometry, material);

  // Control
  var mouseTolerance = 0.2;

  /*  document.onmousemove = function (e) {
    var centerX = window.innerWidth * 0.5;
    var centerY = window.innerHeight * 0.5;

    plane.rotation.y = ((e.clientX - centerX) / centerX) * mouseTolerance;
    plane.rotation.x = ((e.clientY - centerY) / centerY) * mouseTolerance;
  }; */

  const [roate, setRotat] = useState(0);

  const ref2 = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      var centerX = window.innerWidth * 0.5;
      var centerY = window.innerHeight * 0.5;
      var mouseTolerance = 0.2;
      setRotat(((e.clientX - centerX) / centerX) * mouseTolerance);
    });
  }, []);

  //Render loop

  return (
    <Canvas colorManagement={true}>
      <ShaderObjectFinal></ShaderObjectFinal>
      <OrbitControls></OrbitControls>
      <PointsFinal></PointsFinal>
      <m.mesh
        animate={{ rotate: 10, rotateY: roate }}
        ref={ref2}
        material={material}
        transition={{ mass: 2, ease: "easeInOut", duration: 0.001 }}
      >
        <planeBufferGeometry args={[2.7, 4, 10]}></planeBufferGeometry>
      </m.mesh>
    </Canvas>
  );
}

export default Tilt;
