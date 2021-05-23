import {combineReducers} from "redux";
import sessionReducer from "../session/session.reducer";

const appReducer = combineReducers({
    session: sessionReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
