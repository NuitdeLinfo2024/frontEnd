import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const PlayPodcastButton: React.FC = () => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('R');
  const [volume, setVolume] = useState<number>(0);
  const [imageSrc, setImageSrc] = useState<string>('/colors/Smooth_Gradient_1.png');
  const audioRef = useRef<HTMLAudioElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Array of image sources
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

  ];

  // Randomly select a color when the component mounts
  useEffect(() => {
    const colors = ['R', 'G', 'B'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(randomColor);
  }, []);

  const handleBoxToggle = () => {
    setShowBox(!showBox);

    // Randomize the image and selected color when the box is toggled
    if (!showBox) {
      const randomImage = imageSources[Math.floor(Math.random() * imageSources.length)];
      const colors = ['R', 'G', 'B'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setSelectedColor(randomColor);
      setImageSrc(randomImage); // Update image source to trigger re-render
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Set canvas size to match the image size
    const imgWidth = imageRef.current?.width || 0;
    const imgHeight = imageRef.current?.height || 0;
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // Set the canvas position to match the image position
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      canvas.style.position = 'absolute';
      canvas.style.top = `${rect.top}px`;
      canvas.style.left = `${rect.left}px`;
    }

    // Clear and redraw the image on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current!, 0, 0);

    // Get the pixel color at the click location
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const imageData = ctx.getImageData(x, y, 1, 1).data;

    // Extract the color channel based on the selected color
    let colorValue: number;
    switch (selectedColor) {
      case 'R':
        colorValue = imageData[0]; // Red channel
        break;
      case 'G':
        colorValue = imageData[1]; // Green channel
        break;
      case 'B':
        colorValue = imageData[2]; // Blue channel
        break;
      default:
        colorValue = 0;
    }

    // Normalize color value to a volume (0-1 range)
    const normalizedVolume = colorValue / 255;
    setVolume(normalizedVolume);
    if (audioRef.current) {
      audioRef.current.volume = normalizedVolume;
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <IconButton onClick={handleBoxToggle} aria-label="open volume box">
        <VolumeUpIcon />
      </IconButton>

      {/* Conditional rendering of the gradient box */}
      {showBox && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid black',
            padding: 2,
            backgroundColor: 'white',
            boxShadow: 3,
          }}
        >
          <audio ref={audioRef} src="/podcast2.mp3" preload="auto">
            <track kind="captions" />
          </audio>
          <IconButton onClick={handlePlayPause} aria-label="play/pause">
            {audioRef.current?.paused ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
          
          {/* Image box with gradient and random color */}
          <img
            ref={imageRef}
            src={imageSrc} // Use the state to set the src
            alt="Gradient"
            onClick={handleImageClick}
            style={{ width: '200px', height: '200px', display: 'block', margin: '0 auto' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
  <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
    Selected Color: {selectedColor}
  </p>
  <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
    Volume: {volume.toFixed(2)}
  </p>
</Box>
        </Box>
      )}
    </Box>
  );
};

export default PlayPodcastButton;
