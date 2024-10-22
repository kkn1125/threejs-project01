import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

const MovableCube = () => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  const [jumping, setJumping] = useState(false);
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 5, 0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const speed = 5;
      switch (event.key) {
        case "ArrowUp":
          api.velocity.set(0, velocity.current[1], -speed);
          break;
        case "ArrowDown":
          api.velocity.set(0, velocity.current[1], speed);
          break;
        case "ArrowLeft":
          api.velocity.set(-speed, velocity.current[1], 0);
          break;
        case "ArrowRight":
          api.velocity.set(speed, velocity.current[1], 0);
          break;
        case " ":
          if (!jumping) {
            setJumping(true);
            api.velocity.set(velocity.current[0], 10, velocity.current[2]);
            setTimeout(() => setJumping(false), 1000);
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        api.velocity.set(0, velocity.current[1], 0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [api, jumping]);

  useFrame(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    /* 
    api.position.subscribe((p) => {
      position.current = p;
      if (p[1] < -10) {
        api.position.set(0, 5, 0);
        api.velocity.set(0, 0, 0);
      }
    });
     */
    api.position.subscribe((p) => (position.current = p));
  });

  return (
    <mesh ref={ref as any} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

export default MovableCube;
