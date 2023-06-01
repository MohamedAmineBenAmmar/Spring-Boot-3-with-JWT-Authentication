// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useEffect, useState } from "react";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [bookedTickets, setBookedTickets] = useState(0);
  const [todaysFlights, setTodaysFlights] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [todaysPassengers, setTodaysPassengers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6Im1vc2xlbUBnbWFpbC5jb20iLCJpYXQiOjE2ODU2NTk0NDAsImV4cCI6MTY4NzA5OTQ0MH0.45r8flJZAW6h7FwfMcVTHDJJqpee8PlK-B6DQhwIqsQ';
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const responseBookedTickets = await fetch('http://localhost:8080/api/flight/count-upcoming-passengers', { headers });
        const dataBookedTickets = await responseBookedTickets.json();

        setBookedTickets(dataBookedTickets);

        const responseTodaysFlights = await fetch('http://localhost:8080/api/flight/count-today', { headers });
        const dataTodaysFlights = await responseTodaysFlights.json();

        setTodaysFlights(dataTodaysFlights);

        const responseRevenue = await fetch('http://localhost:8080/api/flight/count-today-revenue', { headers });
        const dataRevenue = await responseRevenue.json();

        setRevenue(dataRevenue);

        const responseTodaysPassengers = await fetch('http://localhost:8080/api/flight/count-today-passengers', { headers });
        const dataTodaysPassengers = await responseTodaysPassengers.json();

        setTodaysPassengers(dataTodaysPassengers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const formatRevenue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Booked tickets"
                count={bookedTickets}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's flights"
                count={todaysFlights}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count={formatRevenue(revenue)}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Today's passengers"
                count={todaysPassengers}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="flights this week"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily revenue"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Ticked booked"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
   
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
