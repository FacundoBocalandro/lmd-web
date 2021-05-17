import React from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {Switch, Route} from 'react-router'

import './App.css';
import Register from "./component/register/Register";
import Home from "./component/homePage/HomePage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path={'/register'} component={Register}/>
                <Route path={'/home'} component={Home}/>
            </Switch>
        </Router>
    );

}

export default App;
