import React, {useState} from 'react';
import "./EnterDataScreen.css";
import MonthInput from "../../common/components/inputs/MonthInput";
import NumberInput from "../../common/components/inputs/NumberInput";

const EnterDataScreen = () => {
    const [date, setDate] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [perimeter, setPerimeter] = useState("");

    return (
        <div className={"enter-data-screen"}>
            <div className={"enter-data-date-and-age"}>
                <MonthInput onChange={setDate} date={date} label={"Fecha de registro"}/>
                <NumberInput onChange={setAge} value={age} label={"Edad"} min={0} max={19}/>
            </div>
            <div className={"enter-data-values"}>
                <NumberInput onChange={setWeight} value={weight} label={"Peso"} min={0} acceptDecimals
                             adornment={"kg"}/>
                <NumberInput onChange={setHeight} value={height} label={"Estatura"} min={0} acceptDecimals
                             adornment={"cm"}/>
                <NumberInput onChange={setPerimeter} value={perimeter} label={"Perímetro Cefálico"} min={0}
                             acceptDecimals adornment={"cm"}/>
            </div>
            <div className={"enter-data-button-container"}>
                <button className={`submit-button`}>Guardar</button>
            </div>
        </div>
    )
}

export default EnterDataScreen;
