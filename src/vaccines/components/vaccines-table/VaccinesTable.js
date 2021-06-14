import React from "react";
import "./VaccinesTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const VaccinesTable = ({allVaccines, userVaccines}) => {
    return userVaccines ? (
        <div className={"vaccines-table"}>
            <div className={"vaccines-table-row vaccines-table-header"}>
                <div className={"vaccines-table-cell"}>Nombre</div>
                <div className={"vaccines-table-cell align-center"}>Especial</div>
                <div className={"vaccines-table-cell align-center"}>Aplicada</div>
                <div className={"vaccines-table-cell align-center"}/>
            </div>
            {allVaccines.map(vaccine => (
                <div className={"vaccines-table-row"}>
                    <div className={"vaccines-table-cell"}>{vaccine.name}</div>
                    <div className={"vaccines-table-cell align-center"}>{vaccine.special ? <FontAwesomeIcon icon={faCheckCircle} className={"vaccines-table-check"}/> : null}</div>
                    <div className={"vaccines-table-cell align-center"}>{}</div>
                    <div className={"vaccines-table-cell align-center"}>{}</div>
                </div>
            ))}
        </div>
    ) : null;
}

export default VaccinesTable;
