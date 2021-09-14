import React, {useState} from "react";
import "./VaccinesTable.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import DateInput from "../../../common/components/inputs/DateInput";
import {dateIsValid, isOnOrBeforeToday} from "../../../utils/dates";
import toast, { Toaster } from 'react-hot-toast';

const VaccinesTable = ({allVaccines, userVaccines, selectedRowId, setSelectedRowId, submitNewVaccination}) => {

    const [modalInfo, setModalInfo] = useState({open: false})
    const [appliedDateError, setAppliedDateError] = useState(false);

    const appliedVaccineIds = userVaccines.filter(vaccineData => vaccineData.hasBeenApplied).map(vaccineData => vaccineData.vaccineDto.id);

    const hasBeenApplied = (id) => {
        return appliedVaccineIds.includes(id);
    }

    const openModal = (vaccineId, vaccineName) => {
        if (!hasBeenApplied(vaccineId)) {
            setModalInfo({open: true, vaccinationInfo: {vaccineId}, vaccineName})
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
                    <span className={"new-vaccination-modal-title"}>Vacuna: {modalInfo.vaccineName}</span>
                    <DateInput date={modalInfo.vaccinationInfo.appliedDate} onChange={changeAppliedDate}
                               className={appliedDateError ? 'input input-error' : 'input'} label={"Fecha de vacunación"}/>
                    <div className={"new-vaccination-button-container"}>
                        <button className={'submit-button'} onClick={saveVaccinationInfo}>Guardar</button>
                    </div>
                </div>
            </Modal>}
            <div className={"vaccines-table-row vaccines-table-header"}>
                <div className={"vaccines-table-cell"}>Nombre</div>
                <div className={"vaccines-table-cell align-center"}>Aplicada</div>
            </div>
            <div className={"vaccines-table-body"}>
                {allVaccines.map(vaccine => (
                    <div className={`vaccines-table-row${vaccine.id === selectedRowId ? ' selected-row' : ''}`}
                         onClick={() => setSelectedRowId(vaccine.id)}>
                        <div className={"vaccines-table-cell"}>{vaccine.name}</div>
                        <div className={"vaccines-table-cell align-center"}>{<FontAwesomeIcon icon={faCheckCircle}
                                                                                              onClick={(e) => {
                                                                                                  openModal(vaccine.id, vaccine.name);
                                                                                                  e.stopPropagation();
                                                                                              }}
                                                                                              className={hasBeenApplied(vaccine.id) ? 'checked-icon' : 'unchecked-icon'}/>}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
}

export default VaccinesTable
