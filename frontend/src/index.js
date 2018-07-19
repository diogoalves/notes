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
import actions from './actions';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const hoodie = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: PouchDB
});

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

// hoodie event bindings

const d = m => () => store.dispatch(actions.showNotification(m));

hoodie.connectionStatus.on('disconnect', d('disconnected'));
hoodie.connectionStatus.on('reconnect', d('reconnect'));
hoodie.connectionStatus.startChecking({ interval: 1000 });

['signin', 'signout', 'passwordreset', 'unauthenticate', 'update'].map(e =>
  hoodie.account.on(e, d(e))
);

hoodie.account.on('signup', result =>
  store.dispatch(actions.authSucessfulAccount(result.username))
);

hoodie.account.on('signin', result =>
  store.dispatch(actions.authSucessfulAccount(result.username))
);

hoodie.account.on('reauthenticate', result =>
  store.dispatch(actions.authSucessfulAccount(result.username))
);

// hoodie.store.on('change', () => store.dispatch(actions.pushNotification({content: "Something changed"})));
// hoodie.store.on('pull', () => store.dispatch(actions.pushNotification({content: "Something was pulled"})));
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
