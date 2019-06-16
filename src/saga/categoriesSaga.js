import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  setActiveCategory,
  actions
} from 'redux/ducks/categories';
import {
  fetchCats,
  clearCats,
} from 'redux/ducks/cats';
import { fecthCategories } from 'api';

export function* fetchCategoriesAsync({ payload }) {
  try {
    const result = yield call(fecthCategories, payload);
    yield put(fetchCategoriesSuccess(result));
    yield put(fetchCats(result[0].id))
  } catch (e) {
    yield put(fetchCategoriesError(e));
  }
}

export function* changeCategory({ payload }) {
  try {
    yield put(setActiveCategory(payload));
    yield put(clearCats());
    yield put(fetchCats(payload.id))
  } catch (e) {
    yield put(fetchCategoriesError(e));
  }
}

function* categoriesSaga() {
  yield takeLatest(actions.FETCH_CATEGORIES, fetchCategoriesAsync);
  yield takeLatest(actions.CHANGE_CATEGORY, changeCategory);
}

export default categoriesSaga;;