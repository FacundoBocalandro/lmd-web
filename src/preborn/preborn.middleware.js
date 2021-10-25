import {services} from "./preborn.services";
import actions from "../actions";
import {EXPORT_PREBORN_DATA_REQUEST, GET_PREBORN_DATA_REQUEST, SET_PREBORN_DATA_REQUEST} from "./preborn.actions";
import {getSelectedPatient} from "../utils/tokens";

const prebornMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_PREBORN_DATA_REQUEST:
            services.getPrebornData(getSelectedPatient())
                .then(res => dispatch(actions.preborn.getPrebornData.response(res)))
                .catch(err => dispatch(actions.preborn.getPrebornData.error(err)));
            break;
        case SET_PREBORN_DATA_REQUEST:
            services.setPrebornData(action.prebornData, getSelectedPatient())
                .then(res => dispatch(actions.preborn.setPrebornData.response(res)))
                .catch(err => dispatch(actions.preborn.setPrebornData.error(err)));
            break;
        case EXPORT_PREBORN_DATA_REQUEST:
            services.exportPrebornData(getSelectedPatient())
                .then(res => {
                    if (action.callback) action.callback(res.body);
                    dispatch(actions.preborn.exportPrebornData.response(res));
                })
                .catch(err => {
                    dispatch(actions.preborn.exportPrebornData.error(err))
                });
            break;
        default:
            break;
    }
}

export default prebornMiddleware;
