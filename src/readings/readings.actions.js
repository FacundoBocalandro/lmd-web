export const GET_READING_CATEGORIES_REQUEST = "GET_READING_CATEGORIES_REQUEST";
export const GET_READING_CATEGORIES_RESPONSE = "GET_READING_CATEGORIES_RESPONSE";
export const GET_READING_CATEGORIES_ERROR = "GET_READING_CATEGORIES_ERROR";
export const GET_READINGS_BY_CATEGORY_REQUEST = "GET_READINGS_BY_CATEGORY_REQUEST";
export const GET_READINGS_BY_CATEGORY_RESPONSE = "GET_READINGS_BY_CATEGORY_RESPONSE";
export const GET_READINGS_BY_CATEGORY_ERROR = "GET_READINGS_BY_CATEGORY_ERROR";

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
    }
}

export default readingsActions;
