import { GET_PILOTS, GET_COPILOTS, GET_FLIGHT_CREW } from './URL'

export const getAllPilots = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(GET_PILOTS, {
                method: 'GET',
                headers: new Headers({                   
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }),
            })
                .then(res => res.json())
                .then(res => {
                    resolve(res);
                })
                .catch(err => {                   
                    reject(err);
                });
        } catch (error) {
            reject("SYSTEM_ERROR");
        }
    });
}

export const getAllCoPilots = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(GET_COPILOTS, {
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
                    reject("GET_COPILOTS_ERROR");
                });
        } catch (error) {
            reject("SYSTEM_ERROR");
        }
    });
}

export const getAllFlightCrew = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(GET_FLIGHT_CREW, {
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
                    reject("GET_FLIGHT_CREW_ERROR");
                });
        } catch (error) {
            reject("SYSTEM_ERROR");
        }
    });
}