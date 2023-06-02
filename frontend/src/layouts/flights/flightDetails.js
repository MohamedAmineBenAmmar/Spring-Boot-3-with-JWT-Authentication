import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardActionArea from "@mui/material/CardActionArea";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import moment from "moment";
import { getFlightById } from "services/flightServices";

// New component to render two attributes in one row
const FlightAttributeRow = ({ icon1, label1, value1, icon2, label2, value2 }) => (
  <MDBox mb={2} ml={2} display="flex">
    <MDBox flex={1} display="flex" alignItems="center">
      {icon1}
      <MDTypography variant="body2" color="textSecondary" ml={1}>
        {label1}: {value1}
      </MDTypography>
    </MDBox>
    <MDBox flex={1} display="flex" alignItems="center">
      {icon2}
      <MDTypography variant="body2" color="textSecondary" ml={1}>
        {label2}: {value2}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export default function FlightDetail({ flightId }) {
  const [flight, setFlight] = useState(null);

  useEffect(() => {

    if(flightId != null){      
      getFlightById(flightId).then((res) => {
        setFlight(res);
      })
        .catch((err) => {
          console.log("error: ", err);
        });
    }

  

  }, [flightId]);

  if (!flight) {
    return <div>Loading flight details...</div>;
  }

  const renderMenus = flight.menus.map((menu, index) => {
    let menuTypeIcon = null;
    if (menu.menuType === "BREAKFAST") {
      menuTypeIcon = <FreeBreakfastIcon />;
    } else if (menu.menuType === "DINNER") {
      menuTypeIcon = <DinnerDiningIcon />;
    }

    const menuItems = menu.items.join(", ");

    return (
      <ImageListItem key={index}>
        <Card
          sx={{
            display: "inline-block",
            borderRadius: "md",
            mx: 1,
            boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "visible",
            height: "100%",
          }}
        >
          <CardActionArea>
            <CardContent
              sx={{
                p: 3,
                height: "180px",
              }}
            >
              <MDTypography variant="h5" gutterBottom>
                {menu.name}
              </MDTypography>
              <MDBox display="flex" alignItems="center" mb={2}>
                {menuTypeIcon}
                <MDTypography variant="body2" color="textSecondary" ml={1}>
                  {menu.menuType}
                </MDTypography>
              </MDBox>
              <MDTypography variant="body2" color="textSecondary" mb={2}>
                {menuItems}
              </MDTypography>
              <MDTypography variant="subtitle2" color="primary" textAlign="center" mt={2}>
                ${menu.pricePerServing}
              </MDTypography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ImageListItem>
    );
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          padding: "16px",
        }}
      >
        <MDBox mt={1} mx={0.5} display="flex" alignItems="center">
          <MDTypography variant="h4" textTransform="capitalize">
            {flight.flightNumber}
          </MDTypography>
        </MDBox>
        <MDBox mb={3} lineHeight={0} ml={2}>
          <MDTypography variant="body2" color="textSecondary">
            {flight.airline}
          </MDTypography>
        </MDBox>
        <FlightAttributeRow
          icon1={<AirportShuttleIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label1="Departure Airport"
          value1={flight.departureAirport}
          icon2={<LocalAirportIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label2="Arrival Airport"
          value2={flight.arrivalAirport}
        />
        <FlightAttributeRow
          icon1={<AccessTimeIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label1="Departure Time"
          value1={moment(flight.departureTime).format("DD MMM YYYY, HH:mm")}
          icon2={<AccessTimeIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label2="Arrival Time"
          value2={moment(flight.arrivalTime).format("DD MMM YYYY, HH:mm")}
        />
        <FlightAttributeRow
          icon1={<LocalOfferIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label1="Seats Available"
          value1={flight.seatsAvailable}
          icon2={<AttachMoneyIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label2="Price"
          value2={flight.price}
        />
        <FlightAttributeRow
          icon1={<PersonIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label1="Pilot"
          value1={flight.pilot.firstname + " " + flight.pilot.lastname}
          icon2={<PersonIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />}
          label2="Co-pilot"
          value2={flight.coPilot.firstname + " " + flight.coPilot.lastname}
        />
        <MDTypography variant="h6" mt={4} mb={2}>
          Menus
        </MDTypography>
        <ImageList
          sx={{ flexWrap: "nowrap", transform: "translateZ(0)", overflowX: "auto", mb: 2 }}
        >
          {renderMenus}
        </ImageList>
      </Card>
    </DashboardLayout>
  );
}
