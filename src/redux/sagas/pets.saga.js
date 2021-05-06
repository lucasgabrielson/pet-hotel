import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPetApi(action) {
    try {
        console.log( 'in addPetApi');
        const response = yield axios.post(`/api/pets/?${action.payload}`);
    } catch (error) {
        console.log('Error posting owner into database', error);
    }
}



function* petsApiSaga() {
    yield takeLatest('ADD_PET', addPetApi)
}

export default petsApiSaga;