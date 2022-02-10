export const SEND_NOTIFICATION_REQUEST = "SEND_NOTIFICATION_REQUEST";
export const SEND_NOTIFICATION_RESPONSE = "SEND_NOTIFICATION_RESPONSE";
export const SEND_NOTIFICATION_ERROR = "SEND_NOTIFICATION_ERROR";
export const GET_ALL_NOTIFICATIONS_REQUEST= "GET_ALL_NOTIFICATIONS_REQUEST";
export const GET_ALL_NOTIFICATIONS_RESPONSE= "GET_ALL_NOTIFICATIONS_RESPONSE";
export const GET_ALL_NOTIFICATIONS_ERROR= "GET_ALL_NOTIFICATIONS_ERROR";

const notificationsActions = {
    sendNotification: {
        request: (notification, callback, errorCallback) => ({type: SEND_NOTIFICATION_REQUEST, notification, callback, errorCallback}),
        response: (res) => ({type: SEND_NOTIFICATION_RESPONSE, res}),
        error: (err) => ({type: SEND_NOTIFICATION_ERROR, err})
    },
    getAllNotifications: {
        request: () => ({type: GET_ALL_NOTIFICATIONS_REQUEST}),
        response: (res) => ({type: GET_ALL_NOTIFICATIONS_RESPONSE, res}),
        error: (err) => ({type: GET_ALL_NOTIFICATIONS_ERROR, err})
    }
}

export default notificationsActions;