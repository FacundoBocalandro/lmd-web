import React, {useState} from "react";
import "./VaccinesTable.css";
import Modal from 'react-modal';
import {isValidDate} from "../../../utils/dates";
import toast, {Toaster} from 'react-hot-toast';
import {USER_ROLES} from "../../../constants/roles";
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {CheckCircle, CheckCircleOutline} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const VaccinesTable = ({
                           allVaccines,
                           userVaccines,
                           selectedRowId,
                           setSelectedRowId,
                           submitNewVaccination,
                           userRole,
                           updateVaccination,
                           deleteVaccination
                       }) => {

    const [modalInfo, setModalInfo] = useState({open: false})
    const [deleteDosageModal, setDeleteDosageModal] = useState({open: false});

    const appliedDosagesIds = userVaccines.filter(vaccinationInfo => vaccinationInfo.hasBeenApplied).map(vaccinationInfo => vaccinationInfo.dosageDto.id);

    const canApplyDose = (dosageId, vaccineDosages, dosageIndex) => {
        return userRole === USER_ROLES.DOCTOR && !hasBeenApplied(dosageId) && (dosageIndex === 0 || hasBeenApplied(vaccineDosages[dosageIndex - 1].id));
    }

    const isDoctor = () => {
        return userRole === USER_ROLES.DOCTOR
    }

    const hasBeenApplied = (id) => {
        return appliedDosagesIds.includes(id);
    }

    const openModal = (dosageId, vaccine, dosageIndex) => {
        if (hasBeenApplied(dosageId)) {
            const vaccinationInfo = userVaccines.filter(vaccinationInfo => vaccinationInfo.hasBeenApplied).find(vaccinationInfo => vaccinationInfo.dosageDto.id === dosageId);
            setModalInfo({
                open: true,
                vaccinationInfo: {...vaccinationInfo, appliedDate: new Date(vaccinationInfo.appliedDate)},
                vaccineName: vaccine.name,
                dosageNumber: dosageIndex + 1,
                hasBeenApplied: true
            })
        } else if (canApplyDose(dosageId, vaccine.dosages, dosageIndex)) {
            setModalInfo({
                open: true,
                vaccinationInfo: {dosageId, appliedDate: new Date()},
                vaccineName: vaccine.name,
                dosageNumber: dosageIndex + 1
            })
        }
    }

    const closeModal = () => {
        setModalInfo({open: false})
    }

    const changeAppliedDate = (value) => {
        setModalInfo({...modalInfo, vaccinationInfo: {...modalInfo.vaccinationInfo, appliedDate: value}})
    }

    const successCallback = () => {
        toast.success("Vacunación registrada exitosamente")
    }

    const successUpdateCallback = () => {
        toast.success("Vacunación modificada exitosamente")
    }

    const successDeleteCallback = () => {
        toast.success("Vacunación eliminada exitosamente")
    }

    const errorCallback = () => {
        toast.error("Hubo un error en la operación")
    }

    const saveVaccinationInfo = () => {
        if (isValidDate(modalInfo.vaccinationInfo.appliedDate)) {
            submitNewVaccination(modalInfo.vaccinationInfo, successCallback, errorCallback)
            closeModal();
        }
    }

    const updateVaccineDate = () => {
        if (isValidDate(modalInfo.vaccinationInfo.appliedDate)) {
            updateVaccination(modalInfo.vaccinationInfo.id, {
                appliedDate: modalInfo.vaccinationInfo.appliedDate,
                doctorId: modalInfo.vaccinationInfo.responsibleDoctor.id
            }, successUpdateCallback, errorCallback)
            closeModal();
        }
    }

    const deleteVaccineApplication = () => {
        deleteVaccination(modalInfo.vaccinationInfo.id, successDeleteCallback, errorCallback)
        closeDeleteModal();
    }

    const openDeleteModal = () => {
        setModalInfo({...modalInfo, open: false})
        setDeleteDosageModal({open: true});
    }

    const closeDeleteModal = () => {
        closeModal();
        setDeleteDosageModal({open: false});
    }

    return userVaccines ? (
        <div className={"vaccines-table"}>
            <Toaster/>
            {deleteDosageModal.open && <Modal isOpen={true} onRequestClose={closeDeleteModal} style={{
                overlay: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, content: {width: 'fit-content', height: 'fit-content', inset: 'auto'}
            }}>
                <div>
                    <div
                        className={"delete-dosage-modal-text"}>¿Está seguro que desea eliminar la
                        dosis {modalInfo.dosageNumber} <br/> de la vacuna {modalInfo.vaccineName}?
                    </div>
                    <div className={"delete-dosage-modal-buttons-container"}>
                        <Button
                            variant="contained"
                            onClick={closeDeleteModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={deleteVaccineApplication}
                        >
                            Eliminar
                        </Button>
                    </div>
                </div>
            </Modal>}
            {modalInfo.open && <Modal isOpen={true} onRequestClose={closeModal} style={{
                overlay: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }, content: {width: 'fit-content', height: 'fit-content', inset: 'auto'}
            }}>
                <div className={"new-vaccination-modal"}>
                    <div className={"new-vaccination-modal-title"}>Vacuna: {modalInfo.vaccineName}</div>
                    <div className={"new-vaccination-modal-subtitle"}>Dosis {modalInfo.dosageNumber}</div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label="Fecha de vacunación"
                            format="dd/MM/yyyy"
                            value={modalInfo.vaccinationInfo.appliedDate}
                            onChange={changeAppliedDate}
                            disabled={modalInfo.hasBeenApplied && !isDoctor()}
                            fullWidth
                            required
                            invalidDateMessage={"Fecha inválida"}
                            maxDate={new Date()}
                        />
                    </MuiPickersUtilsProvider>
                    {modalInfo.hasBeenApplied && <span className={"new-vaccination-modal-subtitle container-data"}>Pediatra responsable: {modalInfo.vaccinationInfo.responsibleDoctor.firstName} {modalInfo.vaccinationInfo.responsibleDoctor.lastName}</span>}
                    <div className={"new-vaccination-button-container"}>
                        {isDoctor() && (
                            <>
                                {modalInfo.hasBeenApplied && <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={openDeleteModal}
                                >
                                    Eliminar
                                </Button>}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={modalInfo.hasBeenApplied ? updateVaccineDate : saveVaccinationInfo}
                                >
                                    Guardar
                                </Button>
                            </>)
                        }
                    </div>
                </div>
            </Modal>}
            <Table className={"vaccines-table"}>
                <TableHead>
                    <TableRow>
                        <TableCell align={"left"} className={"vaccines-table-name-cell"}><span
                            className={"vaccines-table-header-text"}>Nombre</span></TableCell>
                        <TableCell align={"left"} className={"vaccines-table-dosage-cell"}><span
                            className={"vaccines-table-header-text"}>Dosis</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allVaccines.map(vaccine => (
                        <TableRow className={`vaccines-table-row${vaccine.id === selectedRowId ? ' selected-row' : ''}`}
                                  onClick={() => setSelectedRowId(vaccine.id)}>
                            <TableCell
                                className={"vaccines-table-cell vaccines-table-name-cell"}>{vaccine.name}</TableCell>
                            <TableCell className={"vaccines-table-cell vaccines-table-dosage-cell"}>
                                {vaccine.dosages.map((dosage, index) => (
                                    <IconButton component="span" size={"small"} onClick={e => {
                                        openModal(dosage.id, vaccine, index);
                                        e.stopPropagation();
                                    }} className={hasBeenApplied(dosage.id) ? 'checked-icon' : 'unchecked-icon'}>
                                        {hasBeenApplied(dosage.id) ? <CheckCircle/> : <CheckCircleOutline/>}
                                    </IconButton>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    ) : null;
}

export default VaccinesTable
