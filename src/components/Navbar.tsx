import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>

        <Typography variant="h6" style={{ flexGrow: 1 }}>
          BDC Team
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Accueil
        </Button>
        <Button color="inherit" component={Link} to="/about">
          A propos
        </Button>
        <Button color="inherit" component={Link} to="/qcm">
          Qcm
        </Button>
        <Typography >
          Activer l'utilisation de l'API météo (Grenoble) <Switch
          defaultChecked={JSON.parse(localStorage.getItem('useApi') || 'false')}
          onClick={() => { 
            localStorage.setItem('useApi', JSON.stringify(!JSON.parse(localStorage.getItem('useApi') || 'false')));
            }} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
