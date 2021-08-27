import React from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {Switch, Route, Redirect} from 'react-router'
import LoginScreen from "./session/containers/LoginScreen";
import Register from "./session/containers/Register";
import PrivateRoute from "./security/PrivateRoute";
import Home from "./home/containers/Home";
import AppFrame from "./common/components/app-frame/AppFrame";
import Vaccines from "./vaccines/containers/Vaccines";
import ReversePrivateRoute from "./security/ReversePrivateRoute";
import Notes from "./notes/containers/Notes";

function App() {
    return (
        <Router>
            <Switch>
                <ReversePrivateRoute exact path={'/'} component={LoginScreen}/>
                <Route path={'/registro'} component={Register}/>
                <PrivateRoute path='/inicio' component={({match: {url}}) => ([
                    <AppFrame key={'app-frame'}>
                        <Switch style={{width: '100%', height: '100%'}}>
                            <PrivateRoute exact path={`${url}`} component={Home}/>
                            <PrivateRoute path={`${url}/vacunas`} component={Vaccines}/>
                            <PrivateRoute exact path={`${url}/notas`} component={Notes}/>
                        </Switch>
                    </AppFrame>
                ])}/>
                <Redirect to={'/'}/>
            </Switch>
        </Router>
    );

}

export default App;
