'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

const BOARD_SIZE = 10;
const TILE_SIZE = 1.2;

// Example snakes and ladders (start: end)
const snakes: Record<number, number> = { 16: 6, 48: 30, 62: 19, 64: 60, 93: 68, 95: 24, 97: 76, 98: 78 };
const ladders: Record<number, number> = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

function getPosition(square: number): [number, number, number] {
    const row = Math.floor((square - 1) / BOARD_SIZE);
    let col = (square - 1) % BOARD_SIZE;
    if (row % 2 === 1) col = BOARD_SIZE - 1 - col;
    return [
        col * TILE_SIZE - (BOARD_SIZE / 2) * TILE_SIZE + TILE_SIZE / 2,
        0.6,
        row * TILE_SIZE - (BOARD_SIZE / 2) * TILE_SIZE + TILE_SIZE / 2,
    ];
}

function Board() {
    const tiles = [];
    for (let i = 1; i <= 100; i++) {
        const pos = getPosition(i);
        tiles.push(
            <mesh key={i} position={pos}>
                <boxGeometry args={[TILE_SIZE, 0.1, TILE_SIZE]} />
                <meshStandardMaterial color={i % 2 === 0 ? '#e0cda9' : '#b8a47e'} />
            </mesh>
        );
    }
    return <>{tiles}</>;
}

function Player({ position }: { position: number }) {
    const pos = getPosition(position);
    return (
        <mesh position={pos}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

export default function HomePage() {
    const [playerPos, setPlayerPos] = useState(1);

    function rollDice() {
        const roll = Math.floor(Math.random() * 6) + 1;
        let next = playerPos + roll;
        if (next > 100) next = 100;
        if (snakes[next]) next = snakes[next];
        if (ladders[next]) next = ladders[next];
        setPlayerPos(next);
    }

    // Assume nav height is 64px (h-16). Adjust if your nav is different.
    return (
        <div className="w-screen h-screen bg-[#222] pt-16 relative">
            <button
                className="absolute z-10 top-6 left-6 px-8 py-4 text-lg rounded-xl border-none bg-amber-300 text-[#222] cursor-pointer shadow"
                onClick={rollDice}
            >
                Roll Dice
            </button>
            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 15, 15], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 20, 10]} intensity={1} />
                    <Board />
                    <Player position={playerPos} />
                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    );
}
