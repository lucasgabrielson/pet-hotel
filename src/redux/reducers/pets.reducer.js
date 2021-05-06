const pets = (state = [] , action) => {
    switch (action.type) {
        case 'SET_PETS':
            return action.payload
        default:
            return state;
    }
};

export default pets;