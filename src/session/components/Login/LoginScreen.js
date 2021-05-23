import React, {useState} from "react";
import "./LoginScreen.css";

const LoginScreen = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    return (
        <div className={"login-screen"}>
            <div className={"login-header"}>
                <span>Iniciar sesión</span>
            </div>
            <div className={"login-screen-body"}>
                <div className={"login-form"}>
                    <div className={"login-input-container"}>
                        <span className={"login-input-label"}>Nombre de usuario</span>
                        <input type="text" value={form.username}
                               onChange={e => setForm({...form, username: e.target.value})}
                               placeholder={"Nombre de usuario"}/>
                    </div>
                    <div className={"login-input-container"}>
                        <span className={"login-input-label"}>Contraseña</span>
                        <input type="password" value={form.password}
                               onChange={e => setForm({...form, password: e.target.value})} placeholder={"Contraseña"}/>
                    </div>
                </div>
                <div className={"login-button-container"}>
                    <button className={"login-button"}>Iniciar sesión</button>
                    <span>¿Aún no tiene un usuario?</span>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
