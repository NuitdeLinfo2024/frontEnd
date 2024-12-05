import React from 'react';
import { Typography, Grid2, Card, CardContent, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to the Home Page!
      </Typography>

      <Grid2 container justifyContent="center">
      {/* Loop 100 times and display the typo */}
      {[...Array(1000)].map((_, index) => (
        <Typography key={index} variant="body1">
          On est les meilleurs
        </Typography>   
      ))}
      </Grid2>

      {/* Hero Section */}
      <Grid2 container spacing={4} justifyContent="center">
        <Grid2 >
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1">
                Learn more about our mission and team.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/about" sx={{ mt: 2 }}>
                Read More
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 >
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Features
              </Typography>
              <Typography variant="body1">
                Explore the features of our app and see how it can help you.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Explore Features
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 >
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1">
                Get in touch with us for any inquiries or support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Contact Now
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Featured Section */}
      <Box mt={6} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Featured Section
        </Typography>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="body1" paragraph>
            This is a featured section where we highlight the most important content for the users. You can use this section to showcase any specific promotions, updates, or key features.
          </Typography>
          <Button variant="contained" color="secondary">
            Learn More
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;
