import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* petsApi (action) {
    try{
        console.log( 'in petsApi' );
        const response = yield axios.get('/api/pets' )
        yield put({type: 'SET_PETS', payload: response.data })
    } catch(err) {
        console.log('Error getting pets', err )
    }
}

function* addPetApi(action) {
    try {
        console.log( 'in addPetApi');
        const response = yield axios.post('/api/pets', action.payload );
        yield put({type: 'GET_PETS'})
    } catch (error) {
        console.log('Error posting pet into database', error);
    }
}
function* updatePetApi(action) {
    try {
        console.log( 'in updatePetApi');
        const response = yield axios.put('/api/pets', action.payload )
        yield put({type: 'GET_PETS'})
    } catch(err) {
        console.log('Error updating pets', err )
    }
}

function* deletePetsApi(action) {
    try {
        console.log( 'in deletePetsApi');
        const response = yield axios.delete('/api/pets', {data: action.payload} );
        yield put({type: 'GET_PETS'})
    } catch (error) {
        console.log('Error posting pet into database', error);
    }
}



function* petsApiSaga() {
    yield takeLatest('ADD_PET', addPetApi);
    yield takeLatest('GET_PETS', petsApi );
    yield takeLatest('DELETE_PET', deletePetsApi);
    yield takeLatest('UPDATE_PETSTATUS', updatePetsApi);
}

export default petsApiSaga;