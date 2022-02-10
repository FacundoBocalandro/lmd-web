import React, {useEffect, useState} from "react";
import "./Notifications.css";
import Modal from "react-modal";
import TextInput from "../../common/components/inputs/TextInput";
import toast, {Toaster} from "react-hot-toast";
import {MODAL_STYLE} from "../../constants/modal";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";

const Notifications = ({sendNotification, getAllNotifications, notifications}) => {
    const [modalInfo, setModalInfo] = useState({open: false});

    useEffect(getAllNotifications, [getAllNotifications]);

    const closeModal = () => setModalInfo({open: false});


    return <div className={"admin-home"}>
        <Toaster/>
        {modalInfo.open && <Modal isOpen={true} onRequestClose={closeModal} style={MODAL_STYLE}>
            <GlobalNotificationModalBody closeModal={closeModal} sendNotification={sendNotification} selectedNotification={modalInfo.selectedNotification}/>
        </Modal>}
        <div className={"notifications-table-container"}>
            <Table className={"notifications-table"}>
                <TableHead>
                    <TableRow>
                        <TableCell align={"left"} className={"notifications-table-title-cell"}><span
                            className={"notifications-table-header-text"}>Título</span></TableCell>
                        <TableCell align={"left"} className={"notifications-table-body-cell"}><span
                            className={"notifications-table-header-text"}>Cuerpo</span></TableCell>
                        <TableCell align={"left"} className={"notifications-table-creator-cell"}><span
                            className={"notifications-table-header-text"}>Creador</span></TableCell>
                        <TableCell align={"left"} className={"notifications-table-time-cell"}><span
                            className={"notifications-table-header-text"}>Fecha de envío</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map(notification => (
                        <TableRow className={`notifications-table-row${modalInfo.selectedNotification && notification.title === modalInfo.selectedNotification.title && notification.timeCreated === modalInfo.selectedNotification.timeCreated ? ' selected-row' : ''}`} onClick={() => setModalInfo({open: true, selectedNotification: notification})}>
                            <TableCell
                                className={"notifications-table-cell notifications-table-title-cell"}><span>{notification.title}</span></TableCell>
                            <TableCell className={"notifications-table-cell notifications-table-body-cell"}><span>{notification.body}</span></TableCell>
                            <TableCell
                                className={"notifications-table-cell notifications-table-creator-cell"}><span>{notification.adminDto.firstName} {notification.adminDto.lastName}</span></TableCell>
                            <TableCell className={"notifications-table-cell notifications-table-time-cell"}><span>{notification.timeCreated}</span></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <IconButton className={"add-reading-icon-container"} onClick={() => setModalInfo({open: true})}><AddCircle fontSize={"large"}
                         className={'add-reading-icon'}/></IconButton>
        </div>
    </div>
}

const GlobalNotificationModalBody = ({sendNotification, closeModal, selectedNotification}) => {
    const [notification, setNotification] = useState(selectedNotification ?? {
        title: "",
        body: ""
    })

    const errorCallback = () => {
        toast.error("Error enviando notificación");
    }

    const successCallback = () => {
        closeModal()
        toast.success("Notificación enviada exitosamente");
    }

    const handleSendNotification = () => {
        sendNotification(notification, successCallback, errorCallback)
    }

    return (
        <div className={"global-notification-modal"}>
            <TextInput label={"Titulo"} value={notification.title}
                       onChange={(title) => setNotification({...notification, title})} disabled={selectedNotification}/>
            <div className={"input-container"}>
                <span className={"input-label"}>Cuerpo</span>
                <div className={"text-box-container"}>
                <textarea className={"text-box"}
                          value={notification.body}
                          onChange={event => setNotification({...notification, body: event.target.value})}
                          disabled={selectedNotification}
                />
                </div>
            </div>
            {selectedNotification ? <button onClick={closeModal} className={`submit-button`}>Cerrar</button>
                :
                <button onClick={handleSendNotification} className={`submit-button`}>Enviar notificación</button>}
        </div>
    )
}

export default Notifications;
