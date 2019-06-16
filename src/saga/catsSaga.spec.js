import {
  getHasAction,
  getSetupSaga,
} from '../testUtils';
import {
  fetchCats
} from '../api';
import { actions } from 'redux/ducks/cats';
import {
  fetchCatsAsync
} from './catsSaga';

jest.mock('../api', () => ({
  fetchCats: jest.fn()
}));

let dispatched;
let hasAction;
let setupSaga;
const error = 'error string';

describe('fetchCatsAsync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dispatched = [];
    hasAction = getHasAction(dispatched);
    setupSaga = getSetupSaga(dispatched);
  });
  it('fetchCatsAsync saga sucessfully', async () => {
    await setupSaga(
      fetchCatsAsync,
      [{ resolve: true, api: fetchCats, response: [{ id: 1 }] }],
    );
    expect(fetchCats).toHaveBeenCalled();
    expect(hasAction(actions.FETCH_CATS_SUCCESS)).toBeTruthy();
  });
  it('fetchCatsAsync saga with error', async () => {
    await setupSaga(
      fetchCatsAsync,
      [{ resolve: false, api: fetchCats, response: new Error(error) }],
    );
    expect(fetchCats).toHaveBeenCalled();
    expect(hasAction(actions.FETCH_CATS_ERROR)).toBeTruthy();
  });
});
