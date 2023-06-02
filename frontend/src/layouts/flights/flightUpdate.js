import React from 'react'
import HandleFlight from './HandleFlight'
import { useMaterialUIController } from 'context';

const FlightUpdate = () => {
    const [controller, dispatch, token] = useMaterialUIController();
    const { flight } = controller;

    return (
        <HandleFlight operation="UPDATE" flightToUpadte={flight} />
        
    )

}

export default FlightUpdate