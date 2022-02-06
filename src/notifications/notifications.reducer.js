import {GET_ALL_NOTIFICATIONS_RESPONSE, SEND_NOTIFICATION_RESPONSE} from "./notifications.actions";

const initialState = {
    notifications: []
}

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_NOTIFICATION_RESPONSE:
            return {
                ...state,
                notifications: [action.res, ...state.notifications]
            }
        case GET_ALL_NOTIFICATIONS_RESPONSE:
            return{
                ...state,
                notifications: action.res
            }
        default:
            return state
    }
}

export default notificationsReducer;
