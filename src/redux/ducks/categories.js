export const actions = {
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR: 'FETCH_CATEGORIES_ERROR',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
  CHANGE_CATEGORY: 'CHANGE_CATEGORY'
};

export const initialState = {
  isLoadingCategories: false,
  categories: [],
  error: false,
  active: null,
};

// ActionCreators

export const fetchCategories = payload => ({
  type: actions.FETCH_CATEGORIES,
  payload
});

export const fetchCategoriesSuccess = payload => ({
  type: actions.FETCH_CATEGORIES_SUCCESS,
  payload
});

export const fetchCategoriesError = ({ payload }) => ({
  type: actions.FETCH_CATEGORIES_ERROR,
  payload
});

export const setActiveCategory = payload => ({
  type: actions.SET_ACTIVE_CATEGORY,
  payload
});

export const changeCategory = payload => ({
  type: actions.CHANGE_CATEGORY,
  payload
});

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CATEGORIES: {
      return { ...state, isLoadingCategories: true };
    }
    case actions.FETCH_CATEGORIES_SUCCESS: {
      const active = (Array.isArray(action.payload) && action.payload.length > 1)
        ? action.payload[0] : [];
      return {
        ...state,
        isLoadingCategories: false,
        categories: action.payload,
        active,
      };
    }
    case actions.FETCH_CATEGORIES_ERROR: {
      return { ...state, isLoadingCategories: false, error: true };
    }
    case actions.SET_ACTIVE_CATEGORY: {
      return {
        ...state,
        active: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default categoriesReducer;