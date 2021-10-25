export const SEND_NOTIFICATION_REQUEST = "SEND_NOTIFICATION_REQUEST";
export const SEND_NOTIFICATION_RESPONSE = "SEND_NOTIFICATION_RESPONSE";
export const SEND_NOTIFICATION_ERROR = "SEND_NOTIFICATION_ERROR";

const notificationsActions = {
    sendNotification: {
        request: (notification, callback, errorCallback) => ({type: SEND_NOTIFICATION_REQUEST, notification, callback, errorCallback}),
        response: (res) => ({type: SEND_NOTIFICATION_RESPONSE, res}),
        error: (err) => ({type: SEND_NOTIFICATION_ERROR, err})
    }
}

export default notificationsActions;