import {get, put} from "../utils/http";

export const services = {
    getPrebornData: (patientId) => get('users/preborn', {options: {params: {patientId}}}),
    setPrebornData: (prebornData, patientId) => put('users/preborn', prebornData, {options: {params: {patientId}}})
}
