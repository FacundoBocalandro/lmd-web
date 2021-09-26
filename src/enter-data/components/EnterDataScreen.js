import React, {useState} from 'react';
import "./EnterDataScreen.css";
import NumberInput from "../../common/components/inputs/NumberInput";
import TextInput from "../../common/components/inputs/TextInput";
import toast, { Toaster } from 'react-hot-toast';
import DateInput from "../../common/components/inputs/DateInput";
import {dateIsValid, getAge, getDateObject} from "../../utils/dates";
import {USER_ROLES} from "../../constants/roles";
import {getSelectedPatient} from "../../utils/tokens";

const EnterDataScreen = ({userInfo, userRole, relationships, createNewWeightRecord, createNewPerimeterRecord, createNewHeightRecord}) => {
    const [timeRecorded, setTimeRecorded] = useState("");
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
        if (dateIsValid(timeRecorded)) {
            const timeRecordedFormatted = getDateObject(timeRecorded);
            if (!!weight) createNewWeightRecord(weight, timeRecordedFormatted, () => successCallback('peso'), () => errorCallback('peso'));
            if (!!perimeter) createNewPerimeterRecord(perimeter, timeRecordedFormatted, () => successCallback('perímetro cefálico'), () => errorCallback('perímetro cefálico'));
            if (!!height) createNewHeightRecord(height, timeRecordedFormatted, () => successCallback('estatura'), () => errorCallback('estatura'));
        } else {
            setDateError(true);
        }
    }

    return (
        <div className={"enter-data-screen"}>
            <Toaster/>
            <div className={"enter-data-date-and-age"}>
                <DateInput date={timeRecorded}
                           onChange={(value) => {
                               if (dateError) setDateError(false);
                               setTimeRecorded(value);
                           }}
                           className={dateError ? 'input input-error' : ' input'}
                           label={"Fecha de registro"}/>
                <TextInput disabled={true} label={"Edad"} value={dateIsValid(timeRecorded) ? getAge(birthDate, timeRecorded) : ''}/>
            </div>
            <div className={"enter-data-values"}>
                <NumberInput onChange={setWeight} value={weight} label={"Peso"} min={0}
                             adornment={"kg"}/>
                <NumberInput onChange={setHeight} value={height} label={"Estatura"} min={0}
                             adornment={"cm"}/>
                <NumberInput onChange={setPerimeter} value={perimeter} label={"Perímetro Cefálico"} min={0} adornment={"cm"}/>
            </div>
            <div className={"enter-data-button-container"}>
                <button className={`submit-button`} onClick={onSubmit}>Guardar</button>
            </div>
        </div>
    )
}

export default EnterDataScreen;
