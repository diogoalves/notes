import { takeEvery } from 'redux-saga/effects';

function save(hoodie, action) {
  return null;
}

function* saga(hoodie) {
  yield takeEvery('SAVE', save, hoodie);
}

export default saga;
