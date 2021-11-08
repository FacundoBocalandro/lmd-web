import React, {useEffect} from "react";
import "./VaccineApplications.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyringe} from "@fortawesome/free-solid-svg-icons";

const VaccineApplications = ({selectedRowId, vaccineApplications, getVaccineApplications}) => {
    useEffect(() => {
        if (selectedRowId) getVaccineApplications(selectedRowId);

        // eslint-disable-next-line
    }, [selectedRowId])

    return vaccineApplications ? (
        <div className={"vaccine-applications-screen"}>
            <span className={"vaccine-applications-body"}>{vaccineApplications.body}</span>
            {vaccineApplications.summary.length > 0 && <ul className={"vaccine-applications-summary"}>
                {vaccineApplications.summary.map(applicationSummary => <li>{applicationSummary}</li>)}
            </ul>}
        </div>
    ) : (<div className={"no-vaccine-selected-screen"}>
        <div className={"no-vaccine-selected-text-container"}>
            <div className={"syringe-icon-container"}>
                <FontAwesomeIcon icon={faSyringe} className={"syringe-icon"}/>
            </div>
            <span>Elija una vacuna para<br/> ver su información</span>
        </div>
    </div>)
}

export default VaccineApplications;