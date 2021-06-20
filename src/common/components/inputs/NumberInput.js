import React from 'react';
import {numbersAndDecimalsOnly, numbersOnly} from "../../../utils/numbers";

const NumberInput = ({value, onChange, className, placeholder, label, max, min, acceptDecimals, adornment}) => {

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <div className={"input-box"}>
                <input placeholder={placeholder}
                       value={value}
                       className={className ?? "input"}
                       onChange={(e) => {
                           const numbers = acceptDecimals ? numbersAndDecimalsOnly(e.target.value) : numbersOnly(e.target.value);
                           if (numbers === "" || ((!min || parseInt(e.target.value) >= min) && (!max || parseInt(e.target.value) <= max))) onChange(numbers)
                       }}/>
                {adornment && <span className={"input-adornment"}>{adornment}</span>}
            </div>
        </div>
    )
}

export default NumberInput
