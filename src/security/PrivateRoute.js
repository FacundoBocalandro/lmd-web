import React from 'react';
import {Redirect, Route} from "react-router";
import {isAuthenticated} from "../utils/http";

const PrivateRoute = ({...props}) => {
    return isAuthenticated() ?
        <Route {...props}/> :
        <Redirect to={"/"}/>
}

export default PrivateRoute
