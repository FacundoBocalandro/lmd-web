import React, {useEffect, useState} from "react";
import "./RelationshipsScreen.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import toast, {Toaster} from "react-hot-toast";
import {GENDERS} from "../../constants/PersonalData";
import {getAvatar} from "../../utils/avatars";
import {USER_ROLES} from "../../constants/roles";
import RelationshipModal from "./relationship-modal/RelationshipModal";

const RelationshipsScreen = ({relationships, getAllRelationships, addNewRelationship, deleteRelationship, userInfo, searchDoctors}) => {
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
                                              handleAddNewRelationship={handleAddNewRelationship} searchDoctors={searchDoctors}/>}
        <div className={"relationships-list"}>
            {relationships && relationships.map(relationship => <UserRow info={relationship} deleteRelationship={deleteRelationship} userId={userInfo.id} isPatient={isPatient()}/>)}
            {isPatient() && <div className={"header-with-plus-icon add-relationship-header"} onClick={() => setModalInfo({open: true})}>
                <span>Agregar pediatra</span>
                <FontAwesomeIcon icon={faPlusCircle} className={"header-add-icon"}/>
            </div>}
        </div>
    </div>)
}

const UserRow = ({info, deleteRelationship, userId, isPatient}) => {
    const gender = info.gender === GENDERS.MALE ? 'male' : 'female'

    return (
        <div className={"user-info-row"}>
            <div className={"user-info-row-name-avatar"}>
                <div className={`user-row-avatar-container ${gender}`}>
                    <FontAwesomeIcon icon={getAvatar(info.avatar)} className={`user-row-avatar ${gender}`}/>
                </div>
                <span>{info.firstName} {info.lastName}</span>
            </div>
            {isPatient && <FontAwesomeIcon icon={faTimesCircle} className={"delete-relationship-icon"} onClick={() => deleteRelationship({patientId: userId, doctorId: info.id})}/>}
        </div>
    )
}

export default RelationshipsScreen;