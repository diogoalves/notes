import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducer, { initialState } from './reducers';
import sagas from './sagas';
import registerServiceWorker from './registerServiceWorker';
import PouchDB from 'pouchdb';
import Hoodie from '@hoodie/client';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const hoodie = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: PouchDB
});

// hoodie event bindings
hoodie.connectionStatus.on('disconnect', () => store.dispatch({}));
hoodie.connectionStatus.on('reconnect', () => store.dispatch({}));
hoodie.connectionStatus.startChecking({ interval: 1000 });
//hoodie.store.on('change', renderItems)
//hoodie.store.on('pull', renderItems)
//hoodie.store.add({name})

// function renderItems () {
//   hoodie.store.findAll().then(docs => {
//     $list.innerHTML = ''
//     docs.forEach((doc) => {
//       const $item = document.createElement('li')
//       $item.textContent = doc.name
//       $list.appendChild($item)
//       $input.value = ''
//     })
//   })
// }

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
