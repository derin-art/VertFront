import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/7qomj3apbXwwBkUU/scene.splinecode"
  );
  return (
    <>
      {nodes && (
        <Canvas>
          <color attach="background" args={["#5e6063"]} />
          <group dispose={null}>
            <group
              name="Component"
              position={[-24.63, -3.92, 66.97]}
              rotation={[-2.95, 0.11, -2.37]}
              scale={1}
            >
              <mesh
                name="Cube 2"
                geometry={nodes["Cube 2"].geometry}
                material={materials["Cube 2 Material"]}
                castShadow
                receiveShadow
                rotation={[0, 0, Math.PI / 2]}
              />
              <mesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials["Cube Material"]}
                castShadow
                receiveShadow
              />
            </group>
            <directionalLight
              name="Directional Light"
              castShadow
              intensity={0.7}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={-10000}
              shadow-camera-far={100000}
              shadow-camera-left={-500}
              shadow-camera-right={500}
              shadow-camera-top={500}
              shadow-camera-bottom={-500}
              position={[200, 300, 300]}
            />
            <OrthographicCamera
              name="1"
              makeDefault={true}
              zoom={1.51}
              far={100000}
              near={-100000}
              position={[0, 0, 1000]}
              rotation={[0, 0, 0]}
            />
            <hemisphereLight
              name="Default Ambient Light"
              intensity={0.75}
              color="#b48bde"
            />
          </group>
        </Canvas>
      )}
    </>
  );
}
