import React from 'react';
import { AppBar, Toolbar, Button, Badge, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button 
          color="inherit" 
          onClick={() => navigate('/')}
          sx={{ 
            typography: 'h6',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Data Packages
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit"
            onClick={() => navigate('/cart')}
            startIcon={
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart />
              </Badge>
            }
          >
            Cart
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
