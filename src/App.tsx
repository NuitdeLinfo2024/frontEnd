import React, { useRef } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import About from './components/About';
import Qcm from './components/Qcm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayPauseControl from './components/PlayPauseControl';
import VolumeControl from './components/VolumeControl';
import Parallax from './components/Parallax';
import Logo from './components/Logo';
import './App.css';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        {/* Controls */}
      <PlayPauseControl audioRef={audioRef} />
      <VolumeControl audioRef={audioRef} />
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Parallax />} />
            <Route path="/about" element={<About />} />
            <Route path="/qcm" element={<Qcm />} />
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