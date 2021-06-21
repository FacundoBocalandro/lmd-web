import {
    GET_ALL_VACCINES_RESPONSE,
    GET_USER_VACCINES_RESPONSE,
} from "./vaccines.actions";

const initialState = {
    allVaccines: undefined,
    userVaccines: undefined
}

const vaccinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VACCINES_RESPONSE:
            return {...state, allVaccines: action.res}
        case GET_USER_VACCINES_RESPONSE:
            return {...state, userVaccines: action.res}
        default:
            return state;
    }
}

export default vaccinesReducer;
