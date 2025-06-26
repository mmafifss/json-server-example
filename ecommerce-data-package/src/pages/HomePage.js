import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import DataPackageCard from '../components/DataPackageCard';
import Header from '../components/Header';

function HomePage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/packages');
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data packages. Please try again later.');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

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

  if (error) {
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
          <Typography color="error">{error}</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: 6, 
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Data Packages
        </Typography>
        <Grid container spacing={4}>
          {packages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
              <DataPackageCard package={pkg} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;
