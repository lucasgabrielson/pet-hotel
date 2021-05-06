import { all } from 'redux-saga/effects';
import ownersApiSaga from './owners.saga'

export default function* rootSaga() {
  yield all([
      ownersApiSaga(),
  ]);
}

