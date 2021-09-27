export const GET_ALL_RELATIONSHIPS_REQUEST = "GET_ALL_RELATIONSHIPS_REQUEST";
export const GET_ALL_RELATIONSHIPS_RESPONSE = "GET_ALL_RELATIONSHIPS_RESPONSE";
export const GET_ALL_RELATIONSHIPS_ERROR = "GET_ALL_RELATIONSHIPS_ERROR";
export const ADD_NEW_RELATIONSHIP_REQUEST = "ADD_NEW_RELATIONSHIP_REQUEST";
export const ADD_NEW_RELATIONSHIP_RESPONSE = "ADD_NEW_RELATIONSHIP_RESPONSE";
export const ADD_NEW_RELATIONSHIP_ERROR = "ADD_NEW_RELATIONSHIP_ERROR";
export const DELETE_RELATIONSHIP_REQUEST = "DELETE_RELATIONSHIP_REQUEST";
export const DELETE_RELATIONSHIP_RESPONSE = "DELETE_RELATIONSHIP_RESPONSE";
export const DELETE_RELATIONSHIP_ERROR = "DELETE_RELATIONSHIP_ERROR";
export const SEARCH_DOCTORS_REQUEST = "SEARCH_DOCTORS_REQUEST";
export const SEARCH_DOCTORS_RESPONSE = "SEARCH_DOCTORS_RESPONSE";
export const SEARCH_DOCTORS_ERROR = "SEARCH_DOCTORS_ERROR";

const relationshipsActions = {
    getAllRelationships: {
        request: () => ({type: GET_ALL_RELATIONSHIPS_REQUEST}),
        response: (res) => ({type: GET_ALL_RELATIONSHIPS_RESPONSE, res}),
        error: (err) => ({type: GET_ALL_RELATIONSHIPS_ERROR, err})
    },
    addNewRelationship: {
        request: (info, callback, errorCallback) => ({type: ADD_NEW_RELATIONSHIP_REQUEST, info, callback, errorCallback}),
        response: (res) => ({type: ADD_NEW_RELATIONSHIP_RESPONSE, res}),
        error: (err) => ({type: ADD_NEW_RELATIONSHIP_ERROR, err}),
    },
    deleteRelationship: {
        request: (info) => ({type: DELETE_RELATIONSHIP_REQUEST, info}),
        response: (res) => ({type: DELETE_RELATIONSHIP_RESPONSE, res}),
        error: (err) => ({type: DELETE_RELATIONSHIP_ERROR, err}),
    },
    searchDoctors: {
        request: (dni, callback) => ({type: SEARCH_DOCTORS_REQUEST, dni, callback}),
        response: (res) => ({type: SEARCH_DOCTORS_RESPONSE, res}),
        error: (err) => ({type: SEARCH_DOCTORS_ERROR, err}),
    }
}

export default relationshipsActions;
