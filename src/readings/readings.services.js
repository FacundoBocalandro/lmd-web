import {get, post, put} from "../utils/http";

export const services = {
    getCategories: () => get('readings/category'),
    getReadingsByCategory: (categoryId) => get(`readings/category/${categoryId}`),
    addReading: (reading) => post('readings', reading),
    editReading: (reading) => put('readings', reading),
    uploadImage: (image) => post('readings/picture', image),
    disableReading: (id) => put(`readings/disable/${id}`),
    enableReading: (id) => put(`readings/enable/${id}`),
}
