import React from "react";
import "./VaccineDetails.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyringe} from "@fortawesome/free-solid-svg-icons";

const VaccineDetails = ({selectedRowId}) => {
    return selectedRowId ? <div/> :
        (<div className={"no-vaccine-selected-screen"}>
            <div className={"no-vaccine-selected-text-container"}>
                <div className={"syringe-icon-container"}>
                    <FontAwesomeIcon icon={faSyringe} className={"syringe-icon"}/>
                </div>
                <span>Elija una vacuna para<br/> ver su información</span>
            </div>
        </div>)
}

export default VaccineDetails;
