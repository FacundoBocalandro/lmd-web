import {GET_ALL_VACCINES_REQUEST, GET_USER_VACCINES_REQUEST} from "./vaccines.actions";
import {services} from "./vaccines.services";
import actions from "../actions";

const vaccinesMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_ALL_VACCINES_REQUEST:
            services.getAllVaccines()
                .then(res => dispatch(actions.vaccines.getAllVaccines.response(res)))
                .catch(err => dispatch(actions.vaccines.getAllVaccines.error(err)));
            break;
        case GET_USER_VACCINES_REQUEST:
            services.getUserVaccines()
                .then(res => dispatch(actions.vaccines.getUserVaccines.response(res.vaccineApplications)))
                .catch(err => dispatch(actions.vaccines.getUserVaccines.error(err)));
            break;
        default:
            break;
    }
}

export default vaccinesMiddleware;
