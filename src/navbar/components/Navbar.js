import {useHistory} from "react-router";
import './Navbar.css'
import {useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAvatar} from "../../utils/avatars";
import {GENDERS} from "../../constants/PersonalData";
import {getToken} from "../../utils/http";
import {clearSelectedUser, getAllStoredTokens, removeCurrentToken, setSelectedToken} from "../../utils/tokens";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {USER_ROLES} from "../../constants/roles";

const Navbar = ({logout, getUserInfoFromToken, allUsersInfo, userRole}) => {

    /**
     *  Fetch information of all logged in users.
     *  Used to display information on navbar "session" dropdown, where user can change the selected profile.
     */
    useEffect(() => {
        const tokens = getAllStoredTokens();
        tokens.forEach(token => {
            getUserInfoFromToken(token);
        })

        // eslint-disable-next-line
    }, [])

    const history = useHistory();
    const location = useLocation();

    const logoutAction = () => {
        logout();
        removeCurrentToken();
        history.replace('/');
    }

    const navbarOptions = userRole === USER_ROLES.DOCTOR ? [
            {path: '/inicio', label: "Inicio"},
            {path: '/inicio/vacunas', label: "Vacunas"},
            {path: '/inicio/pacientes', label: "Pacientes"},
        ] :
        [
            {path: '/inicio', label: 'Inicio'},
            {path: '/inicio/vacunas', label: "Vacunas"},
            {path: '/inicio/lecturas', label: 'Lecturas'},
            {path: '/inicio/notas', label: 'Notas'},
            {path: '/inicio/pediatras', label: 'Pediatras'},
        ]

    const addAccount = () => {
        logout();
        clearSelectedUser();
        history.push('/');
    }

    return (
        <div className={"navbar"}>
            <p className={"navbar-title"}>Libreta Médica</p>
            <div className={"navbar-list"}>
                {navbarOptions.map(option => <p
                    className={`navbar-p  ${location.pathname === option.path ? 'current-location' : ''}`}
                    onClick={() => history.push(option.path)}>{option.label}</p>)}
                <div className={`navbar-p session-dropdown`}>
                    <div className={"session-dropdown-text"}>
                        <span>Sesión</span>
                        <FontAwesomeIcon icon={faAngleDown}/>
                    </div>
                    <div className={"session-dropdown-content"}>
                        {allUsersInfo &&
                        <div className={"navbar-users-container"}>
                            {Object.entries(allUsersInfo)
                                .sort((a, b) => a[1].firstName - b[1].firstName) // a and b are arrays containing [token, info]. sort them by info.firstName
                                .map(([token, info]) => (
                                    <UserRow info={info} token={token}
                                             setSelectedToken={(token) => setSelectedToken(token, logout)}/>))}
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

    return (
        <div className={`user-info-row${token === getToken() ? ' selected' : ''}`}
             onClick={() => setSelectedToken(token)}>
            <div className={`user-row-avatar-container ${gender}`}>
                <FontAwesomeIcon icon={getAvatar(info.avatar)} className={`user-row-avatar ${gender}`}/>
            </div>
            <span>{info.firstName} {info.lastName}</span>
        </div>
    )
}

export default Navbar;
