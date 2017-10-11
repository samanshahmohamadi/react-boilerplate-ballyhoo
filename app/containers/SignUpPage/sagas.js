/**
 * Gets the repositories of the user from Github
 */

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {SIGN_UP} from './constants';
import {singUpError, singUpSuccess} from './actions';

import request from 'utils/request';
import HttpRequest from '../../utils/HttpRequest';
import {sha256} from '../../utils/crypto';

import {makeSelectSignupParams} from './selectors';

import { push } from 'react-router-redux';

function fetchSignUp (params) {
  params.passwordHash = sha256(params.password)
  params.confirmPasswordHash = sha256(params.confirmPassword)
  params.platform = 'web'
  delete params.password
  delete params.confirmPassword
  return new HttpRequest().post('/signup', params)
}

export function* signUp () {
  // const email = yield select(makeSelectEmail());
  // const password = yield select(makeSelectPassword());
  // let params = {email: email, passwordHash: sha256(password), platform: 'web'}
  let params = yield select(makeSelectSignupParams())
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(fetchSignUp, params);
    // yield put(reposLoaded(repos, username));
    console.log("RESPONSE", response)
    yield put(singUpSuccess(response))
    yi
  } catch (err) {
    yield put(singUpError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onSignUpRequest () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SIGN_UP, signUp);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onSignUpRequest
];
