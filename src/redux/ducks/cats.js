export const actions = {
  FETCH_CATS: 'FETCH_CATS',
  FETCH_CATS_SUCCESS: 'FETCH_CATS_SUCCESS',
  FETCH_CATS_ERROR: 'FETCH_CATS_ERROR',
  CLEAR_CATS: 'CLEAR_DETAIL',
};
const initialState = {
  isLoadingCats: false,
  cats: [],
  error: false
};

// ActionCreators

export const fetchCats = payload => ({
  type: actions.FETCH_CATS,
  payload
});

export const fetchCatsSuccess = payload => ({
  type: actions.FETCH_CATS_SUCCESS,
  payload
});

export const fetchCatsError = ({ payload }) => ({
  type: actions.FETCH_CATS_ERROR,
  payload
});

export const clearCats = () => ({
  type: actions.CLEAR_CATS
});

const catsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CATS: {
      return { ...state, isLoadingCats: true };
    }
    case actions.FETCH_CATS_SUCCESS: {
      const filteredCats = action.payload.filter(el => {
        return !state.cats.some(cat => cat.id === el.id);
      });
      return {
        ...state,
        isLoadingCats: false,
        cats: [ ...state.cats, ...filteredCats ],
      };
    }
    case actions.FETCH_CATS_ERROR: {
      return { ...state, isLoadingCats: false, error: true };
    }
    case actions.CLEAR_CATS: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default catsReducer;