import React from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {Switch, Route} from 'react-router'
import LoginScreen from "./session/containers/LoginScreen";
import Register from "./session/containers/Register";
import PrivateRoute from "./security/PrivateRoute";
import ReversePrivateRoute from "./security/ReversePrivateRoute";
import Home from "./home/containers/Home";

function App() {
    return (
        <Router>
            <Switch>
                <ReversePrivateRoute exact path={'/'} component={LoginScreen}/>
                <Route path={'/register'} component={Register}/>
                <PrivateRoute path={'/home'} component={Home}/>
            </Switch>
        </Router>
    );

}

export default App;
