import React, { useState, useEffect } from 'react';
import MDTypography from 'components/MDTypography';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CateringCompanyCard from './comp.js';
import Grid from '@mui/material/Grid';

const CateringCompanyMainPage = () => {
  const [cateringCompanies, setCateringCompanies] = useState([]);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        {cateringCompanies.map((company) => (
          <Grid item xs={12} sm={6} key={company.id}>
            <CateringCompanyCard {...company} />
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
};

export default CateringCompanyMainPage;
