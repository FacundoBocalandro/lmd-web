const initialState = {
    personalData: {
        avatar: 'OTTER',
        fullName: "Facundo Bocalandro",
        age: 20,
        dni: "42648941"
    }
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default homeReducer;
