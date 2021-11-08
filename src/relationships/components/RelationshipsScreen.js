import React, {useEffect, useState} from "react";
import "./RelationshipsScreen.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import toast, {Toaster} from "react-hot-toast";
import {GENDERS} from "../../constants/PersonalData";
import {getAvatar} from "../../utils/avatars";
import {USER_ROLES} from "../../constants/roles";
import RelationshipModal from "./relationship-modal/RelationshipModal";
import {getSelectedPatient, removeSelectedPatient, saveSelectedPatient} from "../../utils/tokens";
import {Button, IconButton} from "@material-ui/core";
import {Add, Cancel} from "@material-ui/icons";

const RelationshipsScreen = ({
                                 relationships,
                                 getAllRelationships,
                                 addNewRelationship,
                                 deleteRelationship,
                                 userInfo,
                                 searchDoctors
                             }) => {
    const [modalInfo, setModalInfo] = useState({open: false});

    useEffect(() => {
        getAllRelationships();

        // eslint-disable-next-line
    }, [])

    const isPatient = () => userInfo.userRole === USER_ROLES.PATIENT

    const closeModal = () => {
        setModalInfo({open: false});
    }

    const errorCallback = () => {
        toast.error("Error agregando pediatra");
    }

    const successCallback = () => {
        setModalInfo({open: false})
        toast.success("Pediatra agregado exitosamente");
    }

    const handleAddNewRelationship = () => {
        if (!modalInfo.doctorId || relationships.some(doctor => doctor.id === modalInfo.doctorId)) {
            setModalInfo({...modalInfo, error: true})
        } else {
            addNewRelationship({patientId: userInfo.id, doctorId: modalInfo.doctorId}, successCallback, errorCallback)
        }
    }

    return (<div className={"relationships-screen"}>
        <Toaster/>
        {modalInfo.open && <RelationshipModal closeModal={closeModal} modalInfo={modalInfo}
                                              setModalInfo={setModalInfo}
                                              handleAddNewRelationship={handleAddNewRelationship}
                                              searchDoctors={searchDoctors}/>}
        <div className={"relationships-list"}>
            {!isPatient() && <div className={"relationship-doctor-instructions-text-container"}>
                Seleccione un paciente de la lista:
            </div>}
            {relationships && relationships.map(relationship => <UserRow info={relationship}
                                                                         deleteRelationship={deleteRelationship}
                                                                         userId={userInfo.id} isPatient={isPatient()}
                                                                         saveSelectedPatient={saveSelectedPatient}
            />)}
            {isPatient() && <Button
                variant="contained"
                color="primary"
                endIcon={<Add/>}
                className={"add-relationship-button"}
                onClick={() => setModalInfo({open: true})}
            >
                Agregar pediatra
            </Button>
            }
        </div>
    </div>)
}

const UserRow = ({info, deleteRelationship, userId, isPatient}) => {
    const [selected, setSelected] = useState(getSelectedPatient() === info.id);

    const gender = info.gender === GENDERS.MALE ? 'male' : 'female'

    const handleRowClick = () => {
        if (!isPatient) {
            if (selected) {
                removeSelectedPatient();
                setSelected(false);
            } else {
                saveSelectedPatient(info.id);
                setSelected(true);
            }
        }
    }

    return (
        <div className={`user-info-row${selected ? ' selected' : ''}`} onClick={handleRowClick}>
            <div className={"user-info-row-name-avatar"}>
                <div className={`user-row-avatar-container ${gender}`}>
                    <FontAwesomeIcon icon={getAvatar(info.avatar)} className={`user-row-avatar ${gender}`}/>
                </div>
                <span className={"user-info-row-name"}>{info.firstName} {info.lastName}</span>
            </div>
            {isPatient && <IconButton aria-label="eliminar pediatra" component="span"
                                      onClick={() => deleteRelationship({patientId: userId, doctorId: info.id})} size={"large"}>
                <Cancel/>
            </IconButton>}
        </div>
    )
}

export default RelationshipsScreen;