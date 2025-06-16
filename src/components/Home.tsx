'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';

interface Experience {
    year: string;
    title: string;
    description: string;
    skills: string[];
    achievement?: string;
}

const experiences: Experience[] = [
    {
        year: '2020',
        title: 'Software Engineering Intern at Myntra',
        description: 'Started my journey at Myntra as an intern building internal dashboards.',
        skills: ['React', 'Node.js', 'MongoDB']
    },
    {
        year: '2021–2024',
        title: 'Full-Time Engineer at Myntra',
        description: 'Transitioned from intern to full-time. Built seller onboarding, coupon systems, and internal tools.',
        skills: ['React', 'TypeScript', 'Node.js', 'Java', 'MongoDB']
    },
    {
        year: '2024–Present',
        title: 'Full Stack Engineer at Moveworks',
        description: 'Currently working at Moveworks on DSL editors, LLM annotation tools, and deployment enhancements.',
        skills: ['React', 'TypeScript', 'Django', 'Docker', 'Monaco Editor', 'ANTLR']
    }
];

function GrowthPath() {
    return (
        <group>
            <mesh>
                <tubeGeometry 
                    args={[
                        new THREE.CatmullRomCurve3([
                            new THREE.Vector3(-4, 0, 0),
                            new THREE.Vector3(0, 1, 0),
                            new THREE.Vector3(4, 0, 0)
                        ]),
                        64,
                        0.05,
                        8,
                        false
                    ]}
                />
                <meshStandardMaterial color="#00ff88" />
            </mesh>
        </group>
    );
}

function ExperienceNode({ position, experience, isActive, onClick }: { 
    position: [number, number, number];
    experience: Experience;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <group position={position} onClick={onClick}>
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color={isActive ? "#00ff88" : "#4488ff"} />
                </mesh>
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.2}
                    color={isActive ? "#00ff88" : "white"}
                >
                    {experience.year}
                </Text>
            </Float>
        </group>
    );
}

function SkillCloud({ skills, position }: { skills: string[]; position: [number, number, number] }) {
    return (
        <group position={position}>
            {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2;
                const radius = 1.5;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <Float key={skill} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Text
                            position={[x, 0, z]}
                            fontSize={0.2}
                            color="#c0ffee"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {skill}
                        </Text>
                    </Float>
                );
            })}
        </group>
    );
}

function Scene() {
    const [activeExperience, setActiveExperience] = useState<number>(0);

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />

            <GrowthPath />

            {experiences.map((exp, index) => (
                <ExperienceNode
                    key={exp.year}
                    position={[-4 + index * 4, 0, 0]}
                    experience={exp}
                    isActive={index === activeExperience}
                    onClick={() => setActiveExperience(index)}
                />
            ))}

            {/* Separate experience card to avoid overlap */}
            <group position={[0, -3.5, 0]}>
                <mesh>
                    <planeGeometry args={[6, 2.5]} />
                    <meshStandardMaterial color="black" transparent opacity={0.6} />
                </mesh>
                <Text
                    position={[0, 0.8, 0.01]}
                    fontSize={0.25}
                    color="#00ff88"
                    anchorX="center"
                    maxWidth={5}
                >
                    {experiences[activeExperience].title}
                </Text>
                <Text
                    position={[0, 0.3, 0.01]}
                    fontSize={0.18}
                    color="white"
                    anchorX="center"
                    maxWidth={5}
                >
                    {experiences[activeExperience].description}
                </Text>
                {experiences[activeExperience].achievement && (
                    <Text
                        position={[0, -0.3, 0.01]}
                        fontSize={0.15}
                        color="#00ff88"
                        anchorX="center"
                        maxWidth={5}
                    >
                        {experiences[activeExperience].achievement}
                    </Text>
                )}
            </group>

            <SkillCloud
                skills={experiences[activeExperience].skills}
                position={[0, 2, 0]}
            />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />
        </>
    );
}

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="absolute top-10 left-0 w-full p-8 z-10">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Hi, I&apos;m Atishay Jain
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                    Full Stack Engineer passionate about building intuitive tools and impactful platforms.
                    Experienced in creating DSL editors, scalable UIs, and backend systems that drive real business value.
                </p>
            </div>

            <div className="w-full h-screen">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <Scene />
                </Canvas>
            </div>

            <div className="absolute bottom-8 left-8 bg-black/50 p-4 rounded-lg text-sm">
                Click on the timeline nodes to explore my journey<br />
                Drag to rotate the view
            </div>
        </div>
    );
}
