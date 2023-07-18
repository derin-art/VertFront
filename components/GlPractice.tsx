import * as THREE from "three";
import { motion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import glsl from "babel-plugin-glsl/macro";

import { extend, Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import A10 from "../public/TestImages/A10.jpg";
import A8 from "../public/TestImages/A8.jpg";
import { Vector2 } from "three";

const ShaderText = shaderMaterial(
  //Uniforms
  {
    uRes: new THREE.Vector2(0.0, 0.0),
    uMouse: new THREE.Vector2(0.0, 0.0),
    uTime: 0.0,
    uTexture: new THREE.Texture(),
    uTexture2: new THREE.Texture(),
    uHover: false,
  },
  //Vertex Shader
  glsl`
     precision mediump float;
     uniform vec2 uRes;
     uniform vec2 uMouse;
     uniform float uTime;
     varying vec2 vMouse;
     varying vec2 vRes;
     varying float vTime;
     varying vec2 v_uv;
     
     void main(){
         vec4 modelPositionA = modelMatrix * vec4(position, 1.0);

         gl_Position = projectionMatrix * modelPositionA * viewMatrix;
         vRes = uRes;
         vMouse = uMouse;
         vTime = uTime;
         	v_uv = uv;
     }
     `,
  //Fragment Shader
  glsl`
       precision mediump float;
       #pragma glslify: snoise2 = require('glsl-noise/simplex/2d');
       #pragma glslify: snoise3 = require('glsl-noise/simplex/3d');
       #pragma glslify: cnoise2 = require('glsl-noise/classic/2d');
        varying vec2 vMouse;
        varying vec2 vRes;
        varying float vTime;
           varying vec2 v_uv;
           uniform sampler2D uTexture;
           uniform sampler2D uTexture2;
        float circle(in vec2 _st, in float _radius, in float blurriness){
	vec2 dist = _st;
	return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0121327014 ), vec3( 0.5 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.00845 ) ) ) ), value.a );
}

       void main(){
         vec4 image = texture2D(uTexture, v_uv);
vec4 hover = texture2D(uTexture2, v_uv);
image = sRGBToLinear(image);
hover = sRGBToLinear(hover);

       vec2 mouse = vMouse * -0.5;
       mouse.y *= vRes.y/vRes.x;
    
       mouse *= -1.;
         vec2 normalised = vMouse/vRes;
         vec2 st = gl_FragCoord.xy/vRes;
    
        float y = sin(vTime)/st.x;
        vec3 color = vec3(y);


        	// We manage the device ratio by passing PR constant
	vec2 res = vRes * 2.0;
	vec2 st2 = gl_FragCoord.xy / res.xy - vec2(0.5);
	// tip: use the following formula to keep the good ratio of your coordinates
	st2.y *= vRes.y / vRes.x;

	// We readjust the mouse coordinates
	vec2 mouse2 = vMouse * -0.5;
	// tip2: do the same for your mouse
	mouse2.y *= vRes.y / vRes.x;
	mouse2 *= -1.;



        	vec2 circlePos =   st2 + mouse2;
   
	float c = circle(circlePos, 0.1, 0.3) * 2.5;
        vec2 colorV2 = vec2(y);
           gl_FragColor = vec4( vec3(c), 1.0);
           float offx = v_uv.x + sin(v_uv.y + vTime * .1);
           float offy = v_uv.y - vTime * 0.1 - cos(vTime * .001) ;
           float n = snoise3(vec3(offx, offy, vTime * 0.1) * 4.0) - 1.2;
           float noiseCircle = smoothstep(0.3, 0.5, n + c);
           noiseCircle = floor(noiseCircle);
           vec4 finalImage = mix(image, hover, noiseCircle);


	gl_FragColor = vec4(vec3(noiseCircle), 1.);

  gl_FragColor = finalImage;
       }
       `
);

extend({ ShaderText });

const Plane = (props: {
  screenSize: { x: number; y: number };
  mousePos: { x: number; y: number };
}) => {
  const shaderRef = useRef<THREE.ShaderMaterial>();
  const meshRef = useRef<THREE.Mesh>();
  const [hover, setHover] = useState(false);
  const [texture] = useLoader(THREE.TextureLoader, [A10.src]);
  const [texture2] = useLoader(THREE.TextureLoader, [A8.src]);
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uRes = new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      );
      shaderRef.current.uMouse = new THREE.Vector2(
        props.mousePos.x,
        props.mousePos.y
      );
      shaderRef.current.uTime = clock.getElapsedTime();
      shaderRef.current.uHover = hover;
      meshRef.current?.rotation.set(
        -props.mousePos.y * (Math.PI / 150),
        props.mousePos.x * 0.02,
        0
      );
    }
  });
  /*  console.log(props.screenSize, props.mousePos); */
  /*   useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uRes = new THREE.Vector2(
        props.screenSize?.x,
        props.screenSize?.y
      );
    }
  }, [props.screenSize?.x / props.screenSize?.y]);

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uMouse = new THREE.Vector2(
        props.mousePos?.x,
        props.mousePos?.y
      );
    }
  }, [props.mousePos?.x / props.mousePos?.y]);
 */
  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
      }}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      <shaderText
        uTexture2={texture2}
        uTexture={texture}
        ref={shaderRef}
      ></shaderText>
      <planeBufferGeometry args={[4, 4]}></planeBufferGeometry>
    </mesh>
  );
};

export default function GlPractice() {
  const [res, setRes] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setRes((prev) => {
      return { ...prev, x: window.innerWidth, y: window.innerHeight };
    });
  }, []);
  useEffect(() => {
    const runSize = () => {
      setRes((prev) => {
        return { ...prev, x: window.innerWidth, y: window.innerHeight };
      });
    };
    const runMouse = (e: MouseEvent) => {
      setMousePos((prev) => {
        return {
          ...prev,
          x: -(e.clientX / window.innerWidth) * 2 + 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        };
      });
    };
    window.addEventListener("resize", runSize);
    window.addEventListener("mousemove", runMouse);
    return () => {
      window.removeEventListener("mousemove", runMouse);
      window.removeEventListener("resize", runSize);
    };
  }, []);
  return (
    <div className="w-full h-screen ">
      <Canvas dpr={2.0} className="border w-full h-screen border">
        <OrbitControls></OrbitControls>
        <Suspense>
          <Plane mousePos={mousePos} screenSize={res}></Plane>
        </Suspense>
      </Canvas>
    </div>
  );
}
