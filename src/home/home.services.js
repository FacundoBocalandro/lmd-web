import {get, post} from "../utils/http";

export const services = {
    getAverageWeightData: (isMale) => get(`data/weight/average/${isMale}`),
    getAveragePerimeterData: (isMale) => get(`data/perimeter/average/${isMale}`),
    getAverageHeightData: (isMale) => get(`data/height/average/${isMale}`),
    getUserWeightHistory: () => get('data/weight/list'),
    getUserPerimeterHistory: () => get('data/perimeter/list'),
    getUserHeightHistory: () => get('data/height/list'),
    createNewWeightRecord: (weight) => post('data/weight/create', {weight}),
    createNewPerimeterRecord: (perimeter) => post('data/perimeter/create', {perimeter}),
    createNewHeightRecord: (height) => post('data/height/create', {height}),
}
