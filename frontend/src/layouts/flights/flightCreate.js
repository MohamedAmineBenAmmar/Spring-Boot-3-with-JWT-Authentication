import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import FlightIcon from "@mui/icons-material/Flight";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Chip from "@mui/material/Chip";

const menusData = [
  { id: 1, name: "Breakfast Menu", icon: <FreeBreakfastIcon /> },
  { id: 2, name: "Dinner Menu", icon: <DinnerDiningIcon /> },
];

const flightCrewData = [
  { id: 1, name: "John Doe", icon: <SupervisorAccountIcon /> },
  { id: 2, name: "Jane Smith", icon: <SupervisorAccountIcon /> },
  { id: 3, name: "Mike Johnson", icon: <SupervisorAccountIcon /> },
];

export default function CreateFlightForm() {
  const [flightNumber, setFlightNumber] = useState("");
  const [airline, setAirline] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [menus, setMenus] = useState([]);
  const [flightCrew, setFlightCrew] = useState([]);
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [price, setPrice] = useState("");

  const handleMenuChange = (event) => {
    setMenus(event.target.value);
  };

  const handleFlightCrewChange = (event) => {
    setFlightCrew(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform submission logic here
    console.log("Flight Number:", flightNumber);
    console.log("Airline:", airline);
    console.log("Departure Airport:", departureAirport);
    console.log("Arrival Airport:", arrivalAirport);
    console.log("Menus:", menus);
    console.log("Flight Crew:", flightCrew);
    console.log("Departure Time:", departureTime);
    console.log("Arrival Time:", arrivalTime);
    console.log("Seats Available:", seatsAvailable);
    console.log("Price:", price);

    // Reset form fields
    setFlightNumber("");
    setAirline("");
    setDepartureAirport("");
    setArrivalAirport("");
    setMenus([]);
    setFlightCrew([]);
    setDepartureTime("");
    setArrivalTime("");
    setSeatsAvailable("");
    setPrice("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card sx={{ maxWidth: 860, margin: "auto", mt: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Create New Flight
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Flight Number"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Airline"
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Departure Airport"
                  value={departureAirport}
                  onChange={(e) => setDepartureAirport(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Arrival Airport"
                  value={arrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Departure Time"
                  type="datetime-local"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }} // Add this line
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Arrival Time"
                  type="datetime-local"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }} // Add this line
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Seats Available"
                  type="number"
                  value={seatsAvailable}
                  onChange={(e) => setSeatsAvailable(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel>Select Flight Crew</InputLabel>
                  <Select
                    multiple
                    value={flightCrew}
                    onChange={handleFlightCrewChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {selected.map((value) => {
                          const crewMember = flightCrewData.find((crew) => crew.id === value);
                          return (
                            <Chip
                              key={value}
                              icon={crewMember.icon}
                              label={crewMember.name}
                              sx={{ m: 0.5 }}
                            />
                          );
                        })}
                      </Box>
                    )}
                    sx={{ height: "50px" }} // Set the height to "auto"
                  >
                    {flightCrewData.map((crewMember) => (
                      <MenuItem key={crewMember.id} value={crewMember.id}>
                        <Checkbox checked={flightCrew.includes(crewMember.id)} />
                        <ListItemText primary={crewMember.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" sx={{ color: "white" }}>
                  Create Flight
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
