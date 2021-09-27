import React from 'react';

const DateInput = ({date, onChange, placeholder, label, className}) => {

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input placeholder={placeholder}
                   value={date}
                   type={placeholder ? "text" : "date"}
                   onFocus={e => {
                       if (placeholder) e.target.type = 'date'
                   }}
                   onBlur={e => {
                       if (placeholder && !date) e.target.type = 'text'
                   }}
                   className={className ?? "input"}
                   onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default DateInput
