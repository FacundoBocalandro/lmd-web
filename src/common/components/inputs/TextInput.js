import React from 'react';

const TextInput = ({value, onChange, placeholder, label, disabled, error}) => {

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input placeholder={placeholder}
                   value={value}
                   className={`input${error ? ' input-error' : ''}`}
                   disabled={disabled}
                   onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default TextInput
