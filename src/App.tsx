import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Parallax from './components/Parallax';
import WeatherController from './weatherApi/WeatherController';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Parallax />} />
            <Route
              path="/test"
              element={
                <Box
                  component="img"
                  sx={{
                    height: 160 * 5,
                    width: 160 * 5,
                    imageRendering: 'pixelated', // Makes the image sharp
                  }}
                  alt="AAAAAAAAAa"
                  src="/src/assets/image.png"

                />

              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/weather" element={<WeatherController lat={35} lon={139} />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
