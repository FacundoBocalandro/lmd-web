import React, {useEffect} from 'react';
import {connect} from "react-redux";
import "./AppFrame.css";
import actions from "../../../actions";
import Navbar from "../../../navbar/containers/Navbar";

const AppFrame = ({userInfo, getUserInfo, children}) => {
    useEffect(() => {
        if (!userInfo) getUserInfo();

        // eslint-disable-next-line
    }, [])

    return (
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
    getUserInfo: () => dispatch(actions.session.getUserInfo.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);
