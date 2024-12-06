import React from 'react';
import { Box } from '@mui/material';

const FireworkEffect: React.FC = () => {
  const createParticles = () => {
    return Array.from({ length: 20 }).map((_, index) => (
      <Box
        key={index}
        sx={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: getRandomColor(),
          animation: 'explode 1s ease-out',
          animationDelay: `${Math.random()}s`,
          transformOrigin: 'center',
        }}
      />
    ));
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F7DC6F', '#8E44AD'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 100,
        height: 100,
        overflow: 'visible',
        '@keyframes explode': {
          '0%': {
            transform: 'scale(0)',
            opacity: 1,
          },
          '100%': {
            transform: `scale(${Math.random() * 3 + 1}) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`,
            opacity: 0,
          },
        },
      }}
    >
      {createParticles()}
    </Box>
  );
};

export default FireworkEffect;