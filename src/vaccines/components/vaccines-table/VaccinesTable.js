import React from "react";
import "./VaccinesTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const VaccinesTable = ({allVaccines, userVaccines, selectedRowId, setSelectedRowId}) => {

    const appliedVaccineIds = userVaccines.filter(vaccineData => vaccineData.hasBeenApplied).map(vaccineData => vaccineData.vaccineDto.id);

    const hasBeenApplied = (id) => {
        return appliedVaccineIds.includes(id);
    }

    return userVaccines ? (
        <div className={"vaccines-table"}>
            <div className={"vaccines-table-row vaccines-table-header"}>
                <div className={"vaccines-table-cell"}>Nombre</div>
                <div className={"vaccines-table-cell align-center"}>Aplicada</div>
            </div>
            <div className={"vaccines-table-body"}>
                {allVaccines.map(vaccine => (
                    <div className={`vaccines-table-row${vaccine.id === selectedRowId ? ' selected-row' : ''}`} onClick={() => setSelectedRowId(vaccine.id)}>
                        <div className={"vaccines-table-cell"}>{vaccine.name}</div>
                        <div className={"vaccines-table-cell align-center"}>{<FontAwesomeIcon icon={faCheckCircle}
                                                                                              className={hasBeenApplied(vaccine.id) ? 'checked-icon' : 'unchecked-icon'}/>}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
}

export default VaccinesTable;
