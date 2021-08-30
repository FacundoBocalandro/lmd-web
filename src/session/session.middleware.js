import {
    CHECK_USERNAME_USED_REQUEST, GET_USER_INFO_FROM_TOKEN_REQUEST,
    GET_USER_INFO_REQUEST,
    LOGIN_REQUEST,
    REGISTER_USER_REQUEST
} from "./session.actions";
import {services} from "./session.services";
import actions from "../actions";

const sessionMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case REGISTER_USER_REQUEST:
            const registerAction = action.user.matriculationCode ? services.registerDoctor : services.registerPatient;

            registerAction(action.user)
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.session.registerUser.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback(err);
                    dispatch(actions.session.registerUser.error(err));
                })
            break;
        case CHECK_USERNAME_USED_REQUEST:
            services.checkUsernameUsed(action.username)
                .then(res => {
                    if (action.callback) action.callback(res)
                    dispatch(actions.session.checkUsernameUsed.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback(err);
                    dispatch(actions.session.checkUsernameUsed.error(err));
                })
            break;
        case LOGIN_REQUEST:
            services.login(action.form)
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.session.login.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback(err);
                    dispatch(actions.session.login.error(err));
                })
            break;
        case GET_USER_INFO_REQUEST:
            services.getUserInfo()
                .then(res => dispatch(actions.session.getUserInfo.response(res)))
                .catch(err => dispatch(actions.session.getUserInfo.error(err)));
            break;
        case GET_USER_INFO_FROM_TOKEN_REQUEST:
            services.getUserInfo(action.token)
                .then(res => dispatch(actions.session.getUserInfoFromToken.response(action.token, res)))
                .catch(err => dispatch(actions.session.getUserInfoFromToken.error(err)));
            break;
        default:
            break;
    }
}

export default sessionMiddleware;
