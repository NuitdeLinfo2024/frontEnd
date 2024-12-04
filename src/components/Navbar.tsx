import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          BDC Team
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Maison
        </Button>
        <Button color="inherit" component={Link} to="/about">
          Apropo
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
