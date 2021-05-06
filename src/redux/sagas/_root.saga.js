import { all } from 'redux-saga/effects';
import ownersApiSaga from './owners.saga';
import petsApiSaga from './pets.saga';

export default function* rootSaga() {
  yield all([
      ownersApiSaga(),
      petsApiSaga(),
  ]);
}

