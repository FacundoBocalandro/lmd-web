import React from 'react';

const TextInput = ({value, onChange, placeholder, label}) => {

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input placeholder={placeholder}
                   value={value}
                   className={"input"}
                   onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default TextInput
