import React, { Suspense, useRef, useState, useEffect } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";

// Page State
import state from "./components/state";

// R3F & Drei
import { Canvas, useFrame } from "react-three-fiber";
import { Html, useGLTFLoader } from "drei";

//Intersection Observer
import { useInView } from "react-intersection-observer";

//import model
const Model = ({ modelPath }) => {
  const gltf = useGLTFLoader(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

//html from drei
const HTMLContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
  scaleA,
  scaleB,
  scaleC
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0
  });
  useEffect(() => {// eslint-disable-next-line react-hooks/exhaustive-deps
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh
          ref={ref}
          scale={[scaleA, scaleB, scaleC]}
          position={[20, -35, 0]}
        >
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div ref={refItem} className="container">
            <h1 className="title">{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {
  const [events] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath="/polarbear.gltf"
            positionY={250}
            scaleA={0.018}
            scaleB={0.018}
            scaleC={0.018}
            bgColor="royalblue"
          >
            <h1 className="title">Meet Polly the polar bear</h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/ice.gltf"
            positionY={0}
            scaleA={4}
            scaleB={4}
            scaleC={4}
            bgColor="#72B0BB"
          >
            <h1 className="title">
              Ice caps are melting
              <br /> meaning her habitat <br /> is in danger
            </h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/scene.gltf"
            positionY={-250}
            scaleA={4}
            scaleB={4}
            scaleC={4}
            bgColor="#636567"
          >
            <h1 className="title">Help her reach safety by playing</h1>
          </HTMLContent>
        </Suspense>
      </Canvas>

      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.sections * 100}vh` }} />
      </div>
    </>
  );
}
