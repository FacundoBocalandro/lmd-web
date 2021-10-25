import sessionActions from "../session/session.actions";
import homeActions from "../home/home.actions";
import vaccinesActions from "../vaccines/vaccines.actions";
import notesActions from "../notes/notes.actions";
import readingsActions from "../readings/readings.actions";
import relationshipsActions from "../relationships/relationships.actions";
import prebornActions from "../preborn/preborn.actions";
import notificationsActions from "../notifications/notifications.actions";

const actions = {
    session: sessionActions,
    home: homeActions,
    vaccines: vaccinesActions,
    notes: notesActions,
    readings: readingsActions,
    relationships: relationshipsActions,
    notifications: notificationsActions,
    preborn: prebornActions
}

export default actions;
