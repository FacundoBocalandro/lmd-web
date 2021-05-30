import React from 'react';
import {Redirect, Route} from "react-router";
import {isAuthenticated} from "../utils/http";

const ReversePrivateRoute = ({...props}) => {
    return isAuthenticated() ?
        <Redirect to={"/main/home"}/> :
        <Route {...props}/>
}

export default ReversePrivateRoute
