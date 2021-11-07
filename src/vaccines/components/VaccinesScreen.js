import React, {useEffect, useState} from "react";
import "./VaccinesScreen.css";
import VaccinesTable from "../containers/VaccinesTable";
import VaccineDetails from "../containers/VaccineDetails";
import {USER_ROLES} from "../../constants/roles";
import {getSelectedPatient} from "../../utils/tokens";
import NoPatientScreen from "../../common/components/no-patient/NoPatientScreen";
import {Button} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import {jsPDF} from "jspdf";

const VaccinesScreen = ({getAllVaccines, getUserVaccines, allVaccines, userVaccines, userRole, exportVaccines}) => {
    const [selectedRowId, setSelectedRowId] = useState(null);

    useEffect(() => {
        if (!allVaccines) getAllVaccines();

        getUserVaccines();

        // eslint-disable-next-line
    }, [])

    const exportCallback = (body) => {
        const doc = new jsPDF()
        doc.text(body, 10, 10)
        doc.save('vacunas.pdf');
    }

    const copyToClipboardtCallback = (body) => {
        navigator.clipboard.writeText(body)
    }

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
                <div className={"export-div"}>
                    <Button
                        variant="contained"
                        startIcon={<GetAppIcon />}
                        className={"export-vaccines-button"}
                        onClick={() => exportVaccines(exportCallback)}
                    >
                        Imprimir libreta
                    </Button>
                    <div className="divider"/>
                    {(userRole === USER_ROLES.DOCTOR && getSelectedPatient()) && <Button
                        variant="contained"
                        startIcon={<GetAppIcon />}
                        className={"export-vaccines-button"}
                        onClick={() => exportVaccines(copyToClipboardtCallback)}
                    >
                        Exportar inmunizaciones
                    </Button> }
                </div>
                <VaccineDetails selectedRowId={selectedRowId}/>
            </div>
        </div>
    ) : (userRole === USER_ROLES.DOCTOR ? <NoPatientScreen/> : null)
}

export default VaccinesScreen
