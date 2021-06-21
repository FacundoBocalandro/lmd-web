import {useHistory} from "react-router";
import './Navbar.css'
import {useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAvatar} from "../../utils/avatars";
import {GENDERS} from "../../constants/PersonalData";
import {getToken} from "../../utils/http";

const Navbar = ({logout, getUserInfoFromToken, allUsersInfo}) => {

    useEffect(() => {
        const tokens = Object.keys(window.localStorage).filter(key => key.startsWith('token-'));
        tokens.forEach(key => {
            getUserInfoFromToken(window.localStorage.getItem(key));
        })

        // eslint-disable-next-line
    }, [])

    const history = useHistory();
    const location = useLocation();

    const logoutAction = () => {
        logout();

        //rearrange tokens to be in order
        const selectedUser = window.localStorage.getItem('selected-user');
        const tokens = Object.keys(window.localStorage).filter(key => key.startsWith('token-'));
        let lastToken = selectedUser;
        //get last token, which will be moved to the localstorage key where the removed token was.
        tokens.forEach(tokenString => {
            const tokenNumber = tokenString.split('-')[1]
            if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
        })

        window.localStorage.removeItem(`token-${selectedUser}`);
        if (lastToken !== selectedUser) {
            window.localStorage.setItem(`token-${selectedUser}`, window.localStorage.getItem(`token-${lastToken}`))
            window.localStorage.removeItem(`token-${lastToken}`)
        }

        window.localStorage.removeItem('selected-user');

        history.replace('/');
    }

    const historyPath = () => {
        return location.pathname;
    }

    const pathIsHome = () => {
        return historyPath() === "/inicio";
    }

    const pathIsReadings = () => {
        return historyPath() === "/readings";
    }

    const pathIsImmunizations = () => {
        return historyPath() === "/inicio/vacunas";
    }

    const addAccount = () => {
        logout();
        history.push('/');
    }

    const setSelectedToken = (token) => {
        const tokens = Object.keys(window.localStorage).filter(key => key.startsWith('token-'));
        tokens.forEach(tokenKey => {
            if (window.localStorage.getItem(tokenKey) === token) {
                const tokenNumber = tokenKey.split('-')[1];
                if (tokenNumber !== window.localStorage.getItem('selected-user')) {
                    logout();
                    window.localStorage.setItem('selected-user', tokenNumber)
                    window.location.reload()
                }
            }
        })
    }

    return (
        <div className={"navbar"}>
            <p className={"navbar-title"}>Libreta Médica</p>
            <div className={"navbar-list"}>
                <p className={`navbar-p  ${pathIsHome() ? 'current-location' : ''}`}
                   onClick={() => history.push('/inicio')}>Inicio</p>
                <p className={`navbar-p  ${pathIsReadings() ? 'current-location' : ''}`}>Lecturas</p>
                <p className={`navbar-p  ${pathIsImmunizations() ? 'current-location' : ''}`}
                   onClick={() => history.push('/inicio/vacunas')}>Vacunas</p>
                <div className={`navbar-p session-dropdown`}>
                    <span className={"session-dropdown-text"}>Sesión</span>
                    <div className={"session-dropdown-content"}>
                        {allUsersInfo &&
                        <div className={"navbar-users-container"}>
                            {Object.entries(allUsersInfo).map(([token, info]) => (
                                <UserRow info={info} token={token} setSelectedToken={setSelectedToken}/>))}
                        </div>
                        }
                        <span onClick={addAccount}>Agregar cuenta</span>
                        <span onClick={logoutAction}>Cerrar sesión</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UserRow = ({info, token, setSelectedToken}) => {
    const gender = info.gender === GENDERS.MALE ? 'male' : 'female'

    return(
        <div className={`user-info-row${token === getToken() ? ' selected' : ''}`} onClick={() => setSelectedToken(token)}>
            <div className={`user-row-avatar-container ${gender}`}>
                <FontAwesomeIcon icon={getAvatar(info.avatar)} className={`user-row-avatar ${gender}`}/>
            </div>
            <span>{info.firstName} {info.lastName}</span>
        </div>
    )
}

export default Navbar;
