import React, {useCallback, useEffect, useState} from "react";
import "./Notes.css";
import SearchInput from "../../common/components/inputs/SearchInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import debounce from "lodash.debounce";

const Notes = ({allNotes, getAllNotes, createNote, updateNoteTitle, updateNoteBody, deleteNote, updateNoteStatus}) => {
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedNoteId, setSelectedNoteId] = useState(null);

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
    }

    return (
        <div className={"notes-screen"}>
            <div className={"notes-screen-sidebar"}>
                <SearchInput onChange={value => setSearchFilter(value)} value={searchFilter}/>
                <div className={"notes-header"}>
                    <span>Notas de consulta</span>
                    <FontAwesomeIcon icon={faPlusCircle} className={"add-note-icon"} onClick={createNote}/>
                </div>
                <div className={"sidebar-notes-list"}>
                    {allNotes && allNotes
                        .filter(note => note.title.toLowerCase().includes(searchFilter.toLowerCase()))
                        .map(note => (
                        <div className={"sidebar-note"} key={note.id}>
                            <input type="text" className={"sidebar-note-title"} value={note.title}
                                   onChange={event => handleNoteTitleChange(note.id, event.target.value)}
                                   onFocus={() => setSelectedNoteId(note.id)}/>
                            {selectedNoteId === note.id ?
                                <FontAwesomeIcon icon={faChevronRight} className={"selected-note-arrow"}/> :
                                <FontAwesomeIcon icon={faTimesCircle} className={"delete-note-icon"}
                                                 onClick={() => handleDeleteNote(note.id)}/>}
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
