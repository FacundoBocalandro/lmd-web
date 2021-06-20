import {useHistory} from "react-router";
import './Navbar.css'
import {useLocation} from "react-router-dom";

const Navbar = ({logout}) => {
    const history = useHistory();
    const location = useLocation();

    const logoutAction =() => {
        logout();
        window.localStorage.removeItem('token');
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


    return (
        <div  className={"navbar"}>
            <p className={"navbar-title"}>Libreta Médica</p>
            <div className={"navbar-list"}>
                <p className={ `navbar-p  ${pathIsHome() ? 'current-location' : ''}`} onClick={() => history.push('/inicio')}>Inicio</p>
                <p className={`navbar-p  ${pathIsReadings() ? 'current-location' : ''}`}>Lecturas</p>
                <p className={`navbar-p  ${pathIsImmunizations() ? 'current-location' : ''}`} onClick={() => history.push('/inicio/vacunas')}>Vacunas</p>
                <p className={"navbar-p logout"} onClick={logoutAction}>Cerrar Sesión</p>
            </div>
        </div>
    )
}

export default Navbar;
