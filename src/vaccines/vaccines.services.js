import {get, post} from "../utils/http";

export const services = {
    getAllVaccines: () => get('vaccine'),
    getUserVaccines: () => get('vaccine/get-user-vaccines'),
    submitNewVaccination: (vaccinationInfo) => post('vaccine/applied', vaccinationInfo),
    getVaccineDetails: (id) => get(`vaccine/details/${id}`)
}
