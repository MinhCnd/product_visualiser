import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';

interface SceneProps {
  width: number;
  height: number;
}



export default function Scene({ width, height }: SceneProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvas = canvasRef.current;
  if (canvas) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({canvas});

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 3;
    const animate = () => {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
    animate();

    renderer.render( scene, camera );

  }

  return <canvas ref={canvasRef} width={width} height={height} className="scene" />;
}


