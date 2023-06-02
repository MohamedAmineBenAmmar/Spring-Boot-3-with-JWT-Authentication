import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import moment from "moment";

import { getFlights } from '../../../services/flightServices'
import { Icon } from "@mui/material";
import { setFlight, useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom'
import { deleteFlight } from '../../../services/flightServices'

export default function FlightData() {
  const [data, setData] = useState([]);
  const [controller, dispatch, token, setToken] = useMaterialUIController();

 
  const navigate = useNavigate();

  useEffect(() => {
    getFlights().then((res) => {
      setData(res);
    })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  const handledelete = (flight) => {   
    deleteFlight(flight.id).then((res) => {      
      getFlights().then((res) => {
        // filter the data array from the deleted element
        let filteredData = data.filter((element) => (element.id != flight.id))
        setData(filteredData);
      })
        .catch((err) => {
          console.log("error: ", err);
        });
    })
  }

  const visualize = (flight) => {
    console.log("visualize flight: ", flight);
  }

  const edit = (flight) => {    
   setFlight(dispatch, flight);
    navigate('/flights/edit');
  }

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
      { Header: "Actions", accessor: "action", align: "center" },
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
          <>
            <Icon onClick={() => { visualize(item) }} fontSize="small" style={{ marginRight: '5px', cursor: 'pointer' }}>payment</Icon>
            <Icon onClick={() => { edit(item) }} fontSize="small" style={{ marginRight: '5px', cursor: 'pointer' }}>edit</Icon>
            <Icon onClick={() => { handledelete(item) }} fontSize="small" style={{ marginRight: '5px', color: "red", cursor: 'pointer' }}>delete</Icon>
          </>
        ),
      };
    }),
  };
}
