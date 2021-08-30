import React, {useEffect} from 'react';
import {connect} from "react-redux";
import "./AppFrame.css";
import actions from "../../../actions";
import Navbar from "../../../navbar/containers/Navbar";
import {USER_ROLES} from "../../../constants/roles";
import InProcessScreen from "../in-process/InProcessScreen";
import {removeCurrentToken} from "../../../utils/tokens";
import {useHistory} from "react-router";

const AppFrame = ({userInfo, getUserInfo, children, logout}) => {
    const history = useHistory();

    useEffect(() => {
        if (!userInfo) getUserInfo();

        // eslint-disable-next-line
    }, [])

    const logoutAction = () => {
        logout();
        removeCurrentToken();
        history.replace('/');
    }

    return userInfo && userInfo.userRole === USER_ROLES.DOCTOR ? <InProcessScreen logout={logoutAction}/> : (
        <div className={"app-frame"}>
            <Navbar/>
            <div className={"content"}>
                {userInfo ? children : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userInfo: state.session.userInfo
})

const mapDispatchToProps = dispatch => ({
    getUserInfo: () => dispatch(actions.session.getUserInfo.request()),
    logout: () => dispatch(actions.session.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);
