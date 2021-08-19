import {connect} from "react-redux";
import Notes from "../components/Notes";
import actions from "../../actions";

const mapStateToProps = state => ({
    allNotes: state.notes.allNotes,
    updateNoteStatus: state.notes.updateNoteStatus
})

const mapDispatchToProps = dispatch => ({
    getAllNotes: () => dispatch(actions.notes.getAllNotes.request()),
    createNote: () => dispatch(actions.notes.createNote.request()),
    updateNoteTitle: (id, title, sendToServer) => dispatch(actions.notes.updateNoteTitle.request(id, title, sendToServer)),
    updateNoteBody: (id, body, sendToServer) => dispatch(actions.notes.updateNoteBody.request(id, body, sendToServer)),
    deleteNote: (id) => dispatch(actions.notes.deleteNote.request(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
