import { ThreeElements } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<Mesh>(null!);
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default Box;
