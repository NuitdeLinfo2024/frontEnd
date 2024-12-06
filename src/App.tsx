import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import About from './components/About';
import Qcm from './components/Qcm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Parallax from './components/Parallax';
import Logo from './components/Logo';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Parallax />} />
            <Route path="/about" element={<About />} />
            <Route path="/qcm" element={<Qcm />} />
          </Routes>
        </Box>
        <Logo />
      </Container>
    </Router>
  );
}

export default App;