import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function Plan() {
  let geom = new THREE.PlaneGeometry(16, 9, 20, 20);
  var material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
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

  planeCurve(geom, 4);
  return (
    <Canvas>
      <OrbitControls></OrbitControls>
      <mesh geometry={geom} material={material}></mesh>
    </Canvas>
  );
}
