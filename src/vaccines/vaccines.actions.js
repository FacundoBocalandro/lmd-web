export const GET_ALL_VACCINES_REQUEST = "GET_ALL_VACCINES_REQUEST";
export const GET_ALL_VACCINES_RESPONSE = "GET_ALL_VACCINES_RESPONSE";
export const GET_ALL_VACCINES_ERROR = "GET_ALL_VACCINES_ERROR";
export const GET_USER_VACCINES_REQUEST = "GET_USER_VACCINES_REQUEST";
export const GET_USER_VACCINES_RESPONSE = "GET_USER_VACCINES_RESPONSE";
export const GET_USER_VACCINES_ERROR = "GET_USER_VACCINES_ERROR";
export const SUBMIT_NEW_VACCINATION_REQUEST = "SUBMIT_NEW_VACCINATION_REQUEST";
export const SUBMIT_NEW_VACCINATION_RESPONSE = "SUBMIT_NEW_VACCINATION_RESPONSE";
export const SUBMIT_NEW_VACCINATION_ERROR = "SUBMIT_NEW_VACCINATION_ERROR";
export const GET_VACCINE_DETAILS_REQUEST = "GET_VACCINE_DETAILS_REQUEST";
export const GET_VACCINE_DETAILS_RESPONSE = "GET_VACCINE_DETAILS_RESPONSE";
export const GET_VACCINE_DETAILS_ERROR = "GET_VACCINE_DETAILS_ERROR";
export const EXPORT_VACCINES_DATA_REQUEST = "EXPORT_VACCINES_DATA_REQUEST";
export const EXPORT_VACCINES_DATA_RESPONSE = "EXPORT_VACCINES_DATA_RESPONSE";
export const EXPORT_VACCINES_DATA_ERROR = "EXPORT_VACCINES_DATA_ERROR";
export const UPDATE_VACCINATION_REQUEST = "UPDATE_VACCINATION_REQUEST";
export const UPDATE_VACCINATION_RESPONSE = "UPDATE_VACCINATION_RESPONSE";
export const UPDATE_VACCINATION_ERROR = "UPDATE_VACCINATION_ERROR";
export const DELETE_VACCINATION_REQUEST = "DELETE_VACCINATION_REQUEST";
export const DELETE_VACCINATION_RESPONSE = "DELETE_VACCINATION_RESPONSE";
export const DELETE_VACCINATION_ERROR = "DELETE_VACCINATION_ERROR";

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
    },
    updateVaccination: {
        request: (id, vaccinationInfo, callback, errorCallback) => ({type: UPDATE_VACCINATION_REQUEST, id, vaccinationInfo, callback, errorCallback}),
        response: (res) => ({type: UPDATE_VACCINATION_RESPONSE, res}),
        error: (err) => ({type: UPDATE_VACCINATION_ERROR, err})
    },
    deleteVaccination: {
        request: (id, callback, errorCallback) => ({type: DELETE_VACCINATION_REQUEST, id, callback, errorCallback}),
        response: (res) => ({type: DELETE_VACCINATION_RESPONSE, res}),
        error: (err) => ({type: DELETE_VACCINATION_ERROR, err})
    },
    getVaccineDetails: {
        request: (id) => ({type: GET_VACCINE_DETAILS_REQUEST, id}),
        response: (res) => ({type: GET_VACCINE_DETAILS_RESPONSE, res}),
        error: (err) => ({type: GET_VACCINE_DETAILS_ERROR, err})
    },
    exportVaccines: {
        request: (callback) => ({type: EXPORT_VACCINES_DATA_REQUEST, callback}),
        response: (res) => ({type: EXPORT_VACCINES_DATA_RESPONSE, res}),
        error: (err) => ({type: EXPORT_VACCINES_DATA_ERROR, err}),
    }
}

export default vaccinesActions;
