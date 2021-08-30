import React, {useState} from 'react';
import "./Register.css"
import {useHistory} from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import NumberInput from "../../../common/components/inputs/NumberInput";
import {GENDERS} from "../../../constants/PersonalData";
import DateInput from "../../../common/components/inputs/DateInput";
import {dateIsValid} from "../../../utils/dates";

const Register = ({
                      registerUser,
                      checkUsernameUsed,
                      checkUsernameUsedPending,
                      checkUsernameUsedError,
                      registerPending
                  }) => {

    const history = useHistory();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: null,
        dni: "",
        birthDate: "",
        email: "",
        matriculationCode: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        dni: false,
        birthDate: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        gender: false
    })

    const setField = (fieldName, value) => {
        if (errors[fieldName]) {
            setErrors({...errors, [fieldName]: false})
        }
        setForm({...form, [fieldName]: value})
    }

    const validateFirstName = (values) => {
        return !!values.firstName
    }

    const validateLastName = (values) => {
        return !!values.lastName
    }

    const validateGender = (values) => {
        return [GENDERS.MALE, GENDERS.FEMALE].includes(values.gender)
    }

    const validateDni = (values) => {
        return !!values.dni && `${Number.parseInt(values.dni)}` === values.dni
    }

    const validateBirthDate = (values) => {
        return dateIsValid(values.birthDate)
    }

    const validateEmail = (values) => {
        // eslint-disable-next-line no-control-regex
        return !!values.email && (new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"))
            .test(values.email)
    }

    const validateUsername = (values) => {
        return !!values.username && !errors.username
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
        gender: validateGender,
        dni: validateDni,
        birthDate: validateBirthDate,
        email: validateEmail,
        username: validateUsername,
        password: validatePassword,
        confirmPassword: validateConfirmPassword,
    };

    const submitForm = () => {
        let newErrors = {...errors};
        Object.entries(rules).forEach(([field, isValid]) => {
            newErrors = {...newErrors, [field]: !isValid(form)}
        })

        if (!Object.values(newErrors).some(error => error)) {
            const dateParts = form.birthDate.split("/");
            registerUser({
                    ...form,
                    birthDate: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0, 10)
                },
                successCallback,
                errorCallback)
        } else {
            setErrors(newErrors)
        }
    }

    const errorCallback = () => {
        toast.error("Error registrando el usuario");
    }

    const successCallback = () => {
        toast.success("¡Felicitaciones! Inicia sesión para usar la aplicación");
        history.push('/');
    }

    const isDisabled = () => {
        return checkUsernameUsedPending || checkUsernameUsedError || registerPending
    }

    const cancelForm = () => {
        history.push('/')
    }

    const changeGender = (gender) => {
        if (errors.gender) {
            setErrors({...errors, gender: false})
        }
        if (form.gender === gender) setForm({...form, gender: null})
        else setForm({...form, gender})
    }

    return (
        <div className={"register-screen"}>
            <Toaster/>
            <div className={"register-header-container"}>
                <span className={"header"}>Registro de Paciente</span>
            </div>
            <div className={"register-form"}>
                <div className={"register-input-container"}>
                    <input placeholder={"Nombre"}
                           className={errors.firstName ? 'input input-error' : ' input'}
                           value={form.firstName}
                           onChange={event => setField('firstName', event.target.value)}/>
                    <span className={errors.firstName ? 'error-message' : 'error-message no-message'}> Error en el nombre</span>
                </div>
                <div className={"register-input-container"}>
                    <input placeholder={"Apellido"}
                           className={errors.lastName ? 'input input-error' : ' input'}
                           value={form.lastName}
                           onChange={event => setField('lastName', event.target.value)}/>
                    <span className={errors.lastName ? 'error-message' : 'error-message no-message'}> Error en el apellido</span>
                </div>
                <div className={"register-input-container"}>
                    <div className={`register-gender-container${errors.gender ? ' input-error' : ''}`}>
                        <div className={"register-gender-label"}>Sexo</div>
                        <div className={"register-gender-options"}>
                            <div className={"gender-checkbox-container"}>
                                <span>Masculino</span>
                                <input type="checkbox" checked={form.gender === GENDERS.MALE}
                                       onClick={() => changeGender(GENDERS.MALE)}/>
                            </div>
                            <div className={"gender-checkbox-container"}>
                                <span>Femenino</span>
                                <input type="checkbox" checked={form.gender === GENDERS.FEMALE}
                                       onClick={() => changeGender(GENDERS.FEMALE)}/>
                            </div>
                        </div>
                    </div>
                    <span className={errors.gender ? 'error-message' : 'error-message no-message'}>Debe seleccionar el sexo</span>
                </div>
                <div className={"register-input-container"}>
                    <NumberInput value={form.dni}
                                 placeholder={"DNI (Sin puntos)"}
                                 className={errors.dni ? 'input input-error' : ' input'}
                                 onChange={value => setField('dni', value)}/>
                    <span className={errors.dni ? 'error-message' : 'error-message no-message'}>Error en el DNI</span>
                </div>
                <div className={"register-input-container"}>
                    <DateInput placeholder={"Fecha de nacimiento"}
                               className={errors.birthDate ? 'input input-error' : ' input'}
                               date={form.birthDate}
                               onChange={value => setField('birthDate', value)}/>
                    <span className={errors.birthDate ? 'error-message' : 'error-message no-message'}>Error en la fecha de nacimiento</span>

                </div>
                <div className={"register-input-container"}>
                    <input placeholder={"Email"}
                           type={"email"}
                           className={errors.email ? 'input input-error' : ' input'}
                           value={form.email}
                           onChange={event => setField('email', event.target.value)}/>
                    <span
                        className={errors.email ? 'error-message' : 'error-message no-message'}>Error en el email</span>

                </div>
                <div className={"register-input-container"}>
                    <input placeholder={"Nombre de Usuario"}
                           className={errors.username ? 'input input-error' : ' input'}
                           value={form.username}
                           onChange={event => setField('username', event.target.value)}
                           onBlur={(e) => {
                               if (!!e.target.value) {
                                   checkUsernameUsed(form.username, response => {
                                       setErrors({...errors, username: !response})
                                   }, () => setErrors({...errors, username: true}));
                               }
                           }}
                    />
                    <span className={errors.username ? 'error-message' : 'error-message no-message'}>El usuario ya existe</span>
                </div>
                <div className={"register-input-container"}>
                    <input placeholder={"Matrícula (Sólo pediatras)"}
                           type={"matriculationCode"}
                           className={"input"}
                           value={form.matriculationCode}
                           onChange={event => setField('matriculationCode', event.target.value)}/>
                </div>
                <div className={"register-input-container"}>
                    <input placeholder={"Contraseña"}
                           type={"password"}
                           className={errors.password ? 'input input-error' : ' input'}
                           value={form.password}
                           onChange={event => setField('password', event.target.value)}/>
                    <span className={errors.password ? 'error-message' : 'error-message no-message'}>
                        La contraseña tiene que tener mínimo 8 caracteres, una mayúscula, un número y un signo </span>

                </div>
                <div className={"register-input-container"}>
                    <input placeholder={"Repita contraseña"}
                           type={"password"}
                           className={errors.confirmPassword ? 'input input-error' : ' input'}
                           value={form.confirmPassword}
                           onKeyUp={(event) => {
                               if (event.key === "Enter") {
                                   submitForm();
                               }
                           }}
                           onChange={event => setField('confirmPassword', event.target.value)}/>
                    <span className={errors.confirmPassword ? 'error-message' : 'error-message no-message'}> Las
                        contraseñas no coiniciden</span>
                </div>
            </div>
            <div className={"register-buttons"}>
                <button className={"cancel-button"} onClick={cancelForm}>
                    Cancelar
                </button>
                <button onClick={submitForm} className={`submit-button ${isDisabled() ? 'disabled' : ''}`}
                        disabled={isDisabled()}>
                    Registrarse
                </button>
            </div>
        </div>
    )
}

export default Register
