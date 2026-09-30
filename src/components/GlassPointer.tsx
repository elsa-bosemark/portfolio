import { useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { makePointer, studioEnvironment } from "./LiquidCursor";

function PointerMesh() {
  const { gl } = useThree();
  const geometry = useMemo(() => makePointer(), []);
  const environment = useMemo(() => {
    const texture = studioEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const target = generator.fromEquirectangular(texture);
    texture.dispose(); generator.dispose(); return target;
  }, [gl]);
  useEffect(() => () => { geometry.dispose(); environment.dispose(); }, [geometry, environment]);
  return <mesh geometry={geometry} rotation={[.12, .12, 0]} scale={.7}>
    <meshPhysicalMaterial attach="material-0" color="#101820" metalness={.7} roughness={.12} clearcoat={1} ior={1.45} reflectivity={.5} clearcoatRoughness={.04} envMap={environment.texture} envMapIntensity={.75}/>
    <meshPhysicalMaterial attach="material-1" color="#effaff" metalness={1} roughness={.075} clearcoat={1} ior={1.45} clearcoatRoughness={.03} envMap={environment.texture} envMapIntensity={3} iridescence={.65} iridescenceIOR={1.45} iridescenceThicknessRange={[150,450]}/>
  </mesh>;
}
export default function GlassPointer() {
  return <Canvas orthographic camera={{ position: [0,0,5], zoom: 29 }} dpr={[1,2]} frameloop="demand" gl={{ alpha: true, antialias: true }}><ambientLight intensity={.3}/><directionalLight position={[2,5,5]} intensity={2}/><PointerMesh/></Canvas>;
}
