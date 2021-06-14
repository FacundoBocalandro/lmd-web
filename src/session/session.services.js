import {post, get} from "../utils/http";

export const services = {
    registerUser: (user) => post('users/register', user, {noAuth: true}),
    checkUsernameUsed: (username) => get(`users/available/${username}`, {noAuth: true}),
    login: (form) => post('login', form, {noAuth: true})
}
