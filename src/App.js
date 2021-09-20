import React from 'react';
import {Switch, Route, Redirect} from 'react-router'
import LoginScreen from "./session/containers/LoginScreen";
import Register from "./session/containers/Register";
import PrivateRoute from "./security/PrivateRoute";
import Home from "./home/containers/Home";
import AppFrame from "./common/components/app-frame/AppFrame";
import Vaccines from "./vaccines/containers/Vaccines";
import ReversePrivateRoute from "./security/ReversePrivateRoute";
import Notes from "./notes/containers/Notes";
import Readings from "./readings/containers/Readings";
import {connect} from "react-redux";
import {USER_ROLES} from "./constants/roles";
import DoctorsScreen from "./relationships/containers/RelationshipsScreen";

function App({userRole}) {
    return (
        <Switch>
            <ReversePrivateRoute exact path={'/'} component={LoginScreen}/>
            <Route path={'/registro'} component={Register}/>
            <PrivateRoute path='/inicio' component={({match: {url}}) => ([
                <AppFrame key={'app-frame'}>
                    <Switch style={{width: '100%', height: '100%'}}>
                        <PrivateRoute exact path={`${url}`} component={Home}/>
                        <PrivateRoute path={`${url}/vacunas`} component={Vaccines}/>
                        {userRole === USER_ROLES.DOCTOR && <PrivateRoute exact path={`${url}/pacientes`} component={DoctorsScreen}/>}
                        {userRole === USER_ROLES.PATIENT && <>
                            <PrivateRoute exact path={`${url}/lecturas`} component={Readings}/>
                            <PrivateRoute exact path={`${url}/notas`} component={Notes}/>
                            <PrivateRoute exact path={`${url}/pediatras`} component={DoctorsScreen}/>
                        </>}
                    </Switch>
                </AppFrame>
            ])}/>
            <Redirect to={'/'}/>
        </Switch>
    );

}

const mapStateToProps = state => ({
    userRole: state.session.userInfo?.userRole
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App);
