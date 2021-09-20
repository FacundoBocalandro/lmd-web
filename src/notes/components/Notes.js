import React, {useCallback, useEffect, useState} from "react";
import "./Notes.css";
import SearchInput from "../../common/components/inputs/SearchInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faPlusCircle, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import debounce from "lodash.debounce";
import Modal from "react-modal";

const Notes = ({
                   allNotes,
                   getAllNotes,
                   createNote,
                   updateNoteTitle,
                   updateNoteBody,
                   deleteNote,
                   updateNoteStatus,
                   createNotePending
               }) => {
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [modalInfo, setModalInfo] = useState({open: false});

    useEffect(() => {
        getAllNotes();

        // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedTitleChange = useCallback(debounce((id, value) => {
        updateNoteTitle(id, value, true);
    }, 500), [selectedNoteId])

    const handleNoteTitleChange = (id, value) => {
        updateNoteTitle(id, value);
        debouncedTitleChange(id, value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedBodyChange = useCallback(debounce((id, value) => {
        updateNoteBody(id, value, true);
    }, 500), [selectedNoteId])

    const handleNoteBodyChange = (id, value) => {
        updateNoteBody(id, value);
        debouncedBodyChange(id, value);
    }

    const handleDeleteNote = (id) => {
        if (selectedNoteId === id) setSelectedNoteId(null);
        deleteNote(id);
        setModalInfo({open: false})
    }

    const closeModal = () => {
        setModalInfo({open: false})
    }

    return (
        <div className={"notes-screen"}>
            {modalInfo.open && <Modal isOpen={true} onRequestClose={closeModal} style={{
                overlay: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }, content: {width: 'fit-content', height: 'fit-content', inset: 'auto'}
            }}>
                <div>
                    <span className={"note-delete-text"}>¿Está seguro que desea eliminar la nota <b>"{modalInfo.note.title}"</b>?</span>
                    <button className={'submit-button note-delete-button'} onClick={() => handleDeleteNote(modalInfo.note.id)}>Eliminar</button>
                </div>
            </Modal>}
            <div className={"notes-screen-sidebar"}>
                <SearchInput onChange={value => setSearchFilter(value)} value={searchFilter}/>
                <div className={"notes-header"}>
                    <span>Notas de consulta</span>
                    <FontAwesomeIcon icon={faPlusCircle} className={"add-note-icon"}
                                     onClick={() => createNote(note => setSelectedNoteId(note.id))}/>
                </div>
                <div className={"sidebar-notes-list"}>

                    {createNotePending && <FontAwesomeIcon icon={faSpinner} spin size={'2x'} color={'#133D8D'}/>}
                    {allNotes && allNotes
                        .filter(note => note.title.toLowerCase().includes(searchFilter.toLowerCase()))
                        .map(note => (
                            <div className={"sidebar-note"} key={note.id}>
                                <input type="text" className={"sidebar-note-title"} value={note.title}
                                       placeholder={"Escriba aquí el título..."}
                                       onChange={event => handleNoteTitleChange(note.id, event.target.value)}
                                       onFocus={() => setSelectedNoteId(note.id)}/>
                                {selectedNoteId === note.id ?
                                    <FontAwesomeIcon icon={faChevronRight} className={"selected-note-arrow"}/> :
                                    <FontAwesomeIcon icon={faTimesCircle} className={"delete-note-icon"}
                                                     onClick={() => setModalInfo({open: true, note})}/>}
                            </div>)
                        )}
                </div>
            </div>
            <div className={"notes-screen-body"}>
                <div className={"notes-description-box-container"}>
                    <textarea className={"notes-description-box"}
                              placeholder={selectedNoteId ? "Escriba aquí su consulta..." : "Seleccione o cree una nota"}
                              value={allNotes.find(note => note.id === selectedNoteId)?.body}
                              onChange={event => handleNoteBodyChange(selectedNoteId, event.target.value)}
                              disabled={!selectedNoteId}/>
                    {selectedNoteId && <span className={"update-note-status"}>{updateNoteStatus}</span>}
                </div>
            </div>
        </div>
    )
}

export default Notes;
