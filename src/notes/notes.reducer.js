import {
    CREATE_NOTE_RESPONSE,
    DELETE_NOTE_REQUEST,
    GET_ALL_NOTES_RESPONSE,
    UPDATE_NOTE_BODY_ERROR,
    UPDATE_NOTE_BODY_REQUEST,
    UPDATE_NOTE_BODY_RESPONSE,
    UPDATE_NOTE_TITLE_ERROR,
    UPDATE_NOTE_TITLE_REQUEST,
    UPDATE_NOTE_TITLE_RESPONSE
} from "./notes.actions";
import {UPDATE_NOTE_STATUS} from "../constants/notes";

const initialState = {
    allNotes: [],
    updateNoteStatus: UPDATE_NOTE_STATUS.SAVED
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES_RESPONSE:
            return {
                ...state,
                allNotes: action.res
            }
        case CREATE_NOTE_RESPONSE:
            return {
                ...state,
                allNotes: [action.res, ...state.allNotes]
            }
        case UPDATE_NOTE_TITLE_REQUEST:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.id === action.id) return {...note, title: action.title};
                    return note;
                }),
                updateNoteStatus: UPDATE_NOTE_STATUS.SAVING
            }
        case UPDATE_NOTE_BODY_REQUEST:
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.id === action.id) return {...note, body: action.body};
                    return note;
                }),
                updateNoteStatus: UPDATE_NOTE_STATUS.SAVING
            }
        case UPDATE_NOTE_TITLE_RESPONSE:
        case UPDATE_NOTE_BODY_RESPONSE:
            return {
                ...state,
                updateNoteStatus: UPDATE_NOTE_STATUS.SAVED
            }
        case UPDATE_NOTE_TITLE_ERROR:
        case UPDATE_NOTE_BODY_ERROR:
            return {
                ...state,
                updateNoteStatus: UPDATE_NOTE_STATUS.ERROR
            }
        case DELETE_NOTE_REQUEST:
            return {
                ...state,
                allNotes: state.allNotes.filter(note => note.id !== action.id)
            }
        default:
            return state
    }
}

export default notesReducer;
