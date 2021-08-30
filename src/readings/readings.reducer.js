import {GET_READING_CATEGORIES_RESPONSE} from "./readings.actions";

const initialState = {
    categories: []
}

const readingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_READING_CATEGORIES_RESPONSE:
            return {
                ...state,
                categories: action.res
            }
        default:
            return state
    }
}

export default readingsReducer;
