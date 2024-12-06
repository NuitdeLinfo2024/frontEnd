import React, { useRef, useState } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import About from './components/About';
import Captcha from './components/Captcha'; // Import the Captcha component
import Qcm from './components/Qcm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayPauseControl from './components/PlayPauseControl';
import VolumeControl from './components/VolumeControl';
import Parallax from './components/Parallax';
import Logo from './components/Logo';
import './App.css';
import WeatherController from './weatherApi/WeatherController';


const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);

  if(localStorage.getItem('useCaptcha') === 'true') {
    if (!isCaptchaComplete) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>CAPTCHA Interactif 😄</h1>
          <Captcha onComplete={() => setIsCaptchaComplete(true)} />
        </div>
      );
    }
  }

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        {/* Controls */}
      <PlayPauseControl audioRef={audioRef} />
      {(localStorage.getItem('useVolume') === 'true') &&  <VolumeControl audioRef={audioRef} />}
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Parallax />} />
            <Route path="/about" element={<About />} />
            <Route path="/qcm" element={<Qcm />} />
            <Route path="/weather" element={<WeatherController lat={35} lon={139} />} />
          </Routes>
        </Box>
        <Logo />
      </Container>
      {/* Audio element */}
      <audio ref={audioRef} src="podcast2.mp3" preload="auto">
        <track kind="captions" src="captions_en.vtt" srcLang="en" label="English" default />
      </audio>
    </Router>
  );
};

export default App;