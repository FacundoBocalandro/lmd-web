import React, {useEffect, useState} from "react";
import "./VaccinesScreen.css";
import VaccinesTable from "../containers/VaccinesTable";
import VaccineDetails from "../containers/VaccineDetails";
import {USER_ROLES} from "../../constants/roles";
import {getSelectedPatient} from "../../utils/tokens";
import NoPatientScreen from "../../common/components/no-patient/NoPatientScreen";

const VaccinesScreen = ({getAllVaccines, getUserVaccines, allVaccines, userVaccines, userRole}) => {
    const [selectedRowId, setSelectedRowId] = useState(null);

    useEffect(() => {
        if (!allVaccines) getAllVaccines();

        getUserVaccines();

        // eslint-disable-next-line
    }, [])

    /**
     * If page should be rendered or not:
     * In case it's a doctor, a patient should be selected
     * In case it's a patient, info should've been fetched
     * @returns {boolean}
     */
    const shouldRender = () => {
        return ((userRole === USER_ROLES.DOCTOR && getSelectedPatient()) || (userRole === USER_ROLES.PATIENT)) && userVaccines && allVaccines
    }

    return shouldRender() ? (
        <div className={"vaccines-screen"}>
            <div className={"vaccines-screen-left-panel"}>
                <VaccinesTable setSelectedRowId={setSelectedRowId}
                               selectedRowId={selectedRowId}/>
            </div>
            <div className={"vaccines-screen-right-panel"}>
                <VaccineDetails selectedRowId={selectedRowId}/>
            </div>
        </div>
    ) : (userRole === USER_ROLES.DOCTOR ? <NoPatientScreen/> : null)
}

export default VaccinesScreen
