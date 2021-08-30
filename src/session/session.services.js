import {post, get} from "../utils/http";

export const services = {
    registerPatient: (user) => post('users/register', user, {noAuth: true}),
    registerDoctor: (user) => post('users/register/doctor', user, {noAuth: true}),
    checkUsernameUsed: (username) => get(`users/available/${username}`, {noAuth: true}),
    login: (form) => post('login', form, {noAuth: true}),
    getUserInfo: (token) => get('users/current', {token})
}
