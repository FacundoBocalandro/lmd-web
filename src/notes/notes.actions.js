export const GET_ALL_NOTES_REQUEST = "GET_ALL_NOTES_REQUEST";
export const GET_ALL_NOTES_RESPONSE = "GET_ALL_NOTES_RESPONSE";
export const CREATE_NOTE_REQUEST = "CREATE_NOTE_REQUEST";
export const CREATE_NOTE_RESPONSE = "CREATE_NOTE_RESPONSE";
export const CREATE_NOTE_ERROR = "CREATE_NOTE_ERROR";
export const UPDATE_NOTE_TITLE_REQUEST = "UPDATE_NOTE_TITLE_REQUEST";
export const UPDATE_NOTE_TITLE_RESPONSE = "UPDATE_NOTE_TITLE_RESPONSE";
export const UPDATE_NOTE_TITLE_ERROR = "UPDATE_NOTE_TITLE_ERROR";
export const UPDATE_NOTE_BODY_REQUEST = "UPDATE_NOTE_BODY_REQUEST";
export const UPDATE_NOTE_BODY_RESPONSE = "UPDATE_NOTE_BODY_RESPONSE";
export const UPDATE_NOTE_BODY_ERROR = "UPDATE_NOTE_BODY_ERROR";
export const DELETE_NOTE_REQUEST = "DELETE_NOTE_REQUEST";
export const DELETE_NOTE_RESPONSE = "DELETE_NOTE_RESPONSE";

const notesActions = {
    getAllNotes: {
        request: () => ({type: GET_ALL_NOTES_REQUEST}),
        response: (res) => ({type: GET_ALL_NOTES_RESPONSE, res})
    },
    createNote: {
        request: (callback) => ({type: CREATE_NOTE_REQUEST, callback}),
        response: (res) => ({type: CREATE_NOTE_RESPONSE, res}),
        error: (err) => ({type: CREATE_NOTE_ERROR, err})
    },
    updateNoteTitle: {
        request: (id, title, sendToServer) => ({type: UPDATE_NOTE_TITLE_REQUEST, id, title, sendToServer}),
        response: (res) => ({type: UPDATE_NOTE_TITLE_RESPONSE, res}),
        error: (err) => ({type: UPDATE_NOTE_TITLE_ERROR, err})
    },
    updateNoteBody: {
        request: (id, body, sendToServer) => ({type: UPDATE_NOTE_BODY_REQUEST, id, body, sendToServer}),
        response: (res) => ({type: UPDATE_NOTE_BODY_RESPONSE, res}),
        error: (err) => ({type: UPDATE_NOTE_BODY_ERROR, err})
    },
    deleteNote: {
        request: (id) => ({type: DELETE_NOTE_REQUEST, id}),
        response: (res) => ({type: DELETE_NOTE_RESPONSE, res}),
    }
}

export default notesActions;
