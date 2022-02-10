import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router";
import {getAllStoredTokens, saveNewToken, setSelectedToken} from "../../../utils/tokens";
import toast, {Toaster} from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.hospitalaustral.edu.ar/wp-content/uploads/2014/10/HospitalAustral.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initialForm = {
    username: "",
    password: ""
}

const Login = ({login, logout, loginPending, allUsersInfo, getUserInfoFromToken}) => {
    const classes = useStyles();
    const history = useHistory();

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

    const [form, setForm] = useState({...initialForm});

    const successCallback = (token) => {
        //check if inputted user is already logged in
        let alreadyLoggedInToken;
        if (allUsersInfo) {
            Object.entries(allUsersInfo).forEach(([token, info]) => {
                if (info.username === form.username) alreadyLoggedInToken = token;
            })
        }

        if (alreadyLoggedInToken) {
            setSelectedToken(alreadyLoggedInToken, logout);
        } else {
            saveNewToken(token);
        }
        history.push("/inicio");
    }

    const errorCallback = () => {
        toast.error("¡Credenciales incorrectas!");
    }

    const submitForm = () => {
        if (!isDisabled()) login(form, successCallback, errorCallback)
    }

    const isDisabled = () => {
        return !form.password || !form.username || loginPending
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Toaster/>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nombre de usuario"
                            autoFocus
                            autoComplete={"username"}
                            onKeyUp={(event) => {
                                if (event.key === "Enter") {
                                    submitForm();
                                }
                            }}
                            onChange={e => setForm({...form, username: e.target.value})}
                            value={form.username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            onKeyUp={(event) => {
                                if (event.key === "Enter") {
                                    submitForm();
                                }
                            }}
                            onChange={e => setForm({...form, password: e.target.value})}
                            value={form.password}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submitForm}
                            disabled={isDisabled()}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item>
                                <span className={"already-have-account-text"} onClick={() => history.push("/registro")}>{"¿No tiene una cuenta? Registrarse"}</span>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Login;