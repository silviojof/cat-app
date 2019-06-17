import React from 'react';
import { fireEvent } from '@testing-library/react';
import { initialState, actions } from 'redux/ducks/cats';
import { initialState as categoriesInitialState } from 'redux/ducks/categories';
import { renderWithProvider, mockStore } from 'testUtils';
import Main from './Main';

it('displays loader', () => {
  const initialStateStore = mockStore({
    cats: {
      ...initialState,
      cats: [],
      isLoadingCats: true,
    },
    categories: {
      ...categoriesInitialState,
    }
  });
  const { queryByTestId } = renderWithProvider({
    store: initialStateStore,
    component: (
      <Main />
    )
  });
  const pageSpinner = queryByTestId('page-spinner');
  expect(pageSpinner).toBeInTheDocument()
});

it('displays three cats', () => {
  const initialStateStore = mockStore({
    cats: {
      ...initialState,
      cats: [{ id: '1', url: 'url1' }, { id: '2', url: 'url2' }]
    },
    categories: {
      ...categoriesInitialState,
    }
  });
  const { container, queryAllByTestId } = renderWithProvider({
    store: initialStateStore,
    component: (
      <Main />
    )
  });
  const cats = initialStateStore.getState().cats.cats;
  const catsTilesOnPage = queryAllByTestId('tile');
  expect(cats.length).toBe(catsTilesOnPage.length);

  cats.forEach(el => {
    const img = container.querySelector(`img[src="${el.url}"]`);
    expect(img).toBeInTheDocument()
  })
});

it('change category on Click', () => {
  const initialStateStore = mockStore({
    cats: {
      ...initialState,
      cats: [{ id: '1', url: 'url1' }, { id: '2', url: 'url2' }]
    },
    categories: {
      ...categoriesInitialState,
      active: { id: 2, name: 'boxes' }
    }
  });
  const { getByText } = renderWithProvider({
    store: initialStateStore,
    component: (
        <Main />
    )
  });
  fireEvent.click(getByText('Load More'));
  const dispatchedActions = initialStateStore.getActions();
  expect(dispatchedActions.some(el => el.type === actions.FETCH_CATS))
    .toBeTruthy();
});

it('button is loading', () => {
  const initialStateStore = mockStore({
    cats: {
      ...initialState,
      isLoadingCats: true,
      cats: [{ id: '1', url: 'url1' }, { id: '2', url: 'url2' }]
    },
    categories: {
      ...categoriesInitialState,
      active: { id: 2, name: 'boxes' }
    }
  });
  const { container } = renderWithProvider({
    store: initialStateStore,
    component: (
        <Main />
    )
  });
  const buttonLoading = container.querySelector('.button').querySelector('.spinner');
  expect(buttonLoading).toBeInTheDocument()
});
