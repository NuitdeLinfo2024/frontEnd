import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Qcm from './components/Qcm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/qcm" element={<Qcm />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
