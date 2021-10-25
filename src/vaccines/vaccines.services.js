import {deleteRequest, get, post, put} from "../utils/http";

export const services = {
    getAllVaccines: () => get('vaccine'),
    getUserVaccines: (patientId) => get('vaccine/get-user-vaccines', {options: {params: {patientId}}}),
    submitNewVaccination: (vaccinationInfo) => post('vaccine/applied', vaccinationInfo),
    getVaccineDetails: (id) => get(`vaccine/details/${id}`),
    updateVaccination: (id, vaccinationInfo) => put(`vaccine/edit/${id}`, vaccinationInfo),
    deleteVaccination: (id) => deleteRequest(`vaccine/delete/${id}`),
}
