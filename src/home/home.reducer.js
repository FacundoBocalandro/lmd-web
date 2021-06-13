import {
    GET_AVERAGE_HEIGHT_DATA_RESPONSE,
    GET_AVERAGE_PERIMETER_DATA_RESPONSE,
    GET_AVERAGE_WEIGHT_DATA_RESPONSE, GET_USER_HEIGHT_HISTORY_RESPONSE,
    GET_USER_PERIMETER_HISTORY_RESPONSE,
    GET_USER_WEIGHT_HISTORY_RESPONSE
} from "./home.actions";

const initialState = {
    personalData: {
        avatar: 'OTTER',
        fullName: "Facundo Bocalandro",
        age: 20,
        dni: "42648941",
        sex: "MALE"
    },
    averageWeightData: undefined,
    averagePerimeterData: undefined,
    averageHeightData: undefined,
    userWeightHistory: undefined,
    userPerimeterHistory: undefined,
    userHeightHistory: undefined
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
        default:
            return state
    }
}

export default homeReducer;
