export const GET_PREBORN_DATA_REQUEST = "GET_PREBORN_DATA_REQUEST";
export const GET_PREBORN_DATA_RESPONSE = "GET_PREBORN_DATA_RESPONSE";
export const GET_PREBORN_DATA_ERROR = "GET_PREBORN_DATA_ERROR";
export const SET_PREBORN_DATA_REQUEST = "SET_PREBORN_DATA_REQUEST";
export const SET_PREBORN_DATA_RESPONSE = "SET_PREBORN_DATA_RESPONSE";
export const SET_PREBORN_DATA_ERROR = "SET_PREBORN_DATA_ERROR";
export const EXPORT_PREBORN_DATA_REQUEST = "EXPORT_PREBORN_DATA_REQUEST";
export const EXPORT_PREBORN_DATA_RESPONSE = "EXPORT_PREBORN_DATA_RESPONSE";
export const EXPORT_PREBORN_DATA_ERROR = "EXPORT_PREBORN_DATA_ERROR";

const prebornActions = {
    getPrebornData: {
        request: () => ({type: GET_PREBORN_DATA_REQUEST}),
        response: (res) => ({type: GET_PREBORN_DATA_RESPONSE, res}),
        error: (err) => ({type: GET_PREBORN_DATA_ERROR, err}),
    },
    setPrebornData: {
        request: (prebornData) => ({type: SET_PREBORN_DATA_REQUEST, prebornData}),
        response: (res) => ({type: SET_PREBORN_DATA_RESPONSE, res}),
        error: (err) => ({type: SET_PREBORN_DATA_ERROR, err}),
    },
    exportPrebornData: {
        request: (callback) => ({type: EXPORT_PREBORN_DATA_REQUEST, callback}),
        response: (res) => ({type: EXPORT_PREBORN_DATA_RESPONSE, res}),
        error: (err) => ({type: EXPORT_PREBORN_DATA_ERROR, err}),
    }
}

export default prebornActions;
