import {applyMiddleware, compose, createStore} from 'redux'
import appReducer from "./reducers";
import sessionMiddleware from "./session/session.middleware";
import homeMiddleware from "./home/home.middleware";
import vaccinesMiddleware from "./vaccines/vaccines.middleware";
import notesMiddleware from "./notes/notes.middleware";
import readingsMiddleware from "./readings/readings.middleware";
import relationshipsMiddleware from "./relationships/relationships.middleware";
import notificationsMiddleware from "./notifications/notifications.middleware";


const store = createStore(
    appReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
        homeMiddleware,
        vaccinesMiddleware,
        notesMiddleware,
        readingsMiddleware,
        relationshipsMiddleware,
        notificationsMiddleware
    ))
)

export default store;
