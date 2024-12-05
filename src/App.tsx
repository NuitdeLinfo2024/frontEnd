import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherController from './weatherApi/WeatherController';

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
            <Route path="/weather" element={<WeatherController lat={35} lon={139} />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
