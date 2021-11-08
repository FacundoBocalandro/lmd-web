import React, {useState} from 'react';
import "./EnterDataScreen.css";
import toast, {Toaster} from 'react-hot-toast';
import {getAge, isValidDate} from "../../utils/dates";
import {USER_ROLES} from "../../constants/roles";
import {getSelectedPatient} from "../../utils/tokens";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button, Grid, InputAdornment, TextField} from "@material-ui/core";

const EnterDataScreen = ({
                             userInfo,
                             userRole,
                             relationships,
                             createNewWeightRecord,
                             createNewPerimeterRecord,
                             createNewHeightRecord
                         }) => {
    const [timeRecorded, setTimeRecorded] = useState(new Date());
    const [dateError, setDateError] = useState(false);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [perimeter, setPerimeter] = useState("");

    /**
     * If user is patient, use his/her birth date
     * If user is doctor, use selected patients birth date
     */
    const birthDate = userRole === USER_ROLES.PATIENT ? userInfo.birthDate : relationships.find(user => user.id === getSelectedPatient())?.birthDate;

    const errorCallback = (dataType) => {
        toast.error(`Error creando registro de ${dataType}`);
    }

    const successCallback = (dataType) => {
        toast.success(`Registro de ${dataType} exitoso`);
    }

    const onSubmit = () => {
        if (isValidDate(timeRecorded)) {
            if (!!weight) createNewWeightRecord(weight, timeRecorded, () => successCallback('peso'), () => errorCallback('peso'));
            if (!!perimeter) createNewPerimeterRecord(perimeter, timeRecorded, () => successCallback('perímetro cefálico'), () => errorCallback('perímetro cefálico'));
            if (!!height) createNewHeightRecord(height, timeRecorded, () => successCallback('estatura'), () => errorCallback('estatura'));
        } else {
            setDateError(true);
        }
    }

    return (
        <div className={"enter-data-screen"}>
            <Toaster/>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label="Fecha de registro"
                            format="dd/MM/yyyy"
                            value={timeRecorded}
                            onChange={date => {
                                if (dateError) setDateError(false);
                                setTimeRecorded(date);
                            }}
                            minDate={new Date(birthDate)}
                            fullWidth
                            required
                            invalidDateMessage={"Fecha inválida"}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={6}>
                    <TextField disabled={true} label={"Edad"} value={isValidDate(timeRecorded) ? getAge(birthDate, timeRecorded) : ""} fullWidth/>
                </Grid>
                <Grid item md={4}>
                    <TextField value={weight}
                               type={"number"}
                               label={"Peso"}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                               }}
                               onChange={event => setWeight(event.target.value)} fullWidth/>
                </Grid>
                <Grid item md={4}>
                    <TextField value={height}
                               type={"number"}
                               label={"Estatura"}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">cm</InputAdornment>
                               }}
                               onChange={event => setHeight(event.target.value)} fullWidth/>
                </Grid>
                <Grid item md={4}>
                    <TextField value={perimeter}
                               type={"number"}
                               label={"Perímetro Cefálico"}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">cm</InputAdornment>
                               }}
                               onChange={event => setPerimeter(event.target.value)} fullWidth/>
                </Grid>
            </Grid>
            <div className={"enter-data-button-container"}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    size={"large"}
                >
                    Guardar
                </Button>
            </div>
        </div>
    )
}

export default EnterDataScreen;
