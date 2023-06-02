import React from 'react'
import FlightDetail from './flightDetails';
import { useMaterialUIController } from 'context';

const VisualizeFlight = () => {
    const [controller, dispatch, token] = useMaterialUIController();
    const { flight } = controller;

    return (
        <FlightDetail flightId={flight.id} />
        
    )

}

export default VisualizeFlight