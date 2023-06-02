import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CateringCompanyCard from './comp.js';
import Grid from '@mui/material/Grid';
import { Button, Box, Typography } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CateringCompanyMainPage = () => {
  const [notification, setNotification] = useState({ open: false, message: 'Deleted successfully', severity: 'success' });

  const [cateringCompanies, setCateringCompanies] = useState([]);
    const navigation = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = {
          'Authorization': `Bearer ` + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        };

        const response = await fetch('http://localhost:8080/api/catering/all', { headers: header });
        const data = await response.json();

        setCateringCompanies(data);
      } catch (error) {
        console.error('Error fetching catering companies:', error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (companyId) => {
    try {
      const header = {
        'Authorization': `Bearer ` + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      };

      await fetch(`http://localhost:8080/api/catering/${companyId}`, {
        method: 'DELETE',
        headers: header,
      });

      // Update the catering companies state by removing the deleted company
      setCateringCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
      setNotification({ open: true, message: 'Card deleted successfully!', severity: 'success' });

    } catch (error) {
      console.error('Error deleting catering company:', error);
    }
  };

const handleRedirection = ()=>{
    navigation("/catering-form")
}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })}>
      <MuiAlert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} elevation={6} variant="filled">
        {notification.message}
      </MuiAlert>
    </Snackbar>
      <Box display="flex" justifyContent="flex-end"  >
      <Button onClick={handleRedirection} variant="contained" color="primary"sx={{ mb: 5, mt: 2 }} >
      <Typography variant="body2" color="#ffebee">
            add catering company
          </Typography>
    </Button>
      </Box>
     
      <Grid container spacing={2}>
      {cateringCompanies.length > 0 ? (
        <Grid container spacing={2}>
          {cateringCompanies.map((company) => (
            <Grid item xs={12} sm={6} key={company.id}>
              <CateringCompanyCard {...company} onDelete={() => handleDelete(company.id)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center">
          No catering companies found.
        </Typography>
      )}
      </Grid>
    </DashboardLayout>
  );
};

export default CateringCompanyMainPage;
