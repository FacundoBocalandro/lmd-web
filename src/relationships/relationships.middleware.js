import {services} from "./relationships.services";
import actions from "../actions";
import {
    ADD_NEW_RELATIONSHIP_REQUEST,
    DELETE_RELATIONSHIP_REQUEST,
    GET_ALL_RELATIONSHIPS_REQUEST,
    SEARCH_DOCTORS_REQUEST
} from "./relationships.actions";

const relationshipsMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_ALL_RELATIONSHIPS_REQUEST:
            services.getAllRelationships()
                .then(res => dispatch(actions.relationships.getAllRelationships.response(res)))
                .catch(err => dispatch(actions.relationships.getAllRelationships.error(err)));
            break;
        case ADD_NEW_RELATIONSHIP_REQUEST:
            services.addNewRelationship(action.info)
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.relationships.addNewRelationship.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.relationships.addNewRelationship.error(err));
                });
            break;
        case DELETE_RELATIONSHIP_REQUEST:
            services.deleteRelationship(action.info)
                .then(res => dispatch(actions.relationships.deleteRelationship.response(res)))
                .catch(err => dispatch(actions.relationships.deleteRelationship.error(err)));
            break;
        case SEARCH_DOCTORS_REQUEST:
            services.searchDoctors(action.dni)
                .then(res => {
                    if (action.callback) action.callback(res)
                    dispatch(actions.relationships.searchDoctors.response(res));
                })
                .catch(err => dispatch(actions.relationships.searchDoctors.error(err)));
            break;
        default:
            break;
    }
}

export default relationshipsMiddleware;
