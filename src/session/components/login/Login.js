import React, {useEffect, useState} from "react";
import "./Login.css";
import {useHistory} from "react-router";
import toast, {Toaster} from 'react-hot-toast';
import {getAllStoredTokens, saveNewToken, setSelectedToken} from "../../../utils/tokens";
import {Card} from "@material-ui/core";

const initialForm = {
  username: "",
  password: ""
}

const Login = ({login, logout, loginPending, allUsersInfo, getUserInfoFromToken}) => {

  /**
   * Get all logged in users information.
   * In case the user inputted is already logged in, replace token
   */
  useEffect(() => {
    const tokens = getAllStoredTokens();
    tokens.forEach(token => {
      getUserInfoFromToken(token);
    })

    // eslint-disable-next-line
  }, [])

  const history = useHistory();

  const [form, setForm] = useState({...initialForm});

  const successCallback = (token) => {
    saveNewToken(token);
    history.push("/inicio");
  }

  const errorCallback = () => {
    toast.error("¡Credenciales incorrectas!");
  }

  const submitForm = () => {
    if (!isDisabled()) {
      //check if inputted user is already logged in
      let alreadyLoggedInToken;
      if (allUsersInfo) {
        Object.entries(allUsersInfo).forEach(([token, info]) => {
          if (info.username === form.username) alreadyLoggedInToken = token;
        })
      }

      if (alreadyLoggedInToken) {
        setSelectedToken(alreadyLoggedInToken, logout);
        history.push('/inicio');
      } else login(form, successCallback, errorCallback)
    }
  }

  const isDisabled = () => {
    return !form.password || !form.username || loginPending
  }

  return (
    <div className={"login-screen"}>
      <Toaster/>
      <div className={"login-header-container"}>

      </div>
      <Card variant="outlined" className={"login-screen-body"}>
        <span className={"header"} style={{textAlign:'center'}}>Iniciar sesión</span>
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
          <div className={"register-button-container"}>
            <span onClick={() => history.push('/registro')} className={"register-text"}>¿Aún no tiene un usuario?</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Login;
