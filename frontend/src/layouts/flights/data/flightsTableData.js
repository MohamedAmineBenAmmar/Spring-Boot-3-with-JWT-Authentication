import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import moment from "moment";

import { getFlights } from '../../../services/flightServices'

export default function FlightData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFlights().then((res) => {
      setData(res);
    })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  return {
    columns: [
      { Header: "Flight Number", accessor: "flightNumber", align: "left" },
      { Header: "Airline", accessor: "airline", align: "left" },
      { Header: "Departure Airport", accessor: "departureAirport", align: "left" },
      { Header: "Arrival Airport", accessor: "arrivalAirport", align: "left" },
      { Header: "Departure Time", accessor: "departureTime", align: "left" },
      { Header: "Arrival Time", accessor: "arrivalTime", align: "left" },
      { Header: "Seats Available", accessor: "seatsAvailable", align: "left" },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Pilot", accessor: "pilot", align: "left" },
      { Header: "Co-Pilot", accessor: "coPilot", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: data.map((item) => {
      return {
        flightNumber: item.flightNumber,
        airline: item.airline,
        departureAirport: item.departureAirport,
        arrivalAirport: item.arrivalAirport,
        departureTime: moment(item.departureTime).format("YYYY-MM-DD HH:mm:ss"),
        arrivalTime: moment(item.arrivalTime).format("YYYY-MM-DD HH:mm:ss"),
        seatsAvailable: item.seatsAvailable,
        price: item.price + " DT",
        pilot: item.pilot.firstname + " " + item.pilot.lastname,
        coPilot: item.coPilot.firstname + " " + item.coPilot.lastname,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      };
    }),
  };
}
