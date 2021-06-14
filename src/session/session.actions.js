export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";
export const CHECK_USERNAME_USED_REQUEST = "CHECK_USERNAME_USED_REQUEST";
export const CHECK_USERNAME_USED_RESPONSE = "CHECK_USERNAME_USED_RESPONSE";
export const CHECK_USERNAME_USED_ERROR = "CHECK_USERNAME_USED_ERROR";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_RESPONSE = "GET_USER_INFO_RESPONSE";
export const GET_USER_INFO_ERROR = "GET_USER_INFO_ERROR";


const sessionActions = {
    registerUser: {
        request: (user, callback, errorCallback) => ({type: REGISTER_USER_REQUEST, user, callback, errorCallback}),
        response: (res) => ({type: REGISTER_USER_RESPONSE, res}),
        error: (err) => ({type: REGISTER_USER_ERROR, err}),
    },
    checkUsernameUsed: {
        request: (username, callback, errorCallback) => ({type: CHECK_USERNAME_USED_REQUEST, username, callback, errorCallback}),
        response: (res) => ({type: CHECK_USERNAME_USED_RESPONSE, res}),
        error: (err) => ({type: CHECK_USERNAME_USED_ERROR, err}),
    },
    login: {
        /**
         * Request user login. Form contains username and password.
         * Callback is called if login is successful.
         * Error Callback is called if login is unsuccessful.
         * @param form
         * @param callback
         * @param errorCallback
         * @returns {{errorCallback, form, callback, type: string}}
         */
        request: (form, callback, errorCallback) => ({type: LOGIN_REQUEST, form, callback, errorCallback}),
        /**
         * Login response. returns token.
         * @param res
         * @returns {{res, type: string}}
         */
        response: (res) => ({type: LOGIN_RESPONSE, res}),
        /**
         * Login error. returns error status and message.
         * @param err
         * @returns {{err, type: string}}
         */
        error: (err) => ({type: LOGIN_ERROR, err}),
    },
    /**
     * Restart redux store
     * @returns {{type: string}}
     */
    logout: () => ({type: LOGOUT}),
    /**
     * Get user information to display data accordingly (for example, differences between male and female)
     */
    getUserInfo: {
        request: () => ({type: GET_USER_INFO_REQUEST}),
        response: (res) => ({type: GET_USER_INFO_RESPONSE, res}),
        error: (err) => ({type: GET_USER_INFO_ERROR, err}),
    }
}

export default sessionActions;
