import {get, post} from "../utils/http";

export const services = {
    getAverageWeightData: (isMale) => get(`data/weight/average/${isMale}`),
    getAveragePerimeterData: (isMale) => get(`data/perimeter/average/${isMale}`),
    getAverageHeightData: (isMale) => get(`data/height/average/${isMale}`),
    getAverageBmiData: (isMale) => get(`data/bmi/average/${isMale}`),
    getUserWeightHistory: () => get('data/weight/list'),
    getUserPerimeterHistory: () => get('data/perimeter/list'),
    getUserHeightHistory: () => get('data/height/list'),
    getUserBmiHistory: () => get('data/bmi/list'),
    createNewWeightRecord: (weight, timeRecorded) => post('data/weight/create', {weight, timeRecorded}),
    createNewPerimeterRecord: (perimeter, timeRecorded) => post('data/perimeter/create', {perimeter, timeRecorded}),
    createNewHeightRecord: (height, timeRecorded) => post('data/height/create', {height, timeRecorded}),
}
