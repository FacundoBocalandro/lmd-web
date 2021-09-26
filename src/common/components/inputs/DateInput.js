import React from 'react';
import {numbersOnly} from "../../../utils/numbers";

const dateSeparator = '/'

const DateInput = ({date, onChange, placeholder = "DD/MM/YYYY", label, className, disabled}) => {

    const dateFormat = (value) => {
        const temp = numbersOnly(value)
        switch (temp.length) {
            case 0:
            case 1:
                return temp;
            case 2:
                return temp + dateSeparator;
            case 3:
                return temp.substring(0, 2) +
                    dateSeparator +
                    temp.substring(2, 4);
            case 4:
                return temp.substring(0, 2) +
                    dateSeparator +
                    temp.substring(2, 4) + dateSeparator;
            case 6:
            case 7:
            case 8:
                return temp.substring(0, 2) +
                    dateSeparator +
                    temp.substring(2, 4) +
                    dateSeparator +
                    temp.substring(4, 8);
            default:
                return value.substring(0, 10);
        }
    }

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input placeholder={placeholder}
                   value={date}
                   disabled={disabled}
                   className={className ?? "input"}
                   onChange={(e) => onChange(dateFormat(e.target.value))}/>
        </div>
    )
}

export default DateInput
