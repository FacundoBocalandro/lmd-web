import React from 'react';
import {connect} from "react-redux";
import Navbar from "../../../navbar/components/Navbar";
import "./AppFrame.css";

const AppFrame = ({children}) => {
    return (
        <div className={"app-frame"}>
            <Navbar/>
            <div className={"content"}>
                {children}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);
