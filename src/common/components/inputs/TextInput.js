import React from 'react';

const TextInput = ({value, onChange, placeholder, label, disabled}) => {

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input placeholder={placeholder}
                   value={value}
                   className={"input"}
                   disabled={disabled}
                   onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default TextInput
