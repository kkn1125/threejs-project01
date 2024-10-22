import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import MovableCube from "./components/atoms/MovableCube";
import { useRef } from "react";
import { Vector3 } from "three";

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  return (
    <group>
      <mesh ref={ref as any} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='brown' />
      </mesh>
    </group>
  );
}

function App() {
  const cameraRef = useRef();
  const cubePosition = useRef(new Vector3(0, 5, 0));

  return (
    <div style={{ width: "100vw", height: "100vh", boxSizing: "border-box" }}>
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 75 }} ref={cameraRef}>
        <Physics gravity={[0, -9.81, 0]}>
          <color attach='background' args={["skyblue"]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <MovableCube setCubePosition={(pos) => cubePosition.current.copy(pos)} />
          <Ground />
          <OrbitControls
            target={cubePosition.current}
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
