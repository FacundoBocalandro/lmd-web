import {combineReducers} from "redux";
import sessionReducer from "../session/session.reducer";
import {LOGOUT} from "../session/session.actions";
import homeReducer from "../home/home.reducer";

const appReducer = combineReducers({
    session: sessionReducer,
    home: homeReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
