import React from 'react';
import { Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography>
        This template demonstrates a basic React SPA with Material UI using TypeScript.
      </Typography>
    </div>
  );
};

export default About;
