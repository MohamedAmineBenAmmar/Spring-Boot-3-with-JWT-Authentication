/* eslint-disable prettier/prettier */
export const signin = () => {
    console.log("Signin method called");
    return new Promise((resolve, reject) => {
        try {
            fetch("http://localhost:8080/api/catering/1", {
                method: 'get',
                headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log("Sigin:", res);
                    resolve(res.data);
                })
                .catch(err => {
                    console.log("error: ", err);
                    reject("SIGNIN_ERROR");
                });
        } catch (error) {
            console.error("in userServices > getAllUsers, Err===", error);
            reject("SYSTEM_ERROR");
        }
    });
};
