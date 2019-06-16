import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { runSaga }  from 'redux-saga';
import configureStore from 'redux-mock-store';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

export const mockStore = configureStore(middlewares)

export const renderWithProvider = ({ store, component } = {}) => {
  return render(
    <Provider store={store}>
        {component}
    </Provider>
  )
};

export const getHasAction = (actions = []) => action => actions
  .some(item => item.type === action);

export const getSetupSaga = (actions = []) => async (saga, apiArray = [], payload = {}) => {
  apiArray.forEach((item) => {
    if (item.resolve) {
      item.api.mockImplementation(() => Promise.resolve(item.response));
    } else {
      item.api.mockImplementation(() => Promise.reject(item.response));
    }
  });
  await runSaga({
    dispatch: action => actions.push(action),
  }, saga, payload).done;
};

