import {deleteRequest, get, post, put} from "../utils/http";

export const services = {
    getAllVaccines: (userId) => get('vaccine', {options: {params: {userId}}}),
    getUserVaccines: (patientId) => get('vaccine/get-user-vaccines', {options: {params: {patientId}}}),
    submitNewVaccination: (vaccinationInfo) => post('vaccine/applied', vaccinationInfo),
    getVaccineDetails: (id) => get(`vaccine/details/${id}`),
    updateVaccination: (id, vaccinationInfo, patientId) => put(`vaccine/edit/${id}/${patientId}`, vaccinationInfo),
    deleteVaccination: (id, patientId) => deleteRequest(`vaccine/delete/${id}/${patientId}`),
    exportVaccines: (patientId) => get('export/vaccine', {options: {params: {patientId}}}),
    getVaccineApplications: (id, patientId) => get(`vaccine/applications/${id}`, {options: {params: {patientId}}}),
    createNewVaccine: (vaccine, patientId) => post(`vaccine/create/${patientId}`, vaccine),
}
