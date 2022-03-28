import "./style.css";
import * as dat from "lil-gui";
import ReactDOM from "react-dom";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { AdditiveBlending } from "three";

const { StrictMode, Suspense, useRef } = React;

// Debug
const gui = new dat.GUI();

function MyParticles() {
  const [particleTexture] = useTexture(["/textures/particles/2.png"]);
  const particlesPointRef = useRef();
  const particlesBufferRef = useRef();
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    // particlesPointRef.current.rotation.y = elapsedTime * 0.2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = particlesBufferRef.current.attributes.position.array[i3 + 0];
      particlesBufferRef.current.attributes.position.array[i3 + 1] = Math.sin(
        elapsedTime + x
      );
    }
    particlesBufferRef.current.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={particlesPointRef}>
      <bufferGeometry args={[1, 32, 32]} ref={particlesBufferRef}>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          array={colors}
          itemSize={3}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        // color="#ff88cc"
        alphaMap={particleTexture}
        transparent
        // alphaTest={0.001}
        // depthTest={false}
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

function App() {
  return (
    <StrictMode>
      <Suspense fallback={null}>
        <Canvas gl={{ alpha: false }}>
          <MyParticles />
          {/* test cube */}
          {/* <mesh>
            <boxBufferGeometry />
            <meshBasicMaterial />
          </mesh> */}
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
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

ReactDOM.render(<App />, document.getElementById("root"));
