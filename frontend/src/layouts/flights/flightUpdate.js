import React from 'react'
import HandleFlight from './HandleFlight'
import { useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom'

const FlightUpdate = () => {
    const navigate = useNavigate();
    const [controller, dispatch, token] = useMaterialUIController();
    const { flight } = controller;

    if (!flight) {
        navigate('/flights')
    }

    return (
        <>
            {flight !== null ? (<HandleFlight operation="UPDATE" flightToUpadte={flight} />) : (<p>Loading ...</p>)}
        </>
    )

}

export default FlightUpdate