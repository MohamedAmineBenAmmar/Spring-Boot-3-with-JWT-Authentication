import { GET_CATERING_COMPANIES } from './URL'

export const getAllCateringCompanies = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(GET_CATERING_COMPANIES, {
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
                    reject("GET_ALL_CATERING_COMPANIES_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
}
