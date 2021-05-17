import React, {useState} from 'react';
import "./Register.css"

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        dni: "",
        birthDate: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        name: false,
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
        // value.preventDefault();
        setForm({...form, [fieldName]: value.target.value})
    }

    const validateName = (values) => {
        return !!values.name
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
        //TODO call api to check username
        return !!values.username
    }

    const validatePassword = (values) => {
        //TODO password rules
        return !!values.password
    }

    const validateConfirmPassword = (values) => {
        return !!values.confirmPassword && values.confirmPassword === values.password
    }

    const rules = {
        name: validateName,
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
            //TODO submit form
        } else {
            setErrors(newErrors)
        }
    }

    const cancelForm = () => {
        setForm({...form, name: "",
            lastName: "",
            dni: "",
            birthDate: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""})
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
                               className={errors.name ? 'inputError' : 'input'}
                            /*{errors.name ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               value={form.name}
                               onChange={event => setField('name', event)}/>
                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"Apellido"}
                               className={errors.lastName ? 'inputError' : 'input'}
                            /*{errors.lastName ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               value={form.lastName}
                               onChange={text => setField('lastName', text)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"DNI (Sin puntos)"}
                               className={errors.dni ? 'inputError' : 'input'}
                            /*{errors.dni ? {...styles.input, ...styles.errorInput} : styles.input}*/
                                type={"number"}
                               value={form.dni}
                               onChange={text => setField('dni', text)}/>
                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"DD/MM/AA"}
                            /*{errors.birthDate ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               className={errors.birthDate ? 'inputError' : 'input'}
                               value={form.birthDate}
                               onChange={text => setField('birthDate', text)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"Email"}
                               type={"emailAddress"}
                               className={errors.email ? 'inputError' : 'input'}
                            /*{errors.email ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               value={form.email}
                               onChange={text => setField('email', text)}/>
                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"Nombre de Usuario"}
                               className={errors.username ? 'inputError' : 'input'}
                            /*{errors.username ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               value={form.username}
                               onChange={text => setField('username', text)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputContainer"}>
                        <input placeholder={"Contraseña"}
                               type={"password"}
                               className={errors.password ? 'inputError' : 'input'}
                            /*{errors.password ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               value={form.password}
                               onChange={text => setField('password', text)}/>
                    </div>
                    <div className={"inputContainer"}>
                        <input placeholder={"Contraseña"}
                               type={"password"}
                               className={errors.confirmPassword ? 'inputError' : 'input'}
                            /*errors.confirmPassword ? {...styles.input, ...styles.errorInput} : styles.input}*/
                               value={form.confirmPassword}
                               onChange={text => setField('confirmPassword', text)}/>
                    </div>
                </div>
                <div className={"buttonContainer"}>
                    <button className={"cancelButton"} onClick={cancelForm} >
                        <p className={"cancelButtonText"}>Cancelar</p>
                    </button>
                    <button onClick={submitForm} className={"submitButton"} >
                        <p className={"submitButtonText"}>Registrarse</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;
