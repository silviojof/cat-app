import React from 'react';
import App from './App';
import { renderWithProvider, mockStore } from './testUtils';
import {
  initialState as categories
} from 'redux/ducks/categories';
import {
  initialState as cats,
} from 'redux/ducks/cats';

const initialStateStore = mockStore({ categories, cats });

describe('ContainersPage', () => {
  it('renders without crashing', () => {
    const { debug } = renderWithProvider({
      store: initialStateStore,
      component: (
        <App />
      )
    });
    // debug();
    expect(true).toBeTruthy();
  });
});

