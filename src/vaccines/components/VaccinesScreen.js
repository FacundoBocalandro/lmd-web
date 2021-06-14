import React, {useEffect} from "react";
import "./VaccinesScreen.css";
import VaccinesTable from "../containers/VaccinesTable";

const VaccinesScreen = ({getAllVaccines, getUserVaccines, allVaccines}) => {
    useEffect(() => {
        if (!allVaccines) getAllVaccines();

        getUserVaccines();

        // eslint-disable-next-line
    }, [])

    return allVaccines ? (
        <div className={"vaccines-screen"}>
            <div className={"vaccines-screen-left-panel"}>
                <VaccinesTable/>
            </div>
        </div>
    ) : null
}

export default VaccinesScreen
