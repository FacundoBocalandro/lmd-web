import {
    CHECK_USERNAME_USED_ERROR,
    CHECK_USERNAME_USED_REQUEST,
    CHECK_USERNAME_USED_RESPONSE, GET_USER_INFO_FROM_TOKEN_RESPONSE,
    GET_USER_INFO_RESPONSE,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_RESPONSE,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_RESPONSE
} from "./session.actions";

const initialState = {
    userInfo: undefined,
    allUsersInfo: undefined,
    ui: {
        checkUsernameUsedPending: false,
        checkUsernameUsedError: false,
        registerPending: false,
        loginPending: false,
    }
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, ui: {...state.ui, registerPending: true}}
        case REGISTER_USER_RESPONSE:
            return {...state, ui: {...state.ui, registerPending: false}}
        case REGISTER_USER_ERROR:
            return {...state, ui: {...state.ui, registerPending: false}}
        case CHECK_USERNAME_USED_REQUEST:
            return {...state, ui: {...state.ui, checkUsernameUsedPending: true}}
        case CHECK_USERNAME_USED_RESPONSE:
            return {...state, ui: {...state.ui, checkUsernameUsedPending: false, checkUsernameUsedError: false}}
        case CHECK_USERNAME_USED_ERROR:
            return {...state, ui: {...state.ui, checkUsernameUsedPending: false, checkUsernameUsedError: true}}
        case LOGIN_REQUEST:
            return {...state, ui: {...state.ui, loginPending: true}}
        case LOGIN_RESPONSE:
        case LOGIN_ERROR:
            return {...state, ui: {...state.ui, loginPending: false}}
        case GET_USER_INFO_RESPONSE:
            return {...state, userInfo: action.res}
        case GET_USER_INFO_FROM_TOKEN_RESPONSE:
            return {...state, allUsersInfo: {...state.allUsersInfo, [action.token]: action.res}}
        default:
            return state
    }
}

export default sessionReducer;
