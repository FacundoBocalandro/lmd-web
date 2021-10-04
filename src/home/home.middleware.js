import {
    CREATE_NEW_HEIGHT_RECORD_REQUEST,
    CREATE_NEW_PERIMETER_RECORD_REQUEST,
    CREATE_NEW_WEIGHT_RECORD_REQUEST,
    GET_AVERAGE_BMI_DATA_REQUEST,
    GET_AVERAGE_HEIGHT_DATA_REQUEST,
    GET_AVERAGE_PERIMETER_DATA_REQUEST,
    GET_AVERAGE_WEIGHT_DATA_REQUEST, GET_USER_BMI_HISTORY_REQUEST,
    GET_USER_HEIGHT_HISTORY_REQUEST,
    GET_USER_PERIMETER_HISTORY_REQUEST,
    GET_USER_WEIGHT_HISTORY_REQUEST
} from "./home.actions";
import {services} from "./home.services";
import actions from "../actions";
import {GENDERS} from "../constants/PersonalData";
import {adapt3PercentileData, adapt7PercentileData, adaptUserHistoryData} from "../utils/averageData";
import {getSelectedPatient} from "../utils/tokens";
import {USER_ROLES} from "../constants/roles";

const homeMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    const getBirthDate = () => getState().session.userInfo.userRole === USER_ROLES.PATIENT ? getState().session.userInfo.birthDate : getState().relationships.relationships.find(user => user.id === getSelectedPatient())?.birthDate

    switch (action.type) {
        case GET_AVERAGE_WEIGHT_DATA_REQUEST:
            services.getAverageWeightData(getState().session.userInfo.gender === GENDERS.MALE)
                .then(res => dispatch(actions.home.getAverageWeightData.response(adapt7PercentileData(res.weights))))
                .catch(err => dispatch(actions.home.getAverageWeightData.error(err)))
            break;
        case GET_AVERAGE_PERIMETER_DATA_REQUEST:
            services.getAveragePerimeterData(getState().session.userInfo.gender === GENDERS.MALE)
                .then(res => dispatch(actions.home.getAveragePerimeterData.response(adapt3PercentileData(res.perimeters))))
                .catch(err => dispatch(actions.home.getAveragePerimeterData.error(err)))
            break;
        case GET_AVERAGE_HEIGHT_DATA_REQUEST:
            services.getAverageHeightData(getState().session.userInfo.gender === GENDERS.MALE)
                .then(res => dispatch(actions.home.getAverageHeightData.response(adapt7PercentileData(res.heights))))
                .catch(err => dispatch(actions.home.getAverageHeightData.error(err)))
            break;
        case GET_AVERAGE_BMI_DATA_REQUEST:
            services.getAverageBmiData(getState().session.userInfo.gender === GENDERS.MALE)
                .then(res => dispatch(actions.home.getAverageBmiData.response(adapt7PercentileData(res.bmiList))))
                .catch(err => dispatch(actions.home.getAverageBmiData.error(err)))
            break;
        case GET_USER_WEIGHT_HISTORY_REQUEST:
            services.getUserWeightHistory(getSelectedPatient())
                .then(res => dispatch(actions.home.getUserWeightHistory.response(adaptUserHistoryData(res, 'weight', getBirthDate()))))
                .catch(err => dispatch(actions.home.getUserWeightHistory.error(err)));
            break;
        case GET_USER_PERIMETER_HISTORY_REQUEST:
            services.getUserPerimeterHistory(getSelectedPatient())
                .then(res => dispatch(actions.home.getUserPerimeterHistory.response(adaptUserHistoryData(res, 'perimeter', getBirthDate()))))
                .catch(err => dispatch(actions.home.getUserPerimeterHistory.error(err)));
            break;
        case GET_USER_HEIGHT_HISTORY_REQUEST:
            services.getUserHeightHistory(getSelectedPatient())
                .then(res => dispatch(actions.home.getUserHeightHistory.response(adaptUserHistoryData(res, 'height', getBirthDate()))))
                .catch(err => dispatch(actions.home.getUserHeightHistory.error(err)));
            break;
        case GET_USER_BMI_HISTORY_REQUEST:
            services.getUserBmiHistory(getSelectedPatient())
                .then(res => dispatch(actions.home.getUserBmiHistory.response(adaptUserHistoryData(res, 'bmi', getBirthDate()))))
                .catch(err => dispatch(actions.home.getUserBmiHistory.error(err)));
            break;
        case CREATE_NEW_WEIGHT_RECORD_REQUEST:
            services.createNewWeightRecord(action.weight, action.timeRecorded, getSelectedPatient())
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.home.createNewWeightRecord.response(res))
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.home.createNewWeightRecord.error(err));
                });
            break;
        case CREATE_NEW_PERIMETER_RECORD_REQUEST:
            services.createNewPerimeterRecord(action.perimeter, action.timeRecorded, getSelectedPatient())
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.home.createNewPerimeterRecord.response(res))
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.home.createNewPerimeterRecord.error(err));
                });
            break;
        case CREATE_NEW_HEIGHT_RECORD_REQUEST:
            services.createNewHeightRecord(action.height, action.timeRecorded, getSelectedPatient())
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.home.createNewHeightRecord.response(res))
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.home.createNewHeightRecord.error(err));
                });
            break;
        default:
            break;
    }
}

export default homeMiddleware;
