import React, {useState} from 'react';
import "./EnterDataScreen.css";
import NumberInput from "../../common/components/inputs/NumberInput";
import TextInput from "../../common/components/inputs/TextInput";
import toast, { Toaster } from 'react-hot-toast';

const EnterDataScreen = ({age, createNewWeightRecord, createNewPerimeterRecord, createNewHeightRecord}) => {
    const today = new Date();
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [perimeter, setPerimeter] = useState("");

    const errorCallback = (dataType) => {
        toast.error(`Error creando registro de ${dataType}`);
    }

    const successCallback = (dataType) => {
        toast.success(`Registro de ${dataType} exitoso`);
    }

    const onSubmit = () => {
        if (!!weight) createNewWeightRecord(weight, () => successCallback('peso'), () => errorCallback('peso'));
        if (!!perimeter) createNewPerimeterRecord(perimeter, () => successCallback('perímetro cefálico'), () => errorCallback('perímetro cefálico'));
        if (!!height) createNewHeightRecord(height, () => successCallback('estatura'), () => errorCallback('estatura'));
    }

    return (
        <div className={"enter-data-screen"}>
            <Toaster/>
            <div className={"enter-data-date-and-age"}>
                <TextInput value={`${today.getMonth()}/${today.getFullYear()}`} disabled={true} label={"Fecha de registro"}/>
                <TextInput value={age} disabled={true} label={"Edad"}/>
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
