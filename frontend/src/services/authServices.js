import { SIGNIN, SIGNUP } from './URL'

export const signin = (user) => {    
    return new Promise((resolve, reject) => {
        try {
            fetch(SIGNIN, {
                method: 'POST',
                headers: new Headers({                    
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(res => {                    
                    resolve(res);
                })
                .catch(err => {                    
                    reject("SIGNIN_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
};

export const signup = (user) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(SIGNUP, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(res => {                    
                    resolve(res);
                })
                .catch(err => {                    
                    reject("SIGNUP_ERROR");
                });
        } catch (error) {            
            reject("SYSTEM_ERROR");
        }
    });
}
