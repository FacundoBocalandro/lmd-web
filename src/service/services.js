import {post} from '../http'

export const services = {
    registerUser: (user) => post('users/register', user)
}
