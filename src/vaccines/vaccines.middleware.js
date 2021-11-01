import {
    GET_ALL_VACCINES_REQUEST,
    GET_USER_VACCINES_REQUEST,
    GET_VACCINE_DETAILS_REQUEST,
    SUBMIT_NEW_VACCINATION_REQUEST,
    UPDATE_VACCINATION_REQUEST,
    DELETE_VACCINATION_REQUEST
} from "./vaccines.actions";
import {services} from "./vaccines.services";
import actions from "../actions";
import {getSelectedPatient} from "../utils/tokens";

const vaccinesMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_ALL_VACCINES_REQUEST:
            services.getAllVaccines()
                .then(res => dispatch(actions.vaccines.getAllVaccines.response(res.vaccines)))
                .catch(err => dispatch(actions.vaccines.getAllVaccines.error(err)));
            break;
        case GET_USER_VACCINES_REQUEST:
            services.getUserVaccines(getSelectedPatient())
                .then(res => dispatch(actions.vaccines.getUserVaccines.response(res.vaccineApplications)))
                .catch(err => dispatch(actions.vaccines.getUserVaccines.error(err)));
            break;
        case SUBMIT_NEW_VACCINATION_REQUEST:
            services.submitNewVaccination({...action.vaccinationInfo, patientId: getSelectedPatient()})
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.vaccines.submitNewVaccination.response(res))
                    dispatch(actions.vaccines.getUserVaccines.request());
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.vaccines.submitNewVaccination.error(err))
                });
            break;
        case GET_VACCINE_DETAILS_REQUEST:
            services.getVaccineDetails(action.id)
                .then(res => dispatch(actions.vaccines.getVaccineDetails.response(res)))
                .catch(err => dispatch(actions.vaccines.getVaccineDetails.error(err)));
            break;
        case UPDATE_VACCINATION_REQUEST:
            services.updateVaccination(action.id, action.vaccinationInfo, getSelectedPatient())
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.vaccines.updateVaccination.response(res))
                    dispatch(actions.vaccines.getUserVaccines.request());
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.vaccines.updateVaccination.error(err))
                });
            break;
        case DELETE_VACCINATION_REQUEST:
            services.deleteVaccination(action.id, getSelectedPatient())
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.vaccines.deleteVaccination.response(res))
                    dispatch(actions.vaccines.getUserVaccines.request());
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.vaccines.deleteVaccination.error(err))
                });
            break;
        default:
            break;
    }
}

export default vaccinesMiddleware;
