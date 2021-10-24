import React, {useEffect, useState} from "react";
import "./AdminHome.css";
import RichTextEditor from "../../../common/components/rich-text/RichTextEditor";
import Modal from "react-modal";
import {EditorState} from "draft-js";
import TextInput from "../../../common/components/inputs/TextInput";
import richUtils from "../../../utils/richUtils";
import Autocomplete from "../../../common/components/inputs/Autocomplete";
import toast, {Toaster} from "react-hot-toast";

const ADD_READING = "ADD_READING";
const GLOBAL_NOTIFICATION = "GLOBAL_NOTIFICATION";

const AdminHome = ({getReadingCategories, readingCategories, addReading, sendNotification}) => {
    const [modalInfo, setModalInfo] = useState({});

    const openAddReadingModal = () => {
        setModalInfo({open: true, type: ADD_READING})
    }

    const openGlobalNotificationModal = () => {
        setModalInfo({open: true, type: GLOBAL_NOTIFICATION})
    }

    const closeModal = () => setModalInfo({})

    const getModalBody = (type) => {
        switch (type) {
            case ADD_READING:
                return <AddReadingModalBody getReadingCategories={getReadingCategories}
                                            readingCategories={readingCategories} addReading={addReading}
                                            setModalInfo={setModalInfo}/>
            case GLOBAL_NOTIFICATION:
                return <GlobalNotificationModalBody setModalInfo={setModalInfo} sendNotification={sendNotification}/>
            default:
                return <></>
        }
    }

    return <div className={"admin-home"}>
        <Toaster/>
        {modalInfo.open && <Modal isOpen={true} onRequestClose={closeModal} style={{
            overlay: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }, content: {width: 'fit-content', height: 'fit-content', inset: 'auto'}
        }}>
            {getModalBody(modalInfo.type)}
        </Modal>}
        <button className={'submit-button'}
                onClick={openAddReadingModal}>Agregar lectura recomendada
        </button>
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

const AddReadingModalBody = ({getReadingCategories, readingCategories, addReading, setModalInfo}) => {
    useEffect(() => {
        getReadingCategories();

        // eslint-disable-next-line
    }, [])

    const [reading, setReading] = useState({
        title: "",
        body: EditorState.createEmpty(),
        tags: [],
        category: ""
    })

    const errorCallback = () => {
        toast.error("Error agregando lectura");
    }

    const successCallback = () => {
        setModalInfo({open: false})
        toast.success("Lectura agregada exitosamente");
    }

    const handleAddReading = () => {
        addReading({...reading, body: richUtils.parseEditorState(reading.body)}, successCallback, errorCallback)
    }

    return (
        <div className={"add-reading-modal"}>
            <TextInput label={"Titulo"} value={reading.title} onChange={(title) => setReading({...reading, title})}/>
            <RichTextEditor label={"Cuerpo"} editorState={reading.body}
                            setEditorState={body => setReading({...reading, body})}/>
            <div className={"add-reading-modal-category"}>
                <Autocomplete label={"Categoría"} options={readingCategories.map(option => option.name)}
                              value={reading.category}
                              onChange={category => setReading({...reading, category})}/>
            </div>
            <button onClick={handleAddReading} className={`submit-button`}>Agregar lectura</button>
        </div>
    )
}

export default AdminHome;