import React, {useState} from 'react';
import "./Register.css"
import * as axios from "../../http";
import {useHistory} from "react-router";

const Register = () => {

    const history = useHistory();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        birthDate: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        dni: false,
        birthDate: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false
    })

    const setField = (fieldName, value) => {
        if (errors[fieldName]) {
            setErrors({...errors, [fieldName]: false})
        }
        setForm({...form, [fieldName]: value.target.value})
    }

    const validateFirstName = (values) => {
        return !!values.firstName
    }

    const validateLastName = (values) => {
        return !!values.lastName
    }

    const validateDni = (values) => {
        return !!values.dni && `${Number.parseInt(values.dni)}` === values.dni
    }

    const validateBirthDate = (values) => {
        return !!values.birthDate && (new RegExp("^(?:31([/\\-.])(?:0?[13578]|1[02])\\1|(?:29|30)([/\\-.])(?:0?[13-9]|1[0-2])\\2)(?:1[6-9]|[2-9]\\d)?\\d{2}$|^29([/\\-.])0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\\d|2[0-8])([/\\-.])(?:0?[1-9]|1[0-2])\\4(?:1[6-9]|[2-9]\\d)?\\d{2}$"))
            .test(values.birthDate)
    }

    const validateEmail = (values) => {
        return !!values.email && (new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"))
            .test(values.email)
    }

    const validateUsername = (values) => {
        return !!values.username && !errors.username;
    }

    const checkUsername = async (value) => {
        await axios.get('users/available/' + value)
            .then(response => {
                setErrors({...errors, username: !response})
            })
            .catch(error => setErrors({...errors, username: true}))
    }

    const validatePassword = (values) => {
        return !!values.password && (new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
            .test(values.password)
    }

    const validateConfirmPassword = (values) => {
        return !!values.confirmPassword && values.confirmPassword === values.password
    }

    const rules = {
        firstName: validateFirstName,
        lastName: validateLastName,
        dni: validateDni,
        birthDate: validateBirthDate,
        email: validateEmail,
        username: validateUsername,
        password: validatePassword,
        confirmPassword: validateConfirmPassword
    };

    const submitForm = () => {
        let newErrors = {...errors};
        Object.entries(rules).forEach(([field, isValid]) => {
            newErrors = {...newErrors, [field]: !isValid(form)}
        })

        if (!Object.values(newErrors).some(error => error)) {
            const dateParts = form.birthDate.split("/");
            axios.post("users/register", {
                ...form,
                birthDate: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0, 10)
            })
                .then(response => {
                    history.push({pathname: '/home', state: {registerSuccess: true}})
                }).catch(errors => {
            })
        } else {
            setErrors(newErrors)
        }
    }

    const cancelForm = () => {
        setForm({
            ...form, firstName: "",
            lastName: "",
            dni: "",
            birthDate: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        })
    }

    return (
        <div className={"container"}>
            <div className={"headerContainer"}>
                <p className={"header"}>Registro de Paciente</p>
            </div>
            <div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"Nombre"}
                               className={errors.firstName ? 'inputError' : 'input'}
                               value={form.firstName}
                               onChange={event => setField('firstName', event)}/>
                        <span className={errors.firstName ? 'errorMessage' : 'noMessage'}> Error en el nombre</span>
                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"Apellido"}
                               className={errors.lastName ? 'inputError' : 'input'}
                               value={form.lastName}
                               onChange={text => setField('lastName', text)}/>
                        <span className={errors.lastName ? 'errorMessage' : 'noMessage'}> Error en el apellido</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"DNI (Sin puntos)"}
                               className={errors.dni ? 'inputError' : 'input'}
                               type={"number"}
                               value={form.dni}
                               onChange={text => setField('dni', text)}/>
                        <span className={errors.dni ? 'errorMessage' : 'noMessage'}>Error en el DNI</span>

                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"DD/MM/AA"}
                               className={errors.birthDate ? 'inputError' : 'input'}
                               value={form.birthDate}
                               onChange={text => setField('birthDate', text)}/>
                        <span className={errors.birthDate ? 'errorMessage' : 'noMessage'}>Error en la fecha de nacimiento</span>

                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"Email"}
                               type={"emailAddress"}
                               className={errors.email ? 'inputError' : 'input'}
                               value={form.email}
                               onChange={text => setField('email', text)}/>
                        <span className={errors.email ? 'errorMessage' : 'noMessage'}>Error en el email</span>

                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"Nombre de Usuario"}
                               className={errors.username ? 'inputError' : 'input'}
                               value={form.username}
                               onChange={text => setField('username', text)}
                               onBlur={() => checkUsername(form.username)}
                        />
                        <span className={errors.username ? 'errorMessage' : 'noMessage'}>El usuario ya existe</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"Contraseña"}
                               type={"password"}
                               className={errors.password ? 'inputError' : 'input'}
                               value={form.password}
                               onChange={text => setField('password', text)}/>
                        <p className={errors.password ? 'errorMessage' : 'noMessage'}>
                            La contraseña tiene que tener mínimo 8 caracteres,
                            <br/> una mayúscula un número y un signo </p>

                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"Repita contraseña"}
                               type={"password"}
                               className={errors.confirmPassword ? 'inputError' : 'input'}
                               value={form.confirmPassword}
                               onChange={text => setField('confirmPassword', text)}/>
                        <p className={errors.confirmPassword ? 'errorMessage' : 'noMessage'}> Las contraseñas no coiniciden</p>

                    </div>
                </div>
                <div className={"buttonContainer"}>
                    <button className={"cancelButton"} onClick={cancelForm}>
                        <p className={"cancelButtonText"}>Cancelar</p>
                    </button>
                    <button onClick={submitForm} className={"submitButton"}>
                        <p className={"submitButtonText"}>Registrarse</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;
