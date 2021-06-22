import React, {useEffect, useState} from "react";
import "./VaccineDetails.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyringe} from "@fortawesome/free-solid-svg-icons";

const VaccineDetails = ({selectedRowId, getVaccineDetails, vaccineDetails}) => {
    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {
        if (selectedRowId) getVaccineDetails(selectedRowId);

        // eslint-disable-next-line
    }, [selectedRowId])

    return vaccineDetails ? <div className={"vaccine-details-screen"}>
            <div className={"vaccine-details-content"}>
                <div className={"vaccine-details-title"}>{vaccineDetails.vaccineName}</div>
                <div className={"vaccine-details-body"}>
                    {selectedTab === 1 && <p>{vaccineDetails.description}</p>}
                    {selectedTab === 2 && <p>{vaccineDetails.sideEffects}</p>}
                </div>
            </div>
            <div className={"home-screen-tabs-container"}>
                <div className={`home-screen-tab${selectedTab === 1 ? ' selected' : ''}`}
                     onClick={() => setSelectedTab(1)}>Descripción
                </div>
                <div className={`home-screen-tab${selectedTab === 2 ? ' selected' : ''}`}
                     onClick={() => setSelectedTab(2)}>Efectos Secundarios
                </div>
            </div>
        </div> :
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
