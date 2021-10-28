import {GET_PREBORN_DATA_RESPONSE, SET_PREBORN_DATA_REQUEST} from "./preborn.actions";

const initialState = {
    prebornData: null
}

const prebornReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PREBORN_DATA_RESPONSE:
            return {
                ...state,
                prebornData: action.res
            }
        case SET_PREBORN_DATA_REQUEST:
            return {
                ...state,
                prebornData: action.prebornData
            }
        default:
            return state
    }
}

export default prebornReducer;
