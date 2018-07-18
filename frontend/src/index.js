import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducer, { initialState } from './reducers';
import sagas from './sagas';
import registerServiceWorker from './registerServiceWorker';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const hoodie = null;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(sagas, hoodie);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
