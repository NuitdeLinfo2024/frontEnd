import React, { useRef } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayPauseControl from './components/PlayPauseControl';
import VolumeControl from './components/VolumeControl';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Container>
      {/* Audio element */}
      <audio ref={audioRef} src="podcast2.mp3" preload="auto" />
      {/* Controls */}
      <PlayPauseControl audioRef={audioRef} />
      <VolumeControl audioRef={audioRef} />
    </Router>
  );
};

export default App;
