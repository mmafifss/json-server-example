import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 3,
              py: 8 
            }}
          >
            <Typography variant="h5" component="h1">
              Your cart is empty
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/')}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Browse Packages
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Shopping Cart
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 0 }}>
              {cart.map((item, index) => (
                <Box key={item.id}>
                  <Box sx={{ p: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {item.description}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          ${item.price}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton 
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                  {index < cart.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    mb: 2 
                  }}
                >
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={() => navigate('/checkout')}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CartPage;
