import {services} from "./notifications.services";
import actions from "../actions";
import {SEND_NOTIFICATION_REQUEST} from "./notifications.actions";

const notificationsMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case SEND_NOTIFICATION_REQUEST:
            services.sendNotification(action.notification)
                .then(res => {
                    if (action.callback) action.callback();
                    dispatch(actions.notifications.sendNotification.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback();
                    dispatch(actions.notifications.sendNotification.error(err));
                });
            break;
        default:
            break;
    }
}

export default notificationsMiddleware;
