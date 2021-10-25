import {combineReducers} from "redux";
import sessionReducer from "../session/session.reducer";
import {LOGOUT} from "../session/session.actions";
import homeReducer from "../home/home.reducer";
import vaccinesReducer from "../vaccines/vaccines.reducer";
import notesReducer from "../notes/notes.reducer";
import readingsReducer from "../readings/readings.reducer";
import relationshipsReducer from "../relationships/relationships.reducer";
import prebornReducer from "../preborn/preborn.reducer";

const appReducer = combineReducers({
    session: sessionReducer,
    home: homeReducer,
    vaccines: vaccinesReducer,
    notes: notesReducer,
    readings: readingsReducer,
    relationships: relationshipsReducer,
    preborn: prebornReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
