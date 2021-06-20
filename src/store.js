import {applyMiddleware, compose, createStore} from 'redux'
import appReducer from "./reducers";
import sessionMiddleware from "./session/session.middleware";
import homeMiddleware from "./home/home.middleware";
import vaccinesMiddleware from "./vaccines/vaccines.middleware";


const store = createStore(
    appReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
        homeMiddleware,
        vaccinesMiddleware
    ))
)

export default store;
