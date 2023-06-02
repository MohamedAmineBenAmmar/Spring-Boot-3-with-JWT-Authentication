const BACKEND_HOST = 'http://localhost:8080/api'
export const SIGNIN = `${BACKEND_HOST}/auth/authenticate`
export const SIGNUP = `${BACKEND_HOST}/auth/register`
export const GET_FLIGHTS = `${BACKEND_HOST}/flight/all`
export const CREATE_FLIGHT = `${BACKEND_HOST}/flight`


export const GET_CATERING_COMPANIES = `${BACKEND_HOST}/catering/all`
export const GET_PILOTS = `${BACKEND_HOST}/user/getAllUsersByRole/PILOT`
export const GET_COPILOTS = `${BACKEND_HOST}/user/getAllUsersByRole/COPILOT`
export const GET_FLIGHT_CREW = `${BACKEND_HOST}/user/getAllUsersByRole/FLIGHT_CREW`