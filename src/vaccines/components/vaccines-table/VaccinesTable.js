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

const VaccinesTable = ({allVaccines, userVaccines, selectedRowId, setSelectedRowId, submitNewVaccination, userRole}) => {

    const [modalInfo, setModalInfo] = useState({open: false})
    const [appliedDateError, setAppliedDateError] = useState(false);

    const appliedDosagesIds = userVaccines.filter(vaccinationInfo => vaccinationInfo.hasBeenApplied).map(vaccinationInfo => vaccinationInfo.dosageDto.id);

    const canApplyDose = (dosageId, vaccineDosages, dosageIndex) => {
        return userRole === USER_ROLES.DOCTOR && !hasBeenApplied(dosageId) && (dosageIndex === 0 || hasBeenApplied(vaccineDosages[dosageIndex - 1].id));
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

    const errorCallback = () => {
        toast.error("Error registrando la vacunación")
    }

    const saveVaccinationInfo = () => {
        if (dateIsValid(modalInfo.vaccinationInfo.appliedDate) && isOnOrBeforeToday(modalInfo.vaccinationInfo.appliedDate)) {
            const dateParts = modalInfo.vaccinationInfo.appliedDate.split("/");
            const appliedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0, 10);
            submitNewVaccination({...modalInfo.vaccinationInfo, appliedDate}, successCallback, errorCallback)
            closeModal();
        } else {
            setAppliedDateError(true)
        }
    }

    return userVaccines ? (
        <div className={"vaccines-table"}>
            <Toaster/>
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
                               disabled={modalInfo.hasBeenApplied}
                               className={appliedDateError ? 'input input-error' : 'input'} label={"Fecha de vacunación"}/>
                    <div className={"new-vaccination-button-container"}>
                        {!modalInfo.hasBeenApplied && <button className={'submit-button'} onClick={saveVaccinationInfo}>Guardar</button>}
                        {modalInfo.hasBeenApplied && <span className={"new-vaccination-modal-subtitle"}>Pediatra responsable: {modalInfo.vaccinationInfo.responsibleDoctor.firstName} {modalInfo.vaccinationInfo.responsibleDoctor.lastName}</span>}
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
