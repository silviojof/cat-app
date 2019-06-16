import React from 'react';
import { fireEvent } from '@testing-library/react';
import { initialState, actions } from 'redux/ducks/categories';
import { renderWithProvider, mockStore } from 'testUtils';
import Sidebar from './Sidebar';

it('isLoading', () => {
  const initialStateStore = mockStore({
    categories: {
      ...initialState,
    }
  });

  const { container } = renderWithProvider({
    store: initialStateStore,
    component: (
        <Sidebar />
    )
  });

  const dispatchedActions = initialStateStore.getActions();
  const loader = container.querySelector('.spinner');
  expect(dispatchedActions.some(el => el.type === actions.FETCH_CATEGORIES))
    .toBeTruthy();
  expect(loader).toBeInTheDocument();
});

it('display categories', () => {
  const initialStateStore = mockStore({
    categories: {
      ...initialState,
      isLoadingCategories: false,
      categories: [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
      ],
      active: { id: 1, name: 'one'}
    }
  });
  const { container, queryAllByTestId } = renderWithProvider({
    store: initialStateStore,
    component: (
        <Sidebar />
    )
  });
  const sidebar = container.querySelector('.sidebar');
  const categoriesFromState = initialStateStore.getState().categories.categories;
  const categoryItems = queryAllByTestId('category-item');
  const active = container.querySelector('.active');
  expect(sidebar).toBeInTheDocument();
  expect(active).toBeInTheDocument();
  expect(categoriesFromState.length).toBe(categoryItems.length);
});

it('change category on Click', () => {
  const initialStateStore = mockStore({
    categories: {
      ...initialState,
      isLoadingCategories: false,
      categories: [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
      ],
      active: { id: 1, name: 'one'}
    }
  });
  const { getByText } = renderWithProvider({
    store: initialStateStore,
    component: (
        <Sidebar />
    )
  });
  fireEvent.click(getByText('two'));
  const dispatchedActions = initialStateStore.getActions();
  expect(dispatchedActions.some(el => el.type === actions.CHANGE_CATEGORY))
    .toBeTruthy();
});
