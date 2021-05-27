import {post, get} from "../utils/http";

export const services = {
    registerUser: (user) => post('users/register', user),
    checkUsernameUsed: (username) => get(`users/available/${username}`),
    login: (form) => post('login', form)
}
