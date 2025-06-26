import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/packages/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60vh'
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60vh'
          }}
        >
          <Typography color="error">{error || 'Product not found'}</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 4 }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              {product.description}
            </Typography>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Features
              </Typography>
              <List>
                {product.features.map((feature, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              <Box sx={{ my: 3 }}>
                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Package Price:</span>
                  <span>${product.price}</span>
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                onClick={handleAddToCart}
                sx={{
                  mt: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetail;
