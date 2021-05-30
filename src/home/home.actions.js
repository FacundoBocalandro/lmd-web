export const GET_PERSONAL_DATA_REQUEST = "GET_PERSONAL_DATA_REQUEST";
export const GET_PERSONAL_DATA_RESPONSE = "GET_PERSONAL_DATA_RESPONSE";
export const GET_PERSONAL_DATA_ERROR = "GET_PERSONAL_DATA_ERROR";

const homeActions = {
    getPersonalData: {
        request: () => ({type: GET_PERSONAL_DATA_REQUEST}),
        response: (res) => ({type: GET_PERSONAL_DATA_RESPONSE, res}),
        error: (err) => ({type: GET_PERSONAL_DATA_ERROR, err}),
    }
}

export default homeActions;
