import { takeLatest } from 'redux-saga/effects';

const signIn = (hoodie, action) => {
  hoodie.account
    .signIn(action.payload)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const signOut = hoodie => {
  hoodie.account
    .signOut()
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const signUp = (hoodie, action) => {
  hoodie.account
    .signUp(action.payload)
    .then(() => hoodie.account.signIn(action.payload))
    .catch(err => console.log(err));
};

function* saga(hoodie) {
  yield takeLatest('ACCOUNT_SIGNIN', signIn, hoodie);
  yield takeLatest('ACCOUNT_SIGNOUT', signOut, hoodie);
  yield takeLatest('ACCOUNT_SIGNUP', signUp, hoodie);
}

export default saga;
