import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { getRandomElement } from '../utils';

interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audioRef }) => {
  const [selectedColor, setSelectedColor] = useState<string>('R');
  const [volume, setVolume] = useState<number>(0.5);
  const [imageSrc, setImageSrc] = useState<string>('/colors/Smooth_Gradient_1.png');
  const [showBox, setShowBox] = useState<boolean>(false);
  const [boxPosition, setBoxPosition] = useState<{ top: number; left: number }>({
    top: window.innerHeight / 2 - 150,
    left: window.innerWidth / 2 - 150,
  });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageSources = [
    '/colors/Smooth_Gradient_1.png',
    '/colors/Smooth_Gradient_2.png',
    '/colors/Smooth_Gradient_3.png',
    '/colors/Smooth_Gradient_4.png',
    '/colors/Smooth_Gradient_5.png',
    '/colors/Smooth_Gradient_6.png',
    '/colors/Smooth_Gradient_7.png',
    '/colors/Smooth_Gradient_8.png',
    '/colors/Smooth_Gradient_9.png',
    '/colors/Smooth_Gradient_10.png',
    '/colors/Smooth_Gradient_11.png',
    '/colors/Smooth_Gradient_12.png',
    '/colors/Smooth_Gradient_13.png',
    '/colors/Smooth_Gradient_14.png',
    '/colors/Smooth_Gradient_15.png',
    '/colors/Smooth_Gradient_16.png',
    '/colors/Smooth_Gradient_17.png',
    '/colors/Smooth_Gradient_18.png',
    '/colors/Smooth_Gradient_19.png',
    '/colors/Smooth_Gradient_20.png'
    // Add more sources as needed
  ];

  useEffect(() => {
    const colors = ['R', 'G', 'B'];
    const randomColor = getRandomElement(colors);
    const randomImage = getRandomElement(imageSources);
    setSelectedColor(randomColor);
    setImageSrc(randomImage);
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgWidth = imageRef.current?.width || 0;
    const imgHeight = imageRef.current?.height || 0;
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current!, 0, 0);

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const imageData = ctx.getImageData(x, y, 1, 1).data;

    let colorValue: number;
    switch (selectedColor) {
      case 'R':
        colorValue = imageData[0];
        break;
      case 'G':
        colorValue = imageData[1];
        break;
      case 'B':
        colorValue = imageData[2];
        break;
      default:
        colorValue = 0;
    }

    const normalizedVolume = colorValue / 255;
    setVolume(normalizedVolume);

    if (audioRef.current) {
      audioRef.current.volume = normalizedVolume;
    }

    // Randomize the box position
    const randomTop = Math.random() * (window.innerHeight - 300);
    const randomLeft = Math.random() * (window.innerWidth - 300);
    setBoxPosition({ top: randomTop, left: randomLeft });
  

    // Randomize the selected color and image
    const colors = ['R', 'G', 'B'];
    setSelectedColor(getRandomElement(colors));
    setImageSrc(getRandomElement(imageSources));
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          textAlign: 'center',
          zIndex : 9999,
        }}
      >
        <IconButton onClick={() => setShowBox(!showBox)} aria-label="volume">
          <VolumeUpIcon />
        </IconButton>
      </Box>
      {showBox && (
        <Box
          sx={{
            position: 'fixed',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
            textAlign: 'center',
            width: '300px',
            height: '300px',
            zIndex: 9999,
          }}
          style={{ top: boxPosition.top, left: boxPosition.left }}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Gradient"
            onClick={handleImageClick}
            style={{ width: '200px', height: '200px', display: 'block', margin: '0 auto', zIndex  : 9999}}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Selected Color: {selectedColor}
          </p>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Volume: {volume.toFixed(2)}
          </p>
        </Box>
      )}
    </>
  );
};

export default VolumeControl;
