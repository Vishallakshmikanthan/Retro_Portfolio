import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, useAnimations } from '@react-three/drei';

function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);
  const { mouse } = useThree();

  useEffect(() => {
    // Play the first animation if it exists
    if (animations && animations.length > 0) {
      const firstAction = actions[animations[0].name];
      if (firstAction) firstAction.play();
    }
  }, [actions, animations]);

  useFrame((state) => {
    if (group.current) {
      // Smoothly rotate the group based on mouse position
      // We use mouse.x/y which ranges from -1 to 1
      const targetRotationY = mouse.x * 0.4;
      const targetRotationX = -mouse.y * 0.2;
      
      group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.1;
      group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

export default function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas 
        shadows={false} 
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Center>
            <Model url="models/dev.glb" />
          </Center>
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={1}
          maxDistance={25}
          autoRotate={false} /* Disabled autoRotate to favor mouse-interaction */
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('models/dev.glb');
