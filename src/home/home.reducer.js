import {
    GET_AVERAGE_BMI_DATA_RESPONSE,
    GET_AVERAGE_HEIGHT_DATA_RESPONSE,
    GET_AVERAGE_PERIMETER_DATA_RESPONSE,
    GET_AVERAGE_WEIGHT_DATA_RESPONSE, GET_USER_BMI_HISTORY_RESPONSE, GET_USER_HEIGHT_HISTORY_RESPONSE,
    GET_USER_PERIMETER_HISTORY_RESPONSE,
    GET_USER_WEIGHT_HISTORY_RESPONSE
} from "./home.actions";

const initialState = {
    averageWeightData: undefined,
    averagePerimeterData: undefined,
    averageHeightData: undefined,
    averageBmiData: undefined,
    userWeightHistory: undefined,
    userPerimeterHistory: undefined,
    userHeightHistory: undefined,
    userBmiHistory: undefined,
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AVERAGE_WEIGHT_DATA_RESPONSE:
            return {
                ...state,
                averageWeightData: action.weights
            }
        case GET_AVERAGE_PERIMETER_DATA_RESPONSE:
            return {
                ...state,
                averagePerimeterData: action.perimeters
            }
        case GET_AVERAGE_HEIGHT_DATA_RESPONSE:
            return {
                ...state,
                averageHeightData: action.heights
            }
        case GET_AVERAGE_BMI_DATA_RESPONSE:
            return {
                ...state,
                averageBmiData: action.bmiList
            }
        case GET_USER_WEIGHT_HISTORY_RESPONSE:
            return {
                ...state,
                userWeightHistory: action.history
            }
        case GET_USER_PERIMETER_HISTORY_RESPONSE:
            return {
                ...state,
                userPerimeterHistory: action.history
            }
        case GET_USER_HEIGHT_HISTORY_RESPONSE:
            return {
                ...state,
                userHeightHistory: action.history
            }
        case GET_USER_BMI_HISTORY_RESPONSE:
            return {
                ...state,
                userBmiHistory: action.history
            }
        default:
            return state
    }
}

export default homeReducer;
