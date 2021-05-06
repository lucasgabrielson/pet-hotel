import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* ownersApi(action) {
    try {
        console.log( 'in ownersApi');
    } catch (error) {
        console.log('Error getting apis from database', error);
    }
}

function* ownersApiSaga() {
    yield takeLatest('GET_OWNERS', ownersApi);
}

export default ownersApiSaga;