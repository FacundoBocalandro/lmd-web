import React, {useState} from "react";
import Modal from "react-modal";
import {MODAL_STYLE} from "../../../constants/modal";
import {Button, TextField} from "@material-ui/core";

const RelationshipModal = ({closeModal, modalInfo, setModalInfo, handleAddNewRelationship, searchDoctors}) => {
    const [doctor, setDoctor] = useState(null);
    const [doctorDni, setDoctorDni] = useState("");

    const handleSearchDoctors = () => {
        searchDoctors(doctorDni, res => {
            setDoctor(res);
            setModalInfo({...modalInfo, doctorId: res.id});
        })
    }

    return (
        <Modal isOpen={true} onRequestClose={closeModal} style={MODAL_STYLE}>
            <div className={"add-relationship-modal"}>
                {doctor ? <>
                        <div className={"relationship-modal-doctor-info"}>
                            <span className={"doctor-name"}>{doctor.firstName} {doctor.lastName}</span>
                            <span className={"doctor-dni"}>{doctor.dni}</span>
                        </div>
                        <div className={"relationship-modal-buttons-container"}>
                            <Button variant={"contained"} color={"secondary"} onClick={closeModal}>Cancelar</Button>
                            <Button variant={"contained"} color={"primary"} onClick={handleAddNewRelationship}>Agregar</Button>
                        </div>
                    </>
                    : <>
                        <TextField value={modalInfo.doctorId}
                                   onChange={event => setDoctorDni(event.target.value)}
                                   label={"DNI del doctor"} fullWidth required/>
                        <Button variant={"contained"} color={"primary"} onClick={handleSearchDoctors} className={"search-doctor-button"}>Buscar</Button>
                    </>}
            </div>
        </Modal>
    )
}

export default RelationshipModal;