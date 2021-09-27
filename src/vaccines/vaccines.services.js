import {get, post} from "../utils/http";

export const services = {
    getAllVaccines: () => get('vaccine'),
    getUserVaccines: (patientId) => get('vaccine/get-user-vaccines', {options: {params: {patientId}}}),
    submitNewVaccination: (vaccinationInfo) => post('vaccine/applied', vaccinationInfo),
    getVaccineDetails: (id) => get(`vaccine/details/${id}`)
}
