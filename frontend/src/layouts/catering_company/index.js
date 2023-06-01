import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CateringCompanyCard from './comp.js';
import Grid from '@mui/material/Grid';
import { Button, Box, Typography } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';

const CateringCompanyMainPage = () => {
  const [cateringCompanies, setCateringCompanies] = useState([]);
    const navigation = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImhhbW1hQGdtYWlsLmNvbSIsImlhdCI6MTY4NTQ1NDI0NCwiZXhwIjoxNjg2ODk0MjQ0fQ.Tm2QVPcihYhgGzDeOWXh_SdfHmActXnFzDo970a6E6k';
        const header = {
          'Authorization': `Bearer ${token}`,
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
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImhhbW1hQGdtYWlsLmNvbSIsImlhdCI6MTY4NTQ1NDI0NCwiZXhwIjoxNjg2ODk0MjQ0fQ.Tm2QVPcihYhgGzDeOWXh_SdfHmActXnFzDo970a6E6k';
      const header = {
        'Authorization': `Bearer ${token}`,
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
      <Box display="flex" justifyContent="flex-end" p={2}>
      <Button onClick={handleRedirection} variant="contained" color="primary" >
      <Typography variant="body2" color="#ffebee">
            add catering company
          </Typography>
    </Button>
      </Box>
      <Grid container spacing={2}>
        {cateringCompanies.map((company) => (
          <Grid item xs={12} sm={6} key={company.id}>
            <CateringCompanyCard {...company}  onDelete={() => handleDelete(company.id)} />
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
};

export default CateringCompanyMainPage;
