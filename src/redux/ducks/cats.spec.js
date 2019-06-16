import catsReducer,
  { initialState, actions }
from './cats';

describe('Categories reducer', () => {
  const {
    FETCH_CATS,
    FETCH_CATS_SUCCESS,
    FETCH_CATS_ERROR,
    CLEAR_CATS,
  } = actions;

  it('should set cats loading', () => {
    expect(catsReducer(undefined, {
      type: FETCH_CATS,
    })).toEqual({
      ...initialState,
      isLoadingCats: true,
    });
  });

  it('should set cats upon success', () => {
    const payload = [{ id: 1 }, { id: 2 }];
    expect(catsReducer(undefined, {
      type: FETCH_CATS_SUCCESS,
      payload,
    })).toEqual({
      ...initialState,
      cats: payload,
    });
  });

  it('should not add repeated cats to state', () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const state = {
      ...initialState,
      cats: [{ id: 1 }]
    };
    expect(catsReducer(state, {
      type: FETCH_CATS_SUCCESS,
      payload,
    })).toEqual({
      ...initialState,
      cats: payload,
    });
  });

  it('should set error', () => {
    expect(catsReducer(undefined, {
      type: FETCH_CATS_ERROR,
    })).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should clear cats', () => {
    expect(catsReducer(undefined, {
      type: CLEAR_CATS,
      payload: 'payload',
    })).toEqual({
      ...initialState
    });
  });

  it('default call', () => {
    expect(catsReducer(undefined, {
      type: 'UNKNOWN_TYPE',
      payload: 'payload',
    })).toEqual({
      ...initialState,
    });
  });
});
