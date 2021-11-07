import React, {useEffect, useState} from "react";
import "./VaccinesScreen.css";
import VaccinesTable from "../containers/VaccinesTable";
import VaccineDetails from "../containers/VaccineDetails";
import {USER_ROLES} from "../../constants/roles";
import {getSelectedPatient} from "../../utils/tokens";
import NoPatientScreen from "../../common/components/no-patient/NoPatientScreen";
import {
    Button, FormControlLabel,
    IconButton, Radio, RadioGroup,
    Step,
    StepLabel,
    Stepper,
    Table, TableBody, TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import {jsPDF} from "jspdf";
import VaccineApplications from "../containers/VaccineApplications";
import AddIcon from '@material-ui/icons/Add';
import Modal from "react-modal";
import {MODAL_STYLE} from "../../constants/modal";
import {Delete} from "@material-ui/icons";

const VaccinesScreen = ({getAllVaccines, getUserVaccines, allVaccines, userVaccines, userRole, exportVaccines, createNewVaccine}) => {
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [addVaccineModalOpen, setAddVaccineModalOpen] = useState(false);

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
            {addVaccineModalOpen && <AddVaccineModal setAddVaccineModalOpen={setAddVaccineModalOpen} createNewVaccine={createNewVaccine}/>}
            <div className={"vaccines-screen-left-panel"}>
                <VaccinesTable setSelectedRowId={setSelectedRowId}
                               selectedRowId={selectedRowId}/>
                {userRole === USER_ROLES.DOCTOR &&
                <IconButton aria-label="agregar vacuna" component="span" className={"add-vaccine-button"}
                            onClick={() => setAddVaccineModalOpen(true)}>
                    <AddIcon/>
                </IconButton>}
            </div>
            <div className={"vaccines-screen-right-panel"}>
                <div className={"export-div"}>
                    <Button
                        variant="contained"
                        startIcon={<GetAppIcon/>}
                        className={"export-vaccines-button"}
                        onClick={() => exportVaccines(exportCallback)}
                    >
                        Exportar vacunas
                    </Button>
                </div>
                {userRole === USER_ROLES.DOCTOR ? <VaccineApplications selectedRowId={selectedRowId}/> :
                    <VaccineDetails selectedRowId={selectedRowId}/>}
            </div>
        </div>
    ) : (userRole === USER_ROLES.DOCTOR ? <NoPatientScreen/> : null)
}

const NEW_VACCINE_INFO = {
    name: "",
    description: "",
    dosages: [
        {
            month: 0,
            reinforcement: false
        }
    ],
    sideEffects: ""
}

const NAME_AND_DESCRIPTION_STEP = 0;
const SIDE_EFFECTS_STEP = 1;
const DOSAGES_STEP = 2;

const steps = ["Nombre y descripción", "Efectos secundarios", "Dosis"];

const AddVaccineModal = ({setAddVaccineModalOpen, createNewVaccine}) => {
    const [newVaccine, setNewVaccine] = useState({...NEW_VACCINE_INFO})
    const [activeStep, setActiveStep] = React.useState(3);

    const handleReset = () => {
        setActiveStep(0);
        setNewVaccine({...NEW_VACCINE_INFO})
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            createNewVaccine(newVaccine, () => setActiveStep((prevActiveStep => prevActiveStep + 1)));
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const isNextDisabled = () => {
        switch (activeStep) {
            case NAME_AND_DESCRIPTION_STEP:
                return !newVaccine.name
            case DOSAGES_STEP:
                return !newVaccine.dosages.length
            default:
                return false;
        }
    }


    return (
        <Modal isOpen={true} onRequestClose={() => setAddVaccineModalOpen(false)} style={MODAL_STYLE}>
            <div className={"add-vaccine-modal"}>
                <div className={"add-vaccine-title"}>Agregar vacuna</div>
                <Stepper activeStep={activeStep}>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className={"add-vaccine-modal-body"}>
                    {activeStep === steps.length ? (
                        <div>
                            <div className={"add-vaccine-success-message"}>
                                Vacuna agregada exitosamente
                            </div>
                            <Button onClick={handleReset} color={"primary"} variant={"contained"}>
                                Nueva vacuna
                            </Button>
                        </div>
                    ) : (
                        <div className={"add-vaccine-modal-step-content"}>
                            {activeStep === NAME_AND_DESCRIPTION_STEP && <div>
                                <TextField value={newVaccine.name}
                                           onChange={e => setNewVaccine({...newVaccine, name: e.target.value})}
                                           label={"Nombre"}
                                           required
                                           fullWidth/>
                                <TextField
                                    label="Descripción"
                                    multiline
                                    rows={10}
                                    value={newVaccine.description}
                                    variant="outlined"
                                    className={"add-vaccine-description"}
                                    onChange={(event) => setNewVaccine({
                                        ...newVaccine,
                                        description: event.target.value
                                    })}
                                    fullWidth
                                />
                            </div>}
                            {activeStep === SIDE_EFFECTS_STEP && <TextField
                                label="Efectos secundarios"
                                multiline
                                rows={10}
                                value={newVaccine.sideEffects}
                                variant="outlined"
                                onChange={(event) => setNewVaccine({...newVaccine, sideEffects: event.target.value})}
                                fullWidth
                            />}
                            {activeStep === DOSAGES_STEP &&
                            <div><Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={"left"}>N°</TableCell>
                                        <TableCell align={"left"}>Mes</TableCell>
                                        <TableCell align={"left"}>Refuerzo</TableCell>
                                        <TableCell align={"left"}/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newVaccine.dosages.map((dosage, index) => {
                                        const editDosage = (field, newValue) => {
                                            const newDosages = newVaccine.dosages.map((d, i) => {
                                                if (i === index) return {...dosage, [field]: newValue}
                                                return d
                                            })
                                            setNewVaccine({...newVaccine, dosages: newDosages})
                                        }

                                        const deleteDosage = () => {
                                            const newDosages = newVaccine.dosages.filter((d, i) => i !== index)
                                            setNewVaccine({...newVaccine, dosages: newDosages})
                                        }

                                        return (
                                            <TableRow key={index}>
                                                <TableCell align={"left"}>{index + 1}</TableCell>
                                                <TableCell align={"left"}>
                                                    <TextField value={dosage.month}
                                                               onChange={e => editDosage("month", e.target.value)}
                                                               type={"number"}/>
                                                </TableCell>
                                                <TableCell align={"left"}>
                                                    <RadioGroup row value={dosage.reinforcement}
                                                                onChange={(e, value) => editDosage("reinforcement", value === 'true')}>
                                                        <FormControlLabel
                                                            value={true}
                                                            control={<Radio color="primary"/>}
                                                            label="Sí"
                                                            labelPlacement="start"
                                                        />
                                                        <FormControlLabel
                                                            value={false}
                                                            control={<Radio color="primary"/>}
                                                            label="No"
                                                            labelPlacement="start"
                                                        />
                                                    </RadioGroup>
                                                </TableCell>
                                                <TableCell align={"left"}>
                                                    <IconButton aria-label="borrar dosis" component="span"
                                                                className={"delete-dosage-button"}
                                                                onClick={deleteDosage}>
                                                        <Delete/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                                <Button
                                    className={"add-dosage-button"}
                                    color={"primary"}
                                    variant={"contained"}
                                    onClick={() => setNewVaccine({
                                        ...newVaccine,
                                        dosages: [...newVaccine.dosages, {month: 0, reinforcement: false}]
                                    })}>Agregar dosis</Button>
                            </div>}
                            <div className={"add-vaccine-modal-buttons"}>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    Anterior
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    disabled={isNextDisabled()}
                                >
                                    {activeStep === steps.length - 1 ? 'Crear' : 'Siguiente'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default VaccinesScreen
