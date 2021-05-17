import React from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {Switch, Route} from 'react-router'

import './App.css';
import Register from "./component/Register";

function App() {
    return (
        <Router>
            <Switch>
                <Route path={'/'} component={Register}/>
            </Switch>
        </Router>
    );

}

export default App;
