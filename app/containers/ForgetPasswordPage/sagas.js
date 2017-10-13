/**
 * Gets the repositories of the user from Github
 */

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {FORGET_PASSWORD} from './constants';
import {forgetPasswordSuccess, forgetPasswordError} from './actions';

import HttpRequest from '../../utils/HttpRequest';

import {makeSelectEmail} from './selectors';



function fetchForgetPassword (email) {
  return new HttpRequest().post('/forgotPassword', {email: email})
}

export function* forgetPassword () {
  const email = yield select(makeSelectEmail());
  try {
    const response = yield call(fetchForgetPassword, email);
    yield put(forgetPasswordSuccess(response))
  } catch (err) {
    yield put(forgetPasswordError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onForgetPasswordRequest () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(FORGET_PASSWORD, forgetPassword);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onForgetPasswordRequest
];


