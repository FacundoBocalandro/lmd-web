import React from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {Switch, Route} from 'react-router'
import Register from "./component/register/Register";
import Home from "./component/homePage/HomePage";
import LoginScreen from "./session/containers/LoginScreen";

function App() {
    return (
        <Router>
            <Switch>
                <Route path={'/'} component={LoginScreen}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/home'} component={Home}/>
            </Switch>
        </Router>
    );

}

export default App;
