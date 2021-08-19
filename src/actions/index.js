import sessionActions from "../session/session.actions";
import homeActions from "../home/home.actions";
import vaccinesActions from "../vaccines/vaccines.actions";
import notesActions from "../notes/notes.actions";

const actions = {
    session: sessionActions,
    home: homeActions,
    vaccines: vaccinesActions,
    notes: notesActions
}

export default actions;
