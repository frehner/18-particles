import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import ReactDOM from "react-dom";
import * as React from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  useTexture,
  useHelper,
} from "@react-three/drei";

const { StrictMode, Suspense, useRef } = React;

// Debug
const gui = new dat.GUI();

function App() {
  return (
    <StrictMode>
      <Suspense fallback={null}>
        <Canvas gl={{ alpha: false }}>
          <points>
            <bufferGeometry args={[1, 32, 32]}>
              <bufferAttribute
                attachObject={["attributes", "position"]}
                array={positions}
                itemSize={3}
                count={positions.length / 3}
              />
            </bufferGeometry>
            <pointsMaterial size={0.1} sizeAttenuation />
          </points>
          <PerspectiveCamera
            makeDefault
            args={[75, window.innerWidth / window.innerHeight, 0.1, 100]}
            position={[1, 1, 3]}
          />
          <OrbitControls enableDamping />
        </Canvas>
      </Suspense>
    </StrictMode>
  );
}

const count = 5_000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

ReactDOM.render(<App />, document.getElementById("root"));
