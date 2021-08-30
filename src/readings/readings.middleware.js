import {services} from "./readings.services";
import actions from "../actions";
import {GET_READING_CATEGORIES_REQUEST, GET_READINGS_BY_CATEGORY_REQUEST} from "./readings.actions";

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
        default:
            break;
    }
}

export default readingsMiddleware;
