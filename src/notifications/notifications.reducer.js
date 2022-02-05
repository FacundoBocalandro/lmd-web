import {GET_ALL_NOTIFICATIONS_REQUEST} from "./notifications.actions";

const initialState = {
    notifications: []
}

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFICATIONS_REQUEST:
            return{
                ...state,
                notifications: action.res
            }
        default:
            return state
    }
}

export default notificationsReducer;
