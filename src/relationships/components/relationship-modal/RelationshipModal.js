import React, {useState} from "react";
import TextInput from "../../../common/components/inputs/TextInput";
import Modal from "react-modal";

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
        <Modal isOpen={true} onRequestClose={closeModal} style={{
            overlay: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }, content: {width: 'fit-content', height: 'fit-content', inset: 'auto'}
        }}>
            <div className={"add-relationship-modal"}>
                {doctor ? <>
                        <div className={"relationship-modal-doctor-info"}>
                            <span className={"doctor-name"}>{doctor.firstName} {doctor.lastName}</span>
                            <span className={"doctor-dni"}>{doctor.dni}</span>
                        </div>
                        <div className={"relationship-modal-buttons-container"}>
                            <button className={'cancel-button add-relationship-button'}
                                    onClick={closeModal}>Cancelar
                            </button>
                            <div className="divider"/>
                            <div className="divider"/>
                            <button className={'submit-button add-relationship-button'}
                                    onClick={handleAddNewRelationship}>Agregar
                            </button>
                        </div>
                    </>
                    : <>
                        <TextInput value={modalInfo.doctorId}
                                   onChange={setDoctorDni}
                                   label={"DNI del doctor"} error={modalInfo.error}/>
                        <button className={'submit-button add-relationship-button'}
                                onClick={handleSearchDoctors}>Buscar
                        </button>
                    </>}
            </div>
        </Modal>
    )
}

export default RelationshipModal;