import React, { useRef, useState, useEffect } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import About from './components/About';
import Captcha from './components/Captcha'; 
import Qcm from './components/Qcm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayPauseControl from './components/PlayPauseControl';
import VolumeControl from './components/VolumeControl';
import Parallax from './components/Parallax';
import Logo from './components/Logo';
import './App.css';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState("podcast.m4a");
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll Y position:', window.scrollY);
      if (window.scrollY < 6600) {
        setAudioPlayed("podcast.m4a");
        console.log('podcast.m4a');
        if (isPlaying) audioRef.current?.play();
      }
      else if (window.scrollY >= 6600 && window.scrollY < 8300) {
        setAudioPlayed("podcast2.m4a");
        console.log('podcast2.m4a');
        if (isPlaying) audioRef.current?.play();
      }
      else if (window.scrollY >= 8300 && window.scrollY < 10000) {
        setAudioPlayed("podcast3.m4a");
        console.log('podcast3.m4a');
        if (isPlaying) audioRef.current?.play();
      }
      else if (window.scrollY >= 10000) {
        setAudioPlayed("podcast4.m4a");
        console.log('podcast4.m4a');
        if (isPlaying) audioRef.current?.play();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPlaying]); // Depend on isPlaying to handle scroll correctly

  const handlePlayingChange = (isPlaying: boolean) => {
    setIsPlaying(isPlaying); // Update isPlaying when play/pause state changes
  };

  if (!isCaptchaComplete) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>CAPTCHA Interactif 😄</h1>
        <Captcha onComplete={() => setIsCaptchaComplete(true)} />
      </div>
    );
  }

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        {/* Controls */}
        <PlayPauseControl audioRef={audioRef} onPlayingChange={handlePlayingChange} />
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
      <audio ref={audioRef} src={audioPlayed} preload="auto">
        <track kind="captions" src="captions_en.vtt" srcLang="en" label="English" default />
      </audio>
    </Router>
  );
};

export default App;
