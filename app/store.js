/**
 * Create the store with asynchronously loaded reducers
 */

import {createStore, applyMiddleware, compose} from 'redux';
import {fromJS} from 'immutable';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import {persistStore, autoRehydrate} from 'redux-persist-immutable'
import { asyncLocalStorage } from 'redux-persist/storages';


const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate()
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  return new Promise((resolve, reject) => {
    const store = createStore(
      createReducer(),
      fromJS(initialState),
      composeEnhancers(...enhancers)
    );


    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry


    store.asyncSagas = new Map(); // Async saga registry to avoid multiple executions of the same saga


    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        import('./reducers').then((reducerModule) => {
          const createReducers = reducerModule.default;
          const nextReducers = createReducers(store.asyncReducers);

          store.replaceReducer(nextReducers);
        });
      });
    }
    // persistStore(store)
    persistStore(store, {whitelist:'global',blacklist: ['route']})
    persistStore(
      store,
      { storage: asyncLocalStorage },
      () => resolve(store)
    );
    // resolve(store)

  })




  // return store;
}
