import { all } from 'redux-saga/effects';
import categoriesSaga from './categoriesSaga';
import catsSaga from './catsSaga';

export default function* rootSaga() {
    yield all([
        categoriesSaga(),
        catsSaga(),
    ]);
};