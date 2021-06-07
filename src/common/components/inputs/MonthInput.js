import React from 'react';
import {numbersOnly} from "../../../utils/numbers";

const dateSeparator = '/'

const MonthInput = ({date, onChange, placeholder = "MM/YYYY", label}) => {

    const dateFormat = (value) => {
        const temp = numbersOnly(value)
        switch (temp.length) {
            case 0:
            case 1:
                return temp;
            case 2:
                return temp + dateSeparator;
            case 3:
            case 4:
            case 5:
            case 6:
                return temp.substring(0, 2) +
                    dateSeparator +
                    temp.substring(2, 6);
            default:
                return value.substring(0, 7);
        }
    }

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input placeholder={placeholder}
                   value={date}
                   className={"input"}
                   onChange={(e) => onChange(dateFormat(e.target.value))}/>
        </div>
    )
}

export default MonthInput
