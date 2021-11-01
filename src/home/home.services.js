import {get, post} from "../utils/http";

export const services = {
    getAverageWeightData: (isMale) => get(`data/weight/average/${isMale}`),
    getAveragePerimeterData: (isMale) => get(`data/perimeter/average/${isMale}`),
    getAverageHeightData: (isMale) => get(`data/height/average/${isMale}`),
    getAverageBmiData: (isMale) => get(`data/bmi/average/${isMale}`),
    getUserWeightHistory: (patientId) => get('data/weight/list', {options: {params: {patientId}}}),
    getUserPerimeterHistory: (patientId) => get('data/perimeter/list', {options: {params: {patientId}}}),
    getUserHeightHistory: (patientId) => get('data/height/list', {options: {params: {patientId}}}),
    getUserBmiHistory: (patientId) => get('data/bmi/list', {options: {params: {patientId}}}),
    createNewWeightRecord: (weight, timeRecorded, patientId) => post('data/weight/create', {weight, timeRecorded, patientId}),
    createNewPerimeterRecord: (perimeter, timeRecorded, patientId) => post('data/perimeter/create', {perimeter, timeRecorded, patientId}),
    createNewHeightRecord: (height, timeRecorded, patientId) => post('data/height/create', {height, timeRecorded, patientId}),
    exportGrowthData: (patientId) => get('export/data', {options: {params: {patientId}}}),
}
