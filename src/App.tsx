import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Parallax from './components/Parallax';
import Logo from './components/Logo';

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
          </Routes>
        </Box>
      </Container>
      <Logo />
    </Router>
  );
}

export default App;