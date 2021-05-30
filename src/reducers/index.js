import {combineReducers} from "redux";
import sessionReducer from "../session/session.reducer";
import {LOGOUT} from "../session/session.actions";

const appReducer = combineReducers({
    session: sessionReducer,
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
