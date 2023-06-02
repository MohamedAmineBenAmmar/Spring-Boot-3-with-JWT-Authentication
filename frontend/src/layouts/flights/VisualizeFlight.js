import React from 'react'
import FlightDetail from './flightDetails';
import { useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom'

const VisualizeFlight = () => {
    const [controller, dispatch, token] = useMaterialUIController();
    const { flight } = controller;
    const navigate = useNavigate();

    if (!flight) {
        navigate('/flights')
    }

    return (
        <>
            {flight !== null ? (<FlightDetail flightId={flight.id} />) : (<p>Loading ...</p>)}
        </>
    )

}

export default VisualizeFlight