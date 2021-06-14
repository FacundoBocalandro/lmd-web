import React, {useEffect, useState} from "react";
import "./VaccinesScreen.css";
import VaccinesTable from "../containers/VaccinesTable";
import VaccineDetails from "../containers/VaccineDetails";

const VaccinesScreen = ({getAllVaccines, getUserVaccines, allVaccines, userVaccines}) => {
    const [selectedRowId, setSelectedRowId] = useState(null);

    useEffect(() => {
        if (!allVaccines) getAllVaccines();

        getUserVaccines();

        // eslint-disable-next-line
    }, [])

    return userVaccines && allVaccines ? (
        <div className={"vaccines-screen"}>
            <div className={"vaccines-screen-left-panel"}>
                <VaccinesTable setSelectedRowId={setSelectedRowId}
                               selectedRowId={selectedRowId}/>
            </div>
            <div className={"vaccines-screen-right-panel"}>
                <VaccineDetails selectedRowId={selectedRowId}/>
            </div>
        </div>
    ) : null
}

export default VaccinesScreen
