import {
    ADD_NEW_RELATIONSHIP_RESPONSE,
    DELETE_RELATIONSHIP_REQUEST,
    GET_ALL_RELATIONSHIPS_RESPONSE
} from "./relationships.actions";

const initialState = {
    relationships: []
}

const relationshipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RELATIONSHIPS_RESPONSE:
            return {
                ...state,
                relationships: action.res.users
            }
        case ADD_NEW_RELATIONSHIP_RESPONSE:
            return {
                ...state,
                relationships: action.res.users
            }
        case DELETE_RELATIONSHIP_REQUEST:
            return {
                ...state,
                relationships: state.relationships.filter(relationship => relationship.id !== action.info.doctorId)
            }
        default:
            return state
    }
}

export default relationshipsReducer;
