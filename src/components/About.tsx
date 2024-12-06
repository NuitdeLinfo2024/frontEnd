import React from 'react';
import { Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        L'équipe BDC
      </Typography>
      <Typography>
        Ce projet a été fait par :
      </Typography>
      <ul>
        <li>PICAUD Nicolas : Leader + Implémentation DevOps + Implémentation Défi API Météo</li>
        <li>ROCHDI Rana : Implémentation Parallax</li>
        <li>MAHAMOUDOU Hanane : Design Site + Implémentation QCM + Implémentation Texte Défi Principal</li>
        <li>CHERBLANC Noah : Implémentation Défi QR Codes Pokémon</li>
        <li>ROSANO Romain : Implémentation Défi CAPTCHA Interactif</li>
        <li>ROUX Yann : Implémentation Défi Logo Caché</li>
        <li>ROUBIA Akram: Implémentation Défi CAPTCHA Interactif + Implémentation Défi Dark UX</li>
      </ul>
    </div>
  );
};

export default About;
