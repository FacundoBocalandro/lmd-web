import {deleteRequest, get, post, put} from "../utils/http";

export const services = {
    getAllNotes: () => get('notes'),
    createNote: (note) => post('notes', note),
    updateNote: (note) => put('notes', note),
    deleteNote: (id) => deleteRequest(`notes/${id}`)
}
