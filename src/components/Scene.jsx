import React from "react";
import { Canvas } from "@react-three/fiber";

function Scene({ children, ...restProps }) {
  return (
    <Canvas className="w-screen h-screen" {...restProps}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
}

export default Scene;
