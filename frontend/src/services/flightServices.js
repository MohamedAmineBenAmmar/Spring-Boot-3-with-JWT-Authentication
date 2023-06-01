import { GET_FLIGHTS } from './URL'

export const getFlights = () => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(GET_FLIGHTS, {
                method: 'GET',
                headers: new Headers({                    
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}}`,
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
