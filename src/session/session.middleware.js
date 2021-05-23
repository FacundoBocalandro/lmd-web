const sessionMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        default:
            break;
    }
}

export default sessionMiddleware;
