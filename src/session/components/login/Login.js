import React, {useState} from "react";
import "./Login.css";
import {useHistory} from "react-router";
import toast, { Toaster } from 'react-hot-toast';

const initialForm = {
    username: "",
    password: ""
}

const Login = ({login, loginPending}) => {
    const history = useHistory();

    const [form, setForm] = useState({...initialForm});

    const successCallback = (token) => {
        window.localStorage.setItem('token', token)
        history.push("/main/home");
    }

    const errorCallback = () => {
        setForm({...initialForm});
        toast.error("¡Credenciales incorrectas!");
    }

    const submitForm = () => {
        if (!isDisabled()) {
            login(form, successCallback, errorCallback)
        }
    }

    const isDisabled = () => {
        return !form.password || !form.username || loginPending
    }

    return (
        <div className={"login-screen"}>
            <Toaster/>
            <div className={"login-header-container"}>
                <span className={"header"}>Iniciar sesión</span>
            </div>
            <div className={"login-screen-body"}>
                <div className={"login-form"}>
                    <div className={"login-input-container"}>
                        <span className={"input-label"}>Nombre de usuario</span>
                        <input type="text" value={form.username}
                               className={"input"}
                               onKeyUp={(event) => {
                                   if (event.key === "Enter") {
                                       submitForm();
                                   }
                               }}
                               onChange={e => setForm({...form, username: e.target.value})}
                               placeholder={"Nombre de usuario"}/>
                    </div>
                    <div className={"login-input-container"}>
                        <span className={"input-label"}>Contraseña</span>
                        <input type="password" value={form.password}
                               className={"input"}
                               onKeyUp={(event) => {
                                   if (event.key === "Enter") {
                                       submitForm();
                                   }
                               }}
                               onChange={e => setForm({...form, password: e.target.value})} placeholder={"Contraseña"}/>
                    </div>
                </div>
                <div className={"login-button-container"}>
                    <button onClick={submitForm} className={`submit-button ${isDisabled() ? 'disabled' : ''}`}
                            disabled={isDisabled()}>Iniciar sesión
                    </button>
                    <span onClick={() => history.push('/register')}>¿Aún no tiene un usuario?</span>
                </div>
            </div>
        </div>
    )
}

export default Login;
