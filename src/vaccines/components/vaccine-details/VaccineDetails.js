import React, {useEffect, useState} from "react";
import "./VaccineDetails.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyringe} from "@fortawesome/free-solid-svg-icons";
import {Tab, Tabs} from "@material-ui/core";

const VaccineDetails = ({selectedRowId, getVaccineDetails, vaccineDetails}) => {
    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {
        if (selectedRowId) getVaccineDetails(selectedRowId);

        // eslint-disable-next-line
    }, [selectedRowId])

    return vaccineDetails ? <div className={"vaccine-details-screen"}>
            <div className={"vaccine-details-content"}>
                <div className={"vaccine-details-title"}>{vaccineDetails.vaccineName}</div>
                <Tabs
                    value={selectedTab}
                    onChange={(e, value) => setSelectedTab(value)}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Descripción" value={1}/>
                    <Tab label="Efectos secundarios" value={2}/>
                </Tabs>
                <div className={"vaccine-details-body"}>
                    {selectedTab === 1 && <p>{vaccineDetails.description}</p>}
                    {selectedTab === 2 && <p>{vaccineDetails.sideEffects}</p>}
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
