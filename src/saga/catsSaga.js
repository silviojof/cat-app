import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchCatsSuccess,
  fetchCatsError,
  actions
} from 'redux/ducks/cats';
import { fetchCats } from 'api';

export function* fetchCatsAsync({ payload }) {
  try {
    const result = yield call(fetchCats, payload);
    yield put(fetchCatsSuccess(result));
  } catch (e) {
    yield put(fetchCatsError(e));
  }
}

function* catsSaga() {
  yield takeLatest(actions.FETCH_CATS, fetchCatsAsync);
}

export default catsSaga;