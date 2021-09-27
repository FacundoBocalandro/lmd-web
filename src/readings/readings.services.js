import {get, post} from "../utils/http";

export const services = {
    getCategories: () => get('readings/category'),
    getReadingsByCategory: (categoryId) => get(`readings/category/${categoryId}`),
    addReading: (reading) => post('readings', reading)
}
