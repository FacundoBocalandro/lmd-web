import {post, get} from "../utils/http";

export const services = {
    sendNotification: (notification) => post('notifications', notification),
    getNotifications: () => get('notifications')
}
