import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  actions
} from 'redux/ducks/categories';
import {
  fetchCats
} from 'redux/ducks/cats';
import { fecthCategories } from 'api';

function* fetchCategoriesAsync({ payload }) {
  try {
    // @ts-ignore
    const result = yield call(fecthCategories, payload);
    yield put(fetchCategoriesSuccess(result));
    yield put(fetchCats(result[0].id))
  } catch (e) {
    yield put(fetchCategoriesError(e));
  }
}

function* categoriesSaga() {
  yield takeLatest(actions.FETCH_CATEGORIES, fetchCategoriesAsync);
}

export default categoriesSaga;;