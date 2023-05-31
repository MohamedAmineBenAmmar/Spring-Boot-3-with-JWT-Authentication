import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CardActionArea from "@mui/material/CardActionArea";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useState, useEffect } from "react";

export default function FlightDetail({ flightId }) {
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/flight/${flightId}`, {
      method: "get",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImhhbW1hMkBnbWFpbC5jb20iLCJpYXQiOjE2ODU0NTA1NTYsImV4cCI6MTY4Njg5MDU1Nn0.60Uwq2IyNtIxu8tBh1_UvdCncPW4zJZ-mV-UKFpaLag",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlight(data);
      });
  }, [flightId]);

  if (!flight) {
    return <div>Loading flight details...</div>;
  }

  const renderMenus = flight.menus.map((menu, index) => {
    let menuTypeIcon = null;
    if (menu.menuType === "BREAKFAST") {
      menuTypeIcon = <FreeBreakfastIcon />;
    } else if (menu.menuType === "LUNCH") {
      menuTypeIcon = <FastfoodIcon />;
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
            dsq
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={2} ml={2}>
        <MDBox display="flex" alignItems="center" ml={2}>
        <AttachMoneyIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" color="textSecondary">
            {flight.price} DT
          </Typography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" overflow="auto">
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr)) !important",
            gridAutoColumns: "minmax(240px, 1fr)",
            gap: "16px",
            height: "230px",
          }}
        >
          {renderMenus}
        </ImageList>
      </MDBox>
    </Card>
    </DashboardLayout>
  );
}
