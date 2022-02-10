export const GET_READING_CATEGORIES_REQUEST = "GET_READING_CATEGORIES_REQUEST";
export const GET_READING_CATEGORIES_RESPONSE = "GET_READING_CATEGORIES_RESPONSE";
export const GET_READING_CATEGORIES_ERROR = "GET_READING_CATEGORIES_ERROR";
export const GET_READINGS_BY_CATEGORY_REQUEST = "GET_READINGS_BY_CATEGORY_REQUEST";
export const GET_READINGS_BY_CATEGORY_RESPONSE = "GET_READINGS_BY_CATEGORY_RESPONSE";
export const GET_READINGS_BY_CATEGORY_ERROR = "GET_READINGS_BY_CATEGORY_ERROR";
export const ADD_READING_REQUEST = "ADD_READING_REQUEST";
export const ADD_READING_RESPONSE = "ADD_READING_RESPONSE";
export const ADD_READING_ERROR = "ADD_READING_ERROR";
export const EDIT_READING_REQUEST = "EDIT_READING_REQUEST";
export const EDIT_READING_RESPONSE = "EDIT_READING_RESPONSE";
export const EDIT_READING_ERROR = "EDIT_READING_ERROR";
export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST"
export const UPLOAD_IMAGE_RESPONSE = "UPLOAD_IMAGE_RESPONSE"
export const UPLOAD_IMAGE_ERROR = "UPLOAD_IMAGE_ERROR"
export const DISABLE_READING_REQUEST = "DISABLE_READING_REQUEST"
export const DISABLE_READING_RESPONSE = "DISABLE_READING_RESPONSE"
export const DISABLE_READING_ERROR = "DISABLE_READING_ERROR"
export const ENABLE_READING_REQUEST = "ENABLE_READING_REQUEST"
export const ENABLE_READING_RESPONSE = "ENABLE_READING_RESPONSE"
export const ENABLE_READING_ERROR = "ENABLE_READING_ERROR"


const readingsActions = {
    getReadingCategories: {
        request: () => ({type: GET_READING_CATEGORIES_REQUEST}),
        response: (res) => ({type: GET_READING_CATEGORIES_RESPONSE, res}),
        error: (err) => ({type: GET_READING_CATEGORIES_ERROR, err})
    },
    getReadingsByCategory: {
        request: (categoryId, callback) => ({type: GET_READINGS_BY_CATEGORY_REQUEST, categoryId, callback}),
        response: (res) => ({type: GET_READINGS_BY_CATEGORY_RESPONSE, res}),
        error: (err) => ({type: GET_READINGS_BY_CATEGORY_ERROR, err}),
    },
    addReading: {
        request: (reading, callback, errorCallback) => ({type: ADD_READING_REQUEST, reading, callback, errorCallback}),
        response: (res) => ({type: ADD_READING_RESPONSE, res}),
        error: (err) => ({type: ADD_READING_ERROR, err})
    },
    editReading: {
        request: (reading, callback, errorCallback) => ({type: EDIT_READING_REQUEST, reading, callback, errorCallback}),
        response: (res) => ({type: EDIT_READING_RESPONSE, res}),
        error: (err) => ({type: EDIT_READING_ERROR, err})
    },
    uploadImage: {
        request: (image, callback, errorCallback) => ({type: UPLOAD_IMAGE_REQUEST, image, callback, errorCallback}),
        response: (res) => ({type: UPLOAD_IMAGE_RESPONSE, res}),
        error: (err) => ({type: UPLOAD_IMAGE_ERROR, err})
    },
    disableReading: {
        request: (id, callback) => ({type: DISABLE_READING_REQUEST, id, callback}),
        response: (res) => ({type: DISABLE_READING_RESPONSE, res}),
        error: (err) => ({type: DISABLE_READING_ERROR, err})
    },
    enableReading: {
        request: (id, callback) => ({type: ENABLE_READING_REQUEST, id, callback}),
        response: (res) => ({type: ENABLE_READING_RESPONSE, res}),
        error: (err) => ({type: ENABLE_READING_ERROR, err})
    }
}

export default readingsActions;
