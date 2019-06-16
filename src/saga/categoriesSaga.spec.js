import {
  getHasAction,
  getSetupSaga,
} from '../testUtils';
import {
  fecthCategories,
  fetchCats
} from '../api';
import { actions } from 'redux/ducks/categories';
import { actions as catActions } from 'redux/ducks/cats';
import {
  fetchCategoriesAsync,
  changeCategory,
} from './categoriesSaga';

jest.mock('../api', () => ({
  fecthCategories: jest.fn(),
  fetchCats: jest.fn()
}));

let dispatched;
let hasAction;
let setupSaga;
const error = 'error string';

describe('fetchCategoriesAsync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dispatched = [];
    hasAction = getHasAction(dispatched);
    setupSaga = getSetupSaga(dispatched);
  });
  it('fetchCategoriesAsync saga sucessfully', async () => {
    await setupSaga(
      fetchCategoriesAsync,
      [{ resolve: true, api: fecthCategories, response: [{ id: 1 }] }],
    );
    expect(fecthCategories).toHaveBeenCalled();
    expect(hasAction(actions.FETCH_CATEGORIES_SUCCESS)).toBeTruthy();
    expect(hasAction(catActions.FETCH_CATS)).toBeTruthy();
  });
  it('fetchCategoriesAsync saga with error', async () => {
    await setupSaga(
      fetchCategoriesAsync,
      [{ resolve: false, api: fecthCategories, response: new Error(error) }],
    );
    expect(fecthCategories).toHaveBeenCalled();
    expect(hasAction(actions.FETCH_CATEGORIES_ERROR)).toBeTruthy();
    expect(hasAction(catActions.FETCH_CATS)).toBeFalsy();
  });
});

describe('changeCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dispatched = [];
    hasAction = getHasAction(dispatched);
    setupSaga = getSetupSaga(dispatched);
  });
  it('changeCategory saga sucessfully', async () => {
    const data = {
      payload: { id: 1, name: 'one' }
    };
    await setupSaga(
      changeCategory,
      [{ resolve: true, api: fetchCats, response: {} }],
      data,
    );
    expect(hasAction(actions.SET_ACTIVE_CATEGORY)).toBeTruthy();
    expect(hasAction(catActions.CLEAR_CATS)).toBeTruthy();
    expect(hasAction(catActions.FETCH_CATS)).toBeTruthy();
  });
  it('changeCategory saga with error', async () => {
    await setupSaga(
      changeCategory,
      [{ resolve: false, api: fetchCats, response: {} }],
    );
    expect(hasAction(actions.FETCH_CATEGORIES_ERROR)).toBeTruthy();
  });
});