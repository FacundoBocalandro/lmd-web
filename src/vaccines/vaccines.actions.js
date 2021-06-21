export const GET_ALL_VACCINES_REQUEST = "GET_ALL_VACCINES_REQUEST";
export const GET_ALL_VACCINES_RESPONSE = "GET_ALL_VACCINES_RESPONSE";
export const GET_ALL_VACCINES_ERROR = "GET_ALL_VACCINES_ERROR";
export const GET_USER_VACCINES_REQUEST = "GET_USER_VACCINES_REQUEST";
export const GET_USER_VACCINES_RESPONSE = "GET_USER_VACCINES_RESPONSE";
export const GET_USER_VACCINES_ERROR = "GET_USER_VACCINES_ERROR";
export const SUBMIT_NEW_VACCINATION_REQUEST = "SUBMIT_NEW_VACCINATION_REQUEST";
export const SUBMIT_NEW_VACCINATION_RESPONSE = "SUBMIT_NEW_VACCINATION_RESPONSE";
export const SUBMIT_NEW_VACCINATION_ERROR = "SUBMIT_NEW_VACCINATION_ERROR";

const vaccinesActions = {
    getAllVaccines: {
        request: () => ({type: GET_ALL_VACCINES_REQUEST}),
        response: (res) => ({type: GET_ALL_VACCINES_RESPONSE, res}),
        error: (err) => ({type: GET_ALL_VACCINES_ERROR, err}),
    },
    getUserVaccines: {
        request: () => ({type: GET_USER_VACCINES_REQUEST}),
        response: (res) => ({type: GET_USER_VACCINES_RESPONSE, res}),
        error: (err) => ({type: GET_USER_VACCINES_ERROR, err}),
    },
    submitNewVaccination: {
        request: (vaccinationInfo, callback, errorCallback) => ({type: SUBMIT_NEW_VACCINATION_REQUEST, vaccinationInfo, callback, errorCallback}),
        response: (res) => ({type: SUBMIT_NEW_VACCINATION_RESPONSE, res}),
        error: (err) => ({type: SUBMIT_NEW_VACCINATION_ERROR, err})
    }
}

export default vaccinesActions;
