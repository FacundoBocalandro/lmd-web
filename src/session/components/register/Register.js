import React, {useState} from 'react';
import "./Register.css"
import {useHistory} from "react-router";
import toast, {Toaster} from 'react-hot-toast';
import {GENDERS} from "../../../constants/PersonalData";
import {isValidDate} from "../../../utils/dates";
import {
    Avatar, Button, FormControlLabel,
    Grid,
    MenuItem, Switch,
    TextField
} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {numbersOnly} from "../../../utils/numbers";

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
        birthDate: new Date(),
        email: "",
        matriculationCode: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    const [isDoctor, setIsDoctor] = useState(false);

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
        return isValidDate(values.birthDate)
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
            registerUser(form,
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

    const redirectToLogin = () => {
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
                <Avatar className={"lock-icon"}>
                    <LockOutlined/>
                </Avatar>
                <span className={"register-header-text"}>Registro</span>
            </div>
            <div className={"register-form"}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField label={"Nombre"}
                                   required value={form.firstName}
                                   onChange={event => setField('firstName', event.target.value)}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.firstName}/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField label={"Apellido"}
                                   required value={form.lastName}
                                   onChange={event => setField('lastName', event.target.value)}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.lastName}/>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            value={form.gender}
                            onChange={event => changeGender(event.target.value)}
                            variant={"outlined"}
                            label={"Sexo"}
                            select
                            required
                            error={errors.gender}
                            fullWidth
                        >
                            <MenuItem value={GENDERS.MALE}>Masculino</MenuItem>
                            <MenuItem value={GENDERS.FEMALE}>Femenino</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Fecha de nacimiento"
                                format="dd/MM/yyyy"
                                value={form.birthDate}
                                onChange={date => setField('birthDate', date)}
                                fullWidth
                                required
                                invalidDateMessage={"Fecha inválida"}
                                maxDate={new Date()}
                                error={errors.birthDate}
                                inputVariant={"outlined"}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={6}>
                        <TextField label={"DNI"}
                                   required value={form.dni}
                                   onChange={event => setField('dni', numbersOnly(event.target.value))}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.dni}/>
                    </Grid>
                    <Grid item md={3} className={"matriculation-field-container"}>
                        <FormControlLabel
                            control={<Switch color="secondary" checked={isDoctor} onChange={event => {
                                setIsDoctor(!isDoctor);
                                setField('matriculationCode', "")
                            }}/>}
                            label="Soy pediatra"
                            labelPlacement="top"
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField label={"Matrícula"}
                                   required value={form.matriculationCode}
                                   onChange={event => setField('matriculationCode', event.target.value)}
                                   fullWidth
                                   variant={"outlined"} disabled={!isDoctor}/>
                    </Grid>
                    <Grid item md={12}>
                        <TextField label={"Email"}
                                   required value={form.email}
                                   onChange={event => setField('email', event.target.value)}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.email}/>
                    </Grid>
                    <Grid item md={12}>
                        <TextField label={"Nombre de usuario"}
                                   required value={form.username}
                                   onChange={event => setField('username', event.target.value)}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.username}
                                   onBlur={(e) => {
                                       if (!!e.target.value) {
                                           checkUsernameUsed(form.username, response => {
                                               setErrors({...errors, username: !response})
                                           }, () => setErrors({...errors, username: true}));
                                       }
                                   }}/>
                    </Grid>
                    <Grid item md={12}>
                        <TextField label={"Contraseña"}
                                   required value={form.password}
                                   onChange={event => setField('password', event.target.value)}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.password}
                                   type={"password"}
                                   helperText={errors.password ? "La contraseña tiene que tener mínimo 8 caracteres, una mayúscula, un número y un signo" : ""}/>
                    </Grid>
                    <Grid item md={12}>
                        <TextField label={"Repita contraseña"}
                                   required value={form.confirmPassword}
                                   onChange={event => setField('confirmPassword', event.target.value)}
                                   fullWidth
                                   variant={"outlined"}
                                   error={errors.confirmPassword}
                                   type={"password"}
                                   onKeyUp={(event) => {
                                       if (event.key === "Enter") {
                                           submitForm();
                                       }
                                   }}/>
                    </Grid>
                </Grid>
            </div>
            <Button onClick={submitForm}
                    disabled={isDisabled()}
                    variant={"contained"}
                    size={"large"}
                    color={"primary"} className={"register-button"}>Registrarse</Button>
            <span className={"already-have-account-text"}
                  onClick={redirectToLogin}>¿Ya tiene una cuenta? Loguearse</span>
        </div>
    )
}

export default Register
