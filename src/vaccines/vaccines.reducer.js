import {
    GET_ALL_VACCINES_RESPONSE,
    GET_USER_VACCINES_RESPONSE, GET_VACCINE_DETAILS_ERROR, GET_VACCINE_DETAILS_RESPONSE,
} from "./vaccines.actions";

const initialState = {
    allVaccines: undefined,
    userVaccines: undefined,
    vaccineDetails: undefined
}

const vaccinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VACCINES_RESPONSE:
            return {...state, allVaccines: action.res}
        case GET_USER_VACCINES_RESPONSE:
            return {...state, userVaccines: action.res}
        case GET_VACCINE_DETAILS_RESPONSE:
            return {...state, vaccineDetails: action.res}
        case GET_VACCINE_DETAILS_ERROR:
            return {...state, vaccineDetails: initialState.vaccineDetails}
        default:
            return state;
    }
}

export default vaccinesReducer;
