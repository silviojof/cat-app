import categoriesReducer,
  { initialState, actions }
from './categories';

describe('Categories reducer', () => {
  const {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
    SET_ACTIVE_CATEGORY,
  } = actions;

  it('should set categories loading', () => {
    expect(categoriesReducer(undefined, {
      type: FETCH_CATEGORIES,
    })).toEqual({
      ...initialState,
      isLoadingCategories: true,
    });
  });

  it('should set categories upon success', () => {
    const payload = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }];
    expect(categoriesReducer(undefined, {
      type: FETCH_CATEGORIES_SUCCESS,
      payload,
    })).toEqual({
      ...initialState,
      categories: payload,
      active: payload[0]
    });
  });

  it('should set error', () => {
    expect(categoriesReducer(undefined, {
      type: FETCH_CATEGORIES_ERROR,
    })).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should set active category', () => {
    expect(categoriesReducer(undefined, {
      type: SET_ACTIVE_CATEGORY,
      payload: 'payload',
    })).toEqual({
      ...initialState,
      active: 'payload',
    });
  });

  it('default call', () => {
    expect(categoriesReducer(undefined, {
      type: 'UNKNOWN_TYPE',
      payload: 'payload',
    })).toEqual({
      ...initialState,
    });
  });
});
