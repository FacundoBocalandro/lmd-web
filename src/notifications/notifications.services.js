import {post} from "../utils/http";

export const services = {
    sendNotification: (notification) => post('notifications', notification)
}
