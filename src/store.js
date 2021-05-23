import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from "./reducers";
import sessionMiddleware from "./session/session.middleware";


const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
    ))
)

export default store;
