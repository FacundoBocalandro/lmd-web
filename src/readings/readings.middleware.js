import {services} from "./readings.services";
import actions from "../actions";
import {
    ADD_READING_REQUEST,
    GET_READING_CATEGORIES_REQUEST,
    GET_READINGS_BY_CATEGORY_REQUEST, UPLOAD_IMAGE_REQUEST
} from "./readings.actions";

const readingsMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_READING_CATEGORIES_REQUEST:
            services.getCategories()
                .then(res => dispatch(actions.readings.getReadingCategories.response(res)))
                .catch(err => dispatch(actions.readings.getReadingCategories.error(err)));
            break;
        case GET_READINGS_BY_CATEGORY_REQUEST:
            services.getReadingsByCategory(action.categoryId)
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.readings.getReadingsByCategory.response(res));
                })
                .catch(err => dispatch(actions.readings.getReadingsByCategory.error(err)));
            break;
        case ADD_READING_REQUEST:
            services.addReading(action.reading)
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.readings.addReading.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.readings.addReading.error(err));
                });
            break;
        case UPLOAD_IMAGE_REQUEST:
            services.uploadImage(action.image)
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.readings.uploadImage.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.readings.uploadImage.error(err));
                });
            break;
        default:
            break;
    }
}

export default readingsMiddleware;
