import { GET_FLIGHTS, CREATE_FLIGHT, UPDATE_FLIGHT, DELETE_FLIGHT, GET_FLIGHT_BY_ID, GET_PREDICTED_FLIGHT_DELAY, CREATE_FLIGHT_ANALYSIS } from './URL'

export const getFlights = () => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(GET_FLIGHTS, {
                method: 'GET',
                headers: new Headers({                    
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }),
                
            })
                .then(res => res.json())
                .then(res => {                                
                    resolve(res);
                })
                .catch(err => {                    
                    reject("GET_FLIGHTS_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const createFlight = (createFlightReqBody) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(CREATE_FLIGHT, {
                method: 'POST',
                headers: new Headers({                    
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}}`,
                }),
                body: JSON.stringify(createFlightReqBody)
            })
                .then(res => res.json())
                .then(res => {                    
                    resolve(res);
                })
                .catch(err => {                          
                    reject("CREATE_FLIGHT_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const updateFlight = (flightId, updateFlightReqBody) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(`${UPDATE_FLIGHT}/${flightId}`, {
                method: 'PUT',
                headers: new Headers({                    
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}}`,
                }),
                body: JSON.stringify(updateFlightReqBody)
            })
                .then(res => res.json())
                .then(res => {                    
                    resolve(res);
                })
                .catch(err => {                          
                    reject("UPDATE_FLIGHT_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const deleteFlight = (flightId) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(`${DELETE_FLIGHT}/${flightId}`, {
                method: 'DELETE',
                headers: new Headers({                    
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}}`,
                }),              
            })
                .then(res => res.json())
                .then(res => {                    
                    resolve(res);
                })
                .catch(err => {                          
                    reject("DELETE_FLIGHT_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const getFlightById = (flightId) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(`${GET_FLIGHT_BY_ID}/${flightId}`, {
                method: 'GET',
                headers: new Headers({                    
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }),
                
            })
                .then(res => res.json())
                .then(res => {                            
                    resolve(res);
                })
                .catch(err => {                    
                    reject("GET_FLIGHT_BY_ID_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const predictFlightDelay = (flightId) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(`${GET_PREDICTED_FLIGHT_DELAY}/${flightId}`, {
                method: 'GET',
                headers: new Headers({                    
                    "Accept": "application/json",
                    "Content-Type": "application/json",                    
                }),
                
            })
                .then(res => res.json())
                .then(res => {                            
                    resolve(res);
                })
                .catch(err => {                    
                    reject("PREDICTION_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const createFlightAnalysis = (createFlightAnalysisReqBody) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(CREATE_FLIGHT_ANALYSIS, {
                method: 'POST',
                headers: new Headers({                    
                    "Content-Type": "application/json",                    
                }),
                body: JSON.stringify(createFlightAnalysisReqBody)
            })
                .then(res => res.json())
                .then(res => {                    
                    resolve(res);
                })
                .catch(err => {                          
                    reject("FLIGHT_ANALYSIS_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};