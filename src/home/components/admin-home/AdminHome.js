import React, {useState} from "react";
import "./AdminHome.css";
import Modal from "react-modal";
import TextInput from "../../../common/components/inputs/TextInput";
import toast, {Toaster} from "react-hot-toast";
import {MODAL_STYLE} from "../../../constants/modal";

const GLOBAL_NOTIFICATION = "GLOBAL_NOTIFICATION";

const AdminHome = ({getReadingCategories, readingCategories, addReading, sendNotification, uploadImage}) => {
    const [modalInfo, setModalInfo] = useState({});

    const openGlobalNotificationModal = () => {
        setModalInfo({open: true, type: GLOBAL_NOTIFICATION})
    }

    const closeModal = () => setModalInfo({})

    const getModalBody = (type) => {
        switch (type) {
            case GLOBAL_NOTIFICATION:
                return <GlobalNotificationModalBody setModalInfo={setModalInfo} sendNotification={sendNotification}/>
            default:
                return <></>
        }
    }

    return <div className={"admin-home"}>
        <Toaster/>
        {modalInfo.open && <Modal isOpen={true} onRequestClose={closeModal} style={MODAL_STYLE}>
            {getModalBody(modalInfo.type)}
        </Modal>}
        <button className={'submit-button'}
                onClick={openGlobalNotificationModal}>Enviar notificación global
        </button>
    </div>
}

const GlobalNotificationModalBody = ({sendNotification, setModalInfo}) => {
    const [notification, setNotification] = useState({
        title: "",
        body: ""
    })

    const errorCallback = () => {
        toast.error("Error enviando notificación");
    }

    const successCallback = () => {
        setModalInfo({open: false})
        toast.success("Notificación enviada exitosamente");
    }

    const handleSendNotification = () => {
        sendNotification(notification, successCallback, errorCallback)
    }

    return (
        <div className={"global-notification-modal"}>
            <TextInput label={"Titulo"} value={notification.title}
                       onChange={(title) => setNotification({...notification, title})}/>
            <div className={"input-container"}>
                <span className={"input-label"}>Cuerpo</span>
                <div className={"text-box-container"}>
                <textarea className={"text-box"}
                          value={notification.body}
                          onChange={event => setNotification({...notification, body: event.target.value})}
                />
                </div>
            </div>
            <button onClick={handleSendNotification} className={`submit-button`}>Enviar notificación</button>
        </div>
    )
}

export default AdminHome;
