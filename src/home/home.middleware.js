import {
    GET_AVERAGE_HEIGHT_DATA_REQUEST,
    GET_AVERAGE_PERIMETER_DATA_REQUEST,
    GET_AVERAGE_WEIGHT_DATA_REQUEST,
    GET_USER_HEIGHT_HISTORY_REQUEST,
    GET_USER_PERIMETER_HISTORY_REQUEST,
    GET_USER_WEIGHT_HISTORY_REQUEST
} from "./home.actions";
import {services} from "./home.services";
import actions from "../actions";
import {SEX} from "../constants/PersonalData";
import {adapt3PercentileData, adapt7PercentileData} from "../utils/averageData";

const homeMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_AVERAGE_WEIGHT_DATA_REQUEST:
            services.getAverageWeightData(getState().home.personalData.sex === SEX.MALE)
                .then(res => dispatch(actions.home.getAverageWeightData.response(adapt7PercentileData(res.weights))))
                .catch(err => dispatch(actions.home.getAverageWeightData.error(err)))
            break;
        case GET_AVERAGE_PERIMETER_DATA_REQUEST:
            services.getAveragePerimeterData(getState().home.personalData.sex === SEX.MALE)
                .then(res => dispatch(actions.home.getAveragePerimeterData.response(adapt3PercentileData(res.perimeters))))
                .catch(err => dispatch(actions.home.getAveragePerimeterData.error(err)))
            break;
        case GET_AVERAGE_HEIGHT_DATA_REQUEST:
            services.getAverageHeightData(getState().home.personalData.sex === SEX.MALE)
                .then(res => dispatch(actions.home.getAverageHeightData.response(adapt7PercentileData(res.heights))))
                .catch(err => dispatch(actions.home.getAverageHeightData.error(err)))
            break;
        case GET_USER_WEIGHT_HISTORY_REQUEST:
            services.getUserWeightHistory()
                .then(res => dispatch(actions.home.getUserWeightHistory.response(res)))
                .catch(err => dispatch(actions.home.getUserWeightHistory.error(err)));
            break;
        case GET_USER_PERIMETER_HISTORY_REQUEST:
            services.getUserPerimeterHistory()
                .then(res => dispatch(actions.home.getUserPerimeterHistory.response(res)))
                .catch(err => dispatch(actions.home.getUserPerimeterHistory.error(err)));
            break;
        case GET_USER_HEIGHT_HISTORY_REQUEST:
            services.getUserHeightHistory()
                .then(res => dispatch(actions.home.getUserHeightHistory.response(res)))
                .catch(err => dispatch(actions.home.getUserHeightHistory.error(err)));
            break;
        default:
            break;
    }
}

export default homeMiddleware;
