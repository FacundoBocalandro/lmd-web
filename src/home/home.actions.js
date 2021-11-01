export const GET_AVERAGE_WEIGHT_DATA_REQUEST = "GET_AVERAGE_WEIGHT_DATA_REQUEST";
export const GET_AVERAGE_WEIGHT_DATA_RESPONSE = "GET_AVERAGE_WEIGHT_DATA_RESPONSE";
export const GET_AVERAGE_WEIGHT_DATA_ERROR = "GET_AVERAGE_WEIGHT_DATA_ERROR";
export const GET_AVERAGE_PERIMETER_DATA_REQUEST = "GET_AVERAGE_PERIMETER_DATA_REQUEST";
export const GET_AVERAGE_PERIMETER_DATA_RESPONSE = "GET_AVERAGE_PERIMETER_DATA_RESPONSE";
export const GET_AVERAGE_PERIMETER_DATA_ERROR = "GET_AVERAGE_PERIMETER_DATA_ERROR";
export const GET_AVERAGE_HEIGHT_DATA_REQUEST = "GET_AVERAGE_HEIGHT_DATA_REQUEST";
export const GET_AVERAGE_HEIGHT_DATA_RESPONSE = "GET_AVERAGE_HEIGHT_DATA_RESPONSE";
export const GET_AVERAGE_HEIGHT_DATA_ERROR = "GET_AVERAGE_HEIGHT_DATA_ERROR";
export const GET_AVERAGE_BMI_DATA_REQUEST = "GET_AVERAGE_BMI_DATA_REQUEST";
export const GET_AVERAGE_BMI_DATA_RESPONSE = "GET_AVERAGE_BMI_DATA_RESPONSE";
export const GET_AVERAGE_BMI_DATA_ERROR = "GET_AVERAGE_BMI_DATA_ERROR";
export const GET_USER_WEIGHT_HISTORY_REQUEST = "GET_USER_WEIGHT_HISTORY_REQUEST";
export const GET_USER_WEIGHT_HISTORY_RESPONSE = "GET_USER_WEIGHT_HISTORY_RESPONSE";
export const GET_USER_WEIGHT_HISTORY_ERROR = "GET_USER_WEIGHT_HISTORY_ERROR";
export const GET_USER_PERIMETER_HISTORY_REQUEST = "GET_USER_PERIMETER_HISTORY_REQUEST";
export const GET_USER_PERIMETER_HISTORY_RESPONSE = "GET_USER_PERIMETER_HISTORY_RESPONSE";
export const GET_USER_PERIMETER_HISTORY_ERROR = "GET_USER_PERIMETER_HISTORY_ERROR";
export const GET_USER_HEIGHT_HISTORY_REQUEST = "GET_USER_HEIGHT_HISTORY_REQUEST";
export const GET_USER_HEIGHT_HISTORY_RESPONSE = "GET_USER_HEIGHT_HISTORY_RESPONSE";
export const GET_USER_HEIGHT_HISTORY_ERROR = "GET_USER_HEIGHT_HISTORY_ERROR";
export const GET_USER_BMI_HISTORY_REQUEST = "GET_USER_BMI_HISTORY_REQUEST";
export const GET_USER_BMI_HISTORY_RESPONSE = "GET_USER_BMI_HISTORY_RESPONSE";
export const GET_USER_BMI_HISTORY_ERROR = "GET_USER_BMI_HISTORY_ERROR";
export const CREATE_NEW_WEIGHT_RECORD_REQUEST = "CREATE_NEW_WEIGHT_RECORD_REQUEST";
export const CREATE_NEW_WEIGHT_RECORD_RESPONSE = "CREATE_NEW_WEIGHT_RECORD_RESPONSE";
export const CREATE_NEW_WEIGHT_RECORD_ERROR = "CREATE_NEW_WEIGHT_RECORD_ERROR";
export const CREATE_NEW_PERIMETER_RECORD_REQUEST = "CREATE_NEW_PERIMETER_RECORD_REQUEST";
export const CREATE_NEW_PERIMETER_RECORD_RESPONSE = "CREATE_NEW_PERIMETER_RECORD_RESPONSE";
export const CREATE_NEW_PERIMETER_RECORD_ERROR = "CREATE_NEW_PERIMETER_RECORD_ERROR";
export const CREATE_NEW_HEIGHT_RECORD_REQUEST = "CREATE_NEW_HEIGHT_RECORD_REQUEST";
export const CREATE_NEW_HEIGHT_RECORD_RESPONSE = "CREATE_NEW_HEIGHT_RECORD_RESPONSE";
export const CREATE_NEW_HEIGHT_RECORD_ERROR = "CREATE_NEW_HEIGHT_RECORD_ERROR";
export const EXPORT_GROWTH_DATA_REQUEST = "EXPORT_GROWTH_DATA_REQUEST";
export const EXPORT_GROWTH_DATA_RESPONSE = "EXPORT_GROWTH_DATA_RESPONSE";
export const EXPORT_GROWTH_DATA_ERROR = "EXPORT_GROWTH_DATA_ERROR";

const homeActions = {
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
     * Get BMI percentile values to display in home screen chart
     */
    getAverageBmiData: {
        request: () => ({type: GET_AVERAGE_BMI_DATA_REQUEST}),
        response: (bmiList) => ({type: GET_AVERAGE_BMI_DATA_RESPONSE, bmiList}),
        error: (err) => ({type: GET_AVERAGE_BMI_DATA_ERROR, err}),
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
    /**
     * Get user's bmi history to display in home screen chart,
     * and show the difference with average values
     */
    getUserBmiHistory: {
        request: () => ({type: GET_USER_BMI_HISTORY_REQUEST}),
        response: (history) => ({type: GET_USER_BMI_HISTORY_RESPONSE, history}),
        error: (err) => ({type: GET_USER_BMI_HISTORY_ERROR, err}),
    },
    /**
     * Create new weight record to keep track of growth history
     */
    createNewWeightRecord: {
        request: (weight, timeRecorded, callback, errorCallback) => ({type: CREATE_NEW_WEIGHT_RECORD_REQUEST, weight, timeRecorded, callback, errorCallback}),
        response: (res) => ({type: CREATE_NEW_WEIGHT_RECORD_RESPONSE, res}),
        error: (err) => ({type: CREATE_NEW_WEIGHT_RECORD_ERROR, err}),
    },
    /**
     * Create new perimeter record to keep track of growth history
     */
    createNewPerimeterRecord: {
        request: (perimeter, timeRecorded, callback, errorCallback) => ({type: CREATE_NEW_PERIMETER_RECORD_REQUEST, perimeter, timeRecorded, callback, errorCallback}),
        response: (res) => ({type: CREATE_NEW_PERIMETER_RECORD_RESPONSE, res}),
        error: (err) => ({type: CREATE_NEW_PERIMETER_RECORD_ERROR, err}),
    },
    /**
     * Create new height record to keep track of growth history
     */
    createNewHeightRecord: {
        request: (height, timeRecorded, callback, errorCallback) => ({type: CREATE_NEW_HEIGHT_RECORD_REQUEST, height, timeRecorded, callback, errorCallback}),
        response: (res) => ({type: CREATE_NEW_HEIGHT_RECORD_RESPONSE, res}),
        error: (err) => ({type: CREATE_NEW_HEIGHT_RECORD_ERROR, err}),
    },
    exportGrowthData: {
        request: (callback) => ({type: EXPORT_GROWTH_DATA_REQUEST, callback}),
        response: (res) => ({type: EXPORT_GROWTH_DATA_RESPONSE, res}),
        error: (err) => ({type: EXPORT_GROWTH_DATA_ERROR, err}),
    }
}

export default homeActions;
