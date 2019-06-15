import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './ducks';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
      window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);

const store = createStore(
    rootReducer,
    enhancer,
)

sagaMiddleware.run(rootSaga)

export default store;