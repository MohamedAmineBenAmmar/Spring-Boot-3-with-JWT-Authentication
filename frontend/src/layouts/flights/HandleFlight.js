import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Snackbar, Container, Typography, InputLabel, FormControlLabel, Checkbox, Select, MenuItem, FormControl, Grid, RadioGroup, Radio, FormLabel } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAlert from '@mui/material/Alert';

import { getAllCateringCompanies } from '../../services/cateringCompaniesServices'
import { getAllCoPilots, getAllPilots, getAllFlightCrew } from '../../services/crew'
import { createFlight, updateFlight } from '../../services/flightServices'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const initialFormValues = {
    flightNumber: '',
    airline: '',
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    seatsAvailable: 0,
    price: 0,
    menus: [], // "menus": [{"id" : 1}, ...],
    pilot: {}, // "pilot": {"id": 1},
    coPilot: {}, // "coPilot": {"id": 1},
    flightCrew: [], // "flightCrew": [{"id": 1}, ...],
};


function HandleFlight({ operation, flightToUpadte }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [cateringCompanies, setCateringCompanies] = useState([]); // "cateringCompanies": [{"id": 1}, ...],
    const [selectedCateringCompanies, setSelectedCateringCompanies] = useState([]); // "cateringCompanies": [{"id": 1}, ...
    const [pilots, setPilots] = useState([]);
    const [coPilots, setCoPilots] = useState([]);
    const [flightCrew, setFlightCrew] = useState([]);

    useEffect(() => {
        getAllCateringCompanies()
            .then(res => {

                console.log("res")
                console.log(res)
                setCateringCompanies(res)
            }
            )
            .catch(err => {
                console.log("Error occured")
            })

        const pilotsPromise = getAllPilots();
        const coPilotsPromise = getAllCoPilots();
        const flightCrewPromise = getAllFlightCrew();
        Promise.all([pilotsPromise, coPilotsPromise, flightCrewPromise])
            .then((results) => {
                // Handle the resolved values of all promises
                const pilotsPromiseResult = results[0];
                const coPilotsPromiseResult = results[1];
                const flightCrewPromiseResult = results[2];

                // Do something with the results
                // console.log(pilotsPromiseResult);
                // console.log(coPilotsPromiseResult);
                // console.log(flightCrewPromiseResult);

                setPilots(pilotsPromiseResult);
                setCoPilots(coPilotsPromiseResult);
                setFlightCrew(flightCrewPromiseResult);

            })
            .catch((error) => {
                // Handle errors from any of the promises
                console.error(error);
            });

    }, [])

    useEffect(() => {
        if(operation === 'UPDATE'){
            setFormValues({...flightToUpadte, flightCrew: flightToUpadte.flight_crew})
        }
    }, [operation, flightToUpadte])


    // To change
    const handleFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value })
    }

    const handleSnackbarClose = () => {
        setNotification({ ...notification, open: false });
    };


    const buildRequestBody = () => {
        let extractedMenus = []
        for (let i = 0; i < selectedCateringCompanies.length; i++) {
            for (let j = 0; j < selectedCateringCompanies[i].menus.length; j++) {
                if (selectedCateringCompanies[i].menus[j].selected) {
                    extractedMenus.push({ id: selectedCateringCompanies[i].menus[j].id })
                }
            }
        }


        let extractedFlightCrewIds = []
        for (let i = 0; i < formValues.flightCrew.length; i++) {
            extractedFlightCrewIds.push({ id: formValues.flightCrew[i].id })
        }


        let reqBody = {
            flightNumber: formValues.flightNumber,
            airline: formValues.airline,
            departureAirport: formValues.departureAirport,
            arrivalAirport: formValues.arrivalAirport,
            departureTime: formValues.departureTime,
            arrivalTime: formValues.arrivalTime,
            seatsAvailable: formValues.seatsAvailable,
            price: formValues.price,
            menus: [...extractedMenus],
            pilot: {
                id: formValues.pilot.id
            },
            coPilot: {
                id: formValues.coPilot.id
            },
            flight_crew: [...extractedFlightCrewIds]
        }

        return reqBody
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log("formValues")
        console.log(formValues)

        if (operation === 'CREATE') {
            let createFlightReqBody = buildRequestBody()
            // console.log("createFlightReqBody")
            // console.log(createFlightReqBody)

            createFlight(createFlightReqBody)
                .then(res => {                    
                    setNotification({ open: true, message: 'Flight created successfully', severity: 'success' })
                })
                .catch(err => {                    
                    // setNotification({ open: true, message: 'Error occured', severity: 'error' })
                })
        } else {
            // Case of update
            let updateFlightReqBody = buildRequestBody()       
            updateFlight(formValues.id, updateFlightReqBody)
            .then(res => {                    
                setNotification({ open: true, message: 'Flight updated successfully', severity: 'success' })
            })
            .catch(err => {                    
                // setNotification({ open: true, message: 'Error occured', severity: 'error' })
            }) 
        }
    }

    // Verify if the catering companie is slected for this flight
    const verifySelectedCateringComapny = (cateringCompany) => {
        let flag = false;
        for (let i = 0; i < selectedCateringCompanies.length; i++) {
            if (selectedCateringCompanies[i]["id"] === cateringCompany.id) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    // Handle the selection of the catering company
    const handleCateringCompantSelection = (e, cateringCompany) => {
        if (verifySelectedCateringComapny(cateringCompany)) {
            let filtredArray = selectedCateringCompanies.filter((item) => item.id !== cateringCompany.id)
            setSelectedCateringCompanies(filtredArray)
        } else {
            setSelectedCateringCompanies([...selectedCateringCompanies, cateringCompany])
        }
    }

    const displayCateringCompanies = cateringCompanies.map((cateringCompany, index) => (
        <FormControlLabel
            control={
                <Checkbox
                    name="vegetarian"
                    checked={verifySelectedCateringComapny(cateringCompany)}
                    onChange={(e) => { handleCateringCompantSelection(e, cateringCompany) }}
                    value={cateringCompany.id}
                />
            }
            label={cateringCompany.companyName}
        />
    ))

    // Verify if the menu is selected for this flight
    const handleMenuSelection = (e, cateringCompany, menuId) => {
        let done = false
        let tmpSelectedCateringCompanies = [...selectedCateringCompanies]
        for (let i = 0; i < tmpSelectedCateringCompanies.length; i++) {
            if (tmpSelectedCateringCompanies[i]['id'] === cateringCompany.id) {
                for (let j = 0; j < cateringCompany.menus.length; j++) {
                    if (cateringCompany.menus[j]['id'] === menuId) {
                        if (tmpSelectedCateringCompanies[i]['menus'][j]['selected'] == undefined) {
                            tmpSelectedCateringCompanies[i]['menus'][j]['selected'] = true
                        } else {
                            tmpSelectedCateringCompanies[i]['menus'][j]['selected'] = !tmpSelectedCateringCompanies[i]['menus'][j]['selected']
                        }
                        done = true
                        break
                    }

                }

                if (done) {
                    break
                }
            }

        }

        setSelectedCateringCompanies(tmpSelectedCateringCompanies)
    }

    const displayMenus = selectedCateringCompanies.map((cateringCompany, index) => (
        <div key={index}>
            <p>{cateringCompany.companyName}</p>
            {cateringCompany.menus.map((menu, index) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            name="vegetarian"
                            checked={menu.selected != undefined ? menu.selected : false}
                            onChange={(e) => { handleMenuSelection(e, cateringCompany, menu.id) }}
                            value={`${cateringCompany.id}-${menu.id}`}
                        />
                    }
                    label={menu.name}
                />
            ))}

        </div>
    ))

    const handlePilotSelection = (e) => {
        console.log("e.target.name", e.target.name)
        console.log("e.target.value", e.target.value)

        // determine the id of the pilot
        let pilot = null
        for (let i = 0; i < pilots.length; i++) {
            if (pilots[i].id == e.target.value) {
                pilot = pilots[i]
                break
            }
        }
        setFormValues({ ...formValues, pilot })
    }

    const handleCopiloteSelection = (e) => {
        // determine the copilot id
        let coPilot = null
        for (let i = 0; i < coPilots.length; i++) {
            if (coPilots[i].id == e.target.value) {
                coPilot = coPilots[i]
                break
            }
        }

        setFormValues({ ...formValues, coPilot })
    }

    const verifyCrewMember = (crewMember) => {
        let flag = false;
        for (let i = 0; i < formValues.flightCrew.length; i++) {
            if (formValues.flightCrew[i]["id"] === crewMember.id) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    const handleCrewAssignment = (e, crewMember) => {
        if (verifyCrewMember(crewMember)) {
            // Filter this element from the formvalues flight crew
            let filtredArray = formValues.flightCrew.filter((item) => item.id !== crewMember.id)
            setFormValues({ ...formValues, flightCrew: filtredArray })
        } else {
            // Add the selected crew member to the form values flight crew
            setFormValues({ ...formValues, flightCrew: [...formValues.flightCrew, crewMember] })
        }
    }

    const displayPilots = pilots.map((pilot, index) => (
        <FormControlLabel key={index} checked={pilot.id === formValues.pilot.id} value={pilot.id} control={<Radio />} label={`${pilot.firstname} ${pilot.lastname}`} />
    ))

    const displayCoPilots = coPilots.map((coPilot, index) => (
        <FormControlLabel key={index} checked={coPilot  .id === formValues.coPilot.id} value={coPilot.id} control={<Radio />} label={`${coPilot.firstname} ${coPilot.lastname}`} />
    ))

    const displayCrewMembers = flightCrew.map((crewMember, index) => (
        <FormControlLabel
            control={
                <Checkbox
                    name="flightCrew"
                    checked={verifyCrewMember(crewMember)}
                    onChange={(e) => { handleCrewAssignment(e, crewMember) }}
                    value={crewMember.id}
                />
            }
            label={`${crewMember.firstname} ${crewMember.lastname}`}
        />
    ))

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Container maxWidth="sm">
                <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })}>
                    <MuiAlert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} elevation={6} variant="filled">
                        {notification.message}
                    </MuiAlert>
                </Snackbar>
                <Box mt={4} mb={2}>
                    <Typography variant="h4" align="center">
                        Create Flight
                    </Typography>
                </Box>
                <form onSubmit={handleFormSubmit}>
                    {/* Company Information */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Flight Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <TextField
                                    id="flightNumber"
                                    name="flightNumber"
                                    label="Flight Number"
                                    value={formValues.flightNumber}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="airline"
                                    name="airline"
                                    label="Airline"
                                    value={formValues.airline}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="departureAirport"
                                    name="departureAirport"
                                    label="Departure Airport"
                                    value={formValues.departureAirport}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="arrivalAirport"
                                    name="arrivalAirport"
                                    label="Arrival Airport"
                                    value={formValues.arrivalAirport}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Menus */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Flight Time</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <TextField
                                    id="departureTime"
                                    name="departureTime"
                                    label="Departure Time"
                                    type="datetime-local"
                                    required
                                    value={formValues.departureTime}
                                    onChange={handleFormChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }} // Add this line
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="arrivalTime"
                                    name="arrivalTime"
                                    label="Arrival Time"
                                    type="datetime-local"
                                    required
                                    value={formValues.arrivalTime}
                                    onChange={handleFormChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }} // Add this line
                                    sx={{ mb: 2 }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Special Specifications */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Flight Configuration</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                {/* ... */}
                                <TextField
                                    id="seatsAvailable"
                                    name="seatsAvailable"
                                    label="Seats availbalbe"
                                    value={formValues.seatsAvailable}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Price"
                                    value={formValues.price}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Flight Catering Company Assignement</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                {/* Lopping throught all the catering companies to allow the user to select the catering companies desired */}
                                {displayCateringCompanies}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Flight Menus</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                {/* Displaying menus */}
                                {displayMenus}

                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Flight Crew Assignement</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                {/* ... */}
                                <FormControl>
                                    <FormLabel id="pilot-radio-buttons-group-label">Pilot</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="pilot-radio-buttons-group-label"
                                        name="pilot"
                                        onClick={handlePilotSelection}
                                    >
                                        {displayPilots}
                                    </RadioGroup>
                                </FormControl>

                                <FormControl>
                                    <FormLabel id="pilot-radio-buttons-group-label">CoPilot</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="copilot-radio-buttons-group-label"
                                        name="coPilot"
                                        onClick={handleCopiloteSelection}
                                    >
                                        {displayCoPilots}
                                    </RadioGroup>
                                </FormControl>

                                <FormControl>
                                    <FormLabel id="flight-crew-radio-buttons-group-label">Flight Crew Selection</FormLabel>
                                    {displayCrewMembers}
                                </FormControl>
                            </Box>
                        </AccordionDetails>
                    </Accordion>


                    {/* Submit Button */}
                    <Button variant="contained" type="submit" sx={{ fontSize: '14px', padding: '8px 16px', margin: 'auto', display: 'block', marginTop: '10px' }} onClick={handleFormSubmit}>
                        <span style={{ marginLeft: 'auto', color: 'white', marginRight: 'auto' }}>Submit</span>
                    </Button>
                </form>
                <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <MuiAlert onClose={handleSnackbarClose} severity={notification.severity} elevation={6} variant="filled">
                        {notification.message}
                    </MuiAlert>
                </Snackbar>
            </Container>
        </DashboardLayout>

    );
}


export default HandleFlight;
