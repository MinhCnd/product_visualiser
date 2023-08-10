import React, { useRef, useEffect } from 'react';

interface CanvasProps {
  width: number;
  height: number;
  imageSrc: string;
  text: string;
}

export default function Canvas({ width, height, imageSrc, text }: CanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        const image = new Image();
        image.src = imageSrc;

        image.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          context.font = `20px Arial`;
          context.fillText(text, 20, 20);
        };
      }
    }
  }, [imageSrc, text]);

  return <canvas ref={canvasRef} width={width} height={height} className="canvas" />;
}
