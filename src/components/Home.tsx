import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to the Home Page!
      </Typography>

      <Typography variant="h6" paragraph align="center">
        This is a simple React SPA template using Material UI with TypeScript.
        Gogogo the BDC
        We are the best yes !!
      </Typography>   

      {/* Hero Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
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
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
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
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
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
        </Grid>
      </Grid>

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
