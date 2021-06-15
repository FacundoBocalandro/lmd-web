import {get} from "../utils/http";

export const services = {
    getAllVaccines: () => get('vaccine'),
    getUserVaccines: () => get('vaccine/get-user-vaccines')
}
