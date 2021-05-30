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
import AppFrame from "./common/components/app-frame/AppFrame";

function App() {
    return (
        <Router>
            <Switch>
                <ReversePrivateRoute exact path={'/'} component={LoginScreen}/>
                <Route path={'/register'} component={Register}/>
                {/*<PrivateRoute path={'/home'} component={Home}/>*/}
                <Route path='/main' component={({match: {url}}) => ([
                    <AppFrame key={'app-frame'}>
                        <Switch style={{width: '100%', height: '100%'}}>
                            <Route path={`${url}/home`} component={Home}/>
                        </Switch>
                    </AppFrame>
                ])}/>
            </Switch>
        </Router>
    );

}

export default App;
