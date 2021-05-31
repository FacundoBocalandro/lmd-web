import React from 'react';
import "./InProcessScreen.css"

const InProcessScreen = ({logout}) => {
    return(
        <div className={"in-progress-screen"}>
            <span className={"lmd-title"}>Libreta Médica Digital</span>
            <span className={"in-progress-text"}>En Proceso...</span>
            <button onClick={logout} className={`submit-button`}>Cerrar sesión</button>
        </div>
    )
}

export default InProcessScreen;
