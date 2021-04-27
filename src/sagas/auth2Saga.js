import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';
// import url from 'url';
// import { AUTH_SERVER_URL } from '../config';

export function* signin({username, password}) {
  const js = JSON.stringify(username); const js2 = JSON.stringify(password);
  // const uri = `http://localhost:5001/cmptrmv/${js}/cp/3`;


  const uri = `http://localhost:5001/login/${js}/cp/${js2}`;
  const config = {
    username: username,
    password: password,
    token: 'dummy'
  };

  // const config = {
  //   method: 'POST',
  //   headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  //   body: `grant_type=password&username=${username}&password=${password}&client_id=Redux`
  // };
  // const uri = url.resolve(AUTH_SERVER_URL, '/sessions/create');

  try {
    yield call(callApi, () => fetch(uri, config), [types.SIGNIN_REQUEST_SUCCESS, types.SIGNIN_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Login Error:', error.message, 'danger'));
  }
}

export function* watchSignin() {
  yield* takeLatest(types.SIGNIN_REQUEST, signin);
}
