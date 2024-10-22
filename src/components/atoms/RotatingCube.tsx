import { useRef } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface RotatingCubeProps extends MeshProps {
  position: [number, number, number];
}
const RotatingCube: React.FC<RotatingCubeProps> = ({ position }) => {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh position={position} ref={meshRef} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

export default RotatingCube;
