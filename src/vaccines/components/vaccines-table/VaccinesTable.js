import React, {useState} from "react";
import "./VaccinesTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import DateInput from "../../../common/components/inputs/DateInput";
import {dateIsValid, isOnOrBeforeToday} from "../../../utils/dates";
import toast, { Toaster } from 'react-hot-toast';
import {USER_ROLES} from "../../../constants/roles";
import {faCircle} from "@fortawesome/free-regular-svg-icons";

const VaccinesTable = ({allVaccines, userVaccines, selectedRowId, setSelectedRowId, submitNewVaccination, userRole, updateVaccination, deleteVaccination}) => {

    const [modalInfo, setModalInfo] = useState({open: false})
    const [appliedDateError, setAppliedDateError] = useState(false);
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
            setModalInfo({open: true, vaccinationInfo, vaccineName: vaccine.name, dosageNumber: dosageIndex + 1, hasBeenApplied: true})
        } else if (canApplyDose(dosageId, vaccine.dosages, dosageIndex)) {
            setModalInfo({open: true, vaccinationInfo: {dosageId}, vaccineName: vaccine.name, dosageNumber: dosageIndex + 1})
        }
    }

    const closeModal = () => {
        setModalInfo({open: false})
        setAppliedDateError(false)
    }

    const changeAppliedDate = (value) => {
        if (appliedDateError) setAppliedDateError(false)
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
        if (dateIsValid(modalInfo.vaccinationInfo.appliedDate) && isOnOrBeforeToday(modalInfo.vaccinationInfo.appliedDate)) {
            submitNewVaccination(modalInfo.vaccinationInfo, successCallback, errorCallback)
            closeModal();
        } else {
            setAppliedDateError(true)
        }
    }

    const updateVaccineDate = () => {
        if (dateIsValid(modalInfo.vaccinationInfo.appliedDate) && isOnOrBeforeToday(modalInfo.vaccinationInfo.appliedDate)) {
            updateVaccination(modalInfo.vaccinationInfo.id, {appliedDate: modalInfo.vaccinationInfo.appliedDate, doctorId: modalInfo.vaccinationInfo.responsibleDoctor.id}, successUpdateCallback(), errorCallback)
            closeModal();
        } else {
            setAppliedDateError(true)
        }
    }

    const deleteVaccineApplication = () => {
        deleteVaccination(modalInfo.vaccinationInfo.id, successDeleteCallback(), errorCallback)
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
                    <span className={"note-delete-text"}>¿Está seguro que desea eliminar la dosis {modalInfo.dosageNumber} de la vacuna {modalInfo.vaccineName}?</span>
                    <button className={'submit-button note-delete-button delete-button'} style={{margin: 'auto', marginTop: '10px'}} onClick={deleteVaccineApplication}>Eliminar</button>
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
                    <DateInput date={modalInfo.vaccinationInfo.appliedDate} onChange={changeAppliedDate}
                               disabled={modalInfo.hasBeenApplied && !isDoctor()}
                               className={appliedDateError ? 'input input-error' : 'input'}
                               label={"Fecha de vacunación"}/>
                    <div className={"new-vaccination-button-container"}>
                        {modalInfo.hasBeenApplied && <span className={"new-vaccination-modal-subtitle container-data"}>Pediatra responsable: {modalInfo.vaccinationInfo.responsibleDoctor.firstName} {modalInfo.vaccinationInfo.responsibleDoctor.lastName}</span>}
                        {isDoctor() && !modalInfo.hasBeenApplied &&
                        <button className={'submit-button container-data'} onClick={saveVaccinationInfo}>Guardar</button>}
                        {isDoctor() && modalInfo.hasBeenApplied &&
                        <button className={'submit-button container-data'} onClick={updateVaccineDate}>Guardar</button>}
                        {isDoctor() && modalInfo.hasBeenApplied &&
                        <button className={'delete-button submit-button container-data'} onClick={openDeleteModal}>Eliminar</button>}

                    </div>
                </div>
            </Modal>}
            <div className={"vaccines-table-row vaccines-table-header"}>
                <div className={"vaccines-table-cell"}>Nombre</div>
                <div className={"vaccines-table-cell"}>Dosis</div>
            </div>
            <div className={"vaccines-table-body"}>
                {allVaccines.map(vaccine => (
                    <div className={`vaccines-table-row${vaccine.id === selectedRowId ? ' selected-row' : ''}`}
                         onClick={() => setSelectedRowId(vaccine.id)}>
                        <div className={"vaccines-table-cell"}>{vaccine.name}</div>
                        <div className={"vaccines-table-cell"}>
                            {vaccine.dosages.map((dosage, index) => (
                                <FontAwesomeIcon icon={hasBeenApplied(dosage.id) ? faCheckCircle : faCircle} onClick={e => {
                                    openModal(dosage.id, vaccine, index);
                                    e.stopPropagation();
                                }} className={hasBeenApplied(dosage.id) ? 'checked-icon' : 'unchecked-icon'}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
}

export default VaccinesTable
