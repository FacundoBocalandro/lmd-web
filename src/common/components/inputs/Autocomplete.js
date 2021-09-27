import React from 'react';

const Autocomplete = ({value, onChange, placeholder, label, disabled, error, options = []}) => {

    return (
        <div className={"input-container"}>
            {label && <span className={"input-label"}>{label}</span>}
            <input type="text" list="autocomplete-options"
                   placeholder={placeholder}
                   value={value}
                   className={`input${error ? ' input-error' : ''}`}
                   disabled={disabled}
                   onChange={(e) => onChange(e.target.value)}/>

                <datalist id="autocomplete-options">
                    {options.map(option => <option>{option}</option>)}
                </datalist>
        </div>
    )
}

export default Autocomplete