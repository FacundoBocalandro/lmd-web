import {deleteRequest, get, post} from "../utils/http";

export const services = {
    getAllRelationships: () => get('patients'),
    addNewRelationship: (info) => post('patients', info),
    deleteRelationship: (info) => deleteRequest('patients', info),
    searchDoctors: (dni) => post('patients/doctor', {dni})
}
