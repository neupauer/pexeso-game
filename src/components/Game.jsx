import pexese_texture_back from "../textures/pexeso/back.png";
import pexese_texture_1 from "../textures/pexeso/1.jpg";
import pexese_texture_2 from "../textures/pexeso/2.jpg";
import pexese_texture_3 from "../textures/pexeso/3.jpg";
import pexese_texture_4 from "../textures/pexeso/4.jpg";
import pexese_texture_5 from "../textures/pexeso/5.jpg";
import pexese_texture_6 from "../textures/pexeso/6.jpg";
import pexese_texture_7 from "../textures/pexeso/7.jpg";
import pexese_texture_8 from "../textures/pexeso/8.jpg";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import React, { useMemo, useRef, useState } from "react";

import Debug from "./Debug";
import Scene from "./Scene";
import useSet from "../hooks/useSet";
import useScore from "../hooks/useScore";

const textureLoader = new THREE.TextureLoader();

const TEXTURES = [
  pexese_texture_1,
  pexese_texture_2,
  pexese_texture_3,
  pexese_texture_4,
  pexese_texture_5,
  pexese_texture_6,
  pexese_texture_7,
  pexese_texture_8,
];

const CARDS_TEXTURES = [...TEXTURES, ...TEXTURES].sort(() => 0.5 - Math.random());

const DONE = [];

function usePositions(cols, rows, gap = 0.125) {
  return useMemo(() => {
    const positions = [];
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const X = col + col * gap;
        const Y = row + row * gap;
        const Z = 0;

        positions.push([X, Y, Z]);
      }
    }
    return positions;
  }, [cols, rows, gap]);
}

function PexesoCard({ texture, done, active, onClick, color, ...restProps }) {
  const mesh = useRef();

  const backImg = textureLoader.load(pexese_texture_back);
  const frontImg = textureLoader.load(texture);

  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (active || done) {
      if (mesh.current.rotation.x < Math.PI) {
        mesh.current.rotation.x += 0.2;
      } else {
        mesh.current.rotation.x = Math.PI;
      }
    } else {
      if (mesh.current.rotation.x > 0) {
        mesh.current.rotation.x -= 0.2;
      } else {
        mesh.current.rotation.x = 0;
      }
    }
  });

  return (
    <mesh
      {...restProps}
      ref={mesh}
      scale={!done && hovered ? 1.05 : 1}
      onClick={done ? () => {} : onClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 0.0625]} />
      <meshStandardMaterial map={active || done ? frontImg : backImg} />
    </mesh>
  );
}

function PexesoBorad() {
  const [score, increment, decrement] = useScore();
  const positions = usePositions(4, 4);
  const [activeCards, activeCardsActions] = useSet();

  const handleCardClick = (idx) => {
    // Handle hidden state & score
    if (activeCards.length === 1) {
      // Match
      if (CARDS_TEXTURES[activeCards[0]] === CARDS_TEXTURES[idx]) {
        increment(5);
        DONE.push(activeCards[0]);
        DONE.push(idx);
      } else {
        decrement(2); // Not Match
      }
    }

    // Handle active (flipped) state
    if (activeCardsActions.has(idx)) {
      activeCardsActions.remove(idx);
    } else if (activeCards.length < 2) {
      activeCardsActions.add(idx);
    } else {
      activeCardsActions.reset([idx]);
    }
  };

  return (
    <>
      <Scene>
        {positions.map((position, idx) => (
          <PexesoCard
            key={idx}
            position={position}
            texture={CARDS_TEXTURES[idx]}
            done={DONE.includes(idx)}
            active={activeCardsActions.has(idx)}
            onClick={() => handleCardClick(idx)}
          />
        ))}
      </Scene>
    </>
  );
}

function StatusBar({ ...restProps }) {
  const [score] = useScore();

  return (
    <div {...restProps} className="fixed w-full bottom-0 z-50 p-4 pointer-events-none select-none">
      <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur rounded-lg px-8 py-6">
        <p className="text-white">
          Score: <span className="font-bold">{score}</span>
        </p>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="w-screen h-screen">
      <StatusBar />
      <PexesoBorad />
    </div>
  );
}

export default Game;
