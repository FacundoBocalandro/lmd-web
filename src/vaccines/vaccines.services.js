import {get, post} from "../utils/http";

export const services = {
    getAllVaccines: (patientId) => get('vaccine', {options: {params: {patientId}}}),
    getUserVaccines: (patientId) => get('vaccine/get-user-vaccines', {options: {params: {patientId}}}),
    submitNewVaccination: (vaccinationInfo) => post('vaccine/applied', vaccinationInfo),
    getVaccineDetails: (id) => get(`vaccine/details/${id}`),
    exportVaccines: (patientId) => get('export/vaccine', {options: {params: {patientId}}}),
}
