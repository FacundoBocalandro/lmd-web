import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({value, onChange}) => {

    return (
        <div className={"search-input-container"}>
            <FontAwesomeIcon icon={faSearch} className={`search-input-icon${!value ? ' empty-search' : ''}`}/>
            <input value={value}
                   placeholder={"Buscar"}
                   className={"search-input"}
                   onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default SearchInput
