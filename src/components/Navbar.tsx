import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

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
        {/* Settings modal buttun */}
        <Button variant="contained" color="primary" onClick={handleOpen}>
        Paramètres nuit info
      </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Paramètres défis</DialogTitle>
          <DialogContent>
            <Typography >
              Activer l'utilisation de l'API météo (Grenoble) <Switch
              defaultChecked={JSON.parse(localStorage.getItem('useApi') || 'false')}
              onClick={() => { 
                localStorage.setItem('useApi', JSON.stringify(!JSON.parse(localStorage.getItem('useApi') || 'false')));
                }} />
            </Typography>
            <Typography >
              Activer les animations météo <Switch
              defaultChecked={JSON.parse(localStorage.getItem('useWeatherAnimations') || 'false')}
              onClick={() => { 
                localStorage.setItem('useWeatherAnimations', JSON.stringify(!JSON.parse(localStorage.getItem('useWeatherAnimations') || 'false')));
                }} />
            </Typography>
            <Typography >
              Activer le captcha de bienvenue <Switch
              defaultChecked={JSON.parse(localStorage.getItem('useCaptcha') || 'false')}
              onClick={() => { 
                localStorage.setItem('useCaptcha', JSON.stringify(!JSON.parse(localStorage.getItem('useCaptcha') || 'false')));
                }} />
            </Typography>
            <Typography >
              Activer le volume bad UI/UX <Switch
              defaultChecked={JSON.parse(localStorage.getItem('useVolume') || 'false')}
              onClick={() => { 
                localStorage.setItem('useVolume', JSON.stringify(!JSON.parse(localStorage.getItem('useVolume') || 'false')));
                }} />
            </Typography>
            <Typography >
              Activer le défi logo <Switch
              defaultChecked={JSON.parse(localStorage.getItem('useLogo') || 'false')}
              onClick={() => { 
                localStorage.setItem('useLogo', JSON.stringify(!JSON.parse(localStorage.getItem('useLogo') || 'false')));
                }} />
            </Typography>
            <Typography >
              Activer le défi QRCode Pokémon <Switch
              defaultChecked={JSON.parse(localStorage.getItem('useQr') || 'false')}
              onClick={() => { 
                localStorage.setItem('useQr', JSON.stringify(!JSON.parse(localStorage.getItem('useQr') || 'false')));
                }} />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
