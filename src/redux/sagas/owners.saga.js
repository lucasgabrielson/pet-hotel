import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* ownersApi(action) {
    try {
        console.log( 'in ownersApi');
        const response = yield axios.get('/api/owners');
        yield put({type: 'SET_OWNERS', payload: response.data})
    } catch (error) {
        console.log('Error getting owners from database', error);
    }
}

function* ownersApiSaga() {
    yield takeLatest('GET_OWNERS', ownersApi);
}

export default ownersApiSaga;