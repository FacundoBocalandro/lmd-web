export const GET_PERSONAL_DATA_REQUEST = "GET_PERSONAL_DATA_REQUEST";
export const GET_PERSONAL_DATA_RESPONSE = "GET_PERSONAL_DATA_RESPONSE";
export const GET_PERSONAL_DATA_ERROR = "GET_PERSONAL_DATA_ERROR";
export const GET_AVERAGE_WEIGHT_DATA_REQUEST = "GET_AVERAGE_WEIGHT_DATA_REQUEST";
export const GET_AVERAGE_WEIGHT_DATA_RESPONSE = "GET_AVERAGE_WEIGHT_DATA_RESPONSE";
export const GET_AVERAGE_WEIGHT_DATA_ERROR = "GET_AVERAGE_WEIGHT_DATA_ERROR";
export const GET_AVERAGE_PERIMETER_DATA_REQUEST = "GET_AVERAGE_PERIMETER_DATA_REQUEST";
export const GET_AVERAGE_PERIMETER_DATA_RESPONSE = "GET_AVERAGE_PERIMETER_DATA_RESPONSE";
export const GET_AVERAGE_PERIMETER_DATA_ERROR = "GET_AVERAGE_PERIMETER_DATA_ERROR";
export const GET_AVERAGE_HEIGHT_DATA_REQUEST = "GET_AVERAGE_HEIGHT_DATA_REQUEST";
export const GET_AVERAGE_HEIGHT_DATA_RESPONSE = "GET_AVERAGE_HEIGHT_DATA_RESPONSE";
export const GET_AVERAGE_HEIGHT_DATA_ERROR = "GET_AVERAGE_HEIGHT_DATA_ERROR";
export const GET_USER_WEIGHT_HISTORY_REQUEST = "GET_USER_WEIGHT_HISTORY_REQUEST";
export const GET_USER_WEIGHT_HISTORY_RESPONSE = "GET_USER_WEIGHT_HISTORY_RESPONSE";
export const GET_USER_WEIGHT_HISTORY_ERROR = "GET_USER_WEIGHT_HISTORY_ERROR";
export const GET_USER_PERIMETER_HISTORY_REQUEST = "GET_USER_PERIMETER_HISTORY_REQUEST";
export const GET_USER_PERIMETER_HISTORY_RESPONSE = "GET_USER_PERIMETER_HISTORY_RESPONSE";
export const GET_USER_PERIMETER_HISTORY_ERROR = "GET_USER_PERIMETER_HISTORY_ERROR";
export const GET_USER_HEIGHT_HISTORY_REQUEST = "GET_USER_HEIGHT_HISTORY_REQUEST";
export const GET_USER_HEIGHT_HISTORY_RESPONSE = "GET_USER_HEIGHT_HISTORY_RESPONSE";
export const GET_USER_HEIGHT_HISTORY_ERROR = "GET_USER_HEIGHT_HISTORY_ERROR";

const homeActions = {
    getPersonalData: {
        request: () => ({type: GET_PERSONAL_DATA_REQUEST}),
        response: (res) => ({type: GET_PERSONAL_DATA_RESPONSE, res}),
        error: (err) => ({type: GET_PERSONAL_DATA_ERROR, err}),
    },
    /**
     * Get weight percentile values to display in home screen chart
     */
    getAverageWeightData: {
        request: () => ({type: GET_AVERAGE_WEIGHT_DATA_REQUEST}),
        response: (weights) => ({type: GET_AVERAGE_WEIGHT_DATA_RESPONSE, weights}),
        error: (err) => ({type: GET_AVERAGE_WEIGHT_DATA_ERROR, err}),
    },
    /**
     * Get perimeter percentile values to display in home screen chart
     */
    getAveragePerimeterData: {
        request: () => ({type: GET_AVERAGE_PERIMETER_DATA_REQUEST}),
        response: (perimeters) => ({type: GET_AVERAGE_PERIMETER_DATA_RESPONSE, perimeters}),
        error: (err) => ({type: GET_AVERAGE_PERIMETER_DATA_ERROR, err}),
    },
    /**
     * Get height percentile values to display in home screen chart
     */
    getAverageHeightData: {
        request: () => ({type: GET_AVERAGE_HEIGHT_DATA_REQUEST}),
        response: (heights) => ({type: GET_AVERAGE_HEIGHT_DATA_RESPONSE, heights}),
        error: (err) => ({type: GET_AVERAGE_HEIGHT_DATA_ERROR, err}),
    },
    /**
     * Get user's weight history to display in home screen chart,
     * and show the difference with average values
     */
    getUserWeightHistory: {
        request: () => ({type: GET_USER_WEIGHT_HISTORY_REQUEST}),
        response: (history) => ({type: GET_USER_WEIGHT_HISTORY_RESPONSE, history}),
        error: (err) => ({type: GET_USER_WEIGHT_HISTORY_ERROR, err}),
    },
    /**
     * Get user's perimeter history to display in home screen chart,
     * and show the difference with average values
     */
    getUserPerimeterHistory: {
        request: () => ({type: GET_USER_PERIMETER_HISTORY_REQUEST}),
        response: (history) => ({type: GET_USER_PERIMETER_HISTORY_RESPONSE, history}),
        error: (err) => ({type: GET_USER_PERIMETER_HISTORY_ERROR, err}),
    },
    /**
     * Get user's height history to display in home screen chart,
     * and show the difference with average values
     */
    getUserHeightHistory: {
        request: () => ({type: GET_USER_HEIGHT_HISTORY_REQUEST}),
        response: (history) => ({type: GET_USER_HEIGHT_HISTORY_RESPONSE, history}),
        error: (err) => ({type: GET_USER_HEIGHT_HISTORY_ERROR, err}),
    },
}

export default homeActions;
