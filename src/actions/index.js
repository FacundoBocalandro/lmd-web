import sessionActions from "../session/session.actions";
import homeActions from "../home/home.actions";
import vaccinesActions from "../vaccines/vaccines.actions";
import notesActions from "../notes/notes.actions";
import readingsActions from "../readings/readings.actions";
import relationshipsActions from "../relationships/relationships.actions";

const actions = {
    session: sessionActions,
    home: homeActions,
    vaccines: vaccinesActions,
    notes: notesActions,
    readings: readingsActions,
    relationships: relationshipsActions
}

export default actions;
