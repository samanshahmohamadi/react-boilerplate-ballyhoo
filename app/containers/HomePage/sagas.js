/**
 * Gets the repositories of the user from Github
 */

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {LOAD_REPOS} from 'containers/App/constants';
import {SIGN_IN, CREATE_TNX} from './constants';
import {reposLoaded, repoLoadingError} from 'containers/App/actions';
import {signInSuccess, signInError, createTnxSuccess, createTnxError} from './actions';

import request from 'utils/request';
import HttpRequest from '../../utils/HttpRequest';
import {sha256} from '../../utils/crypto';

import {makeSelectEmail, makeSelectPassword, makeSelectCreateTnxParams} from './selectors';



function fetchSignIn (params) {
  return new HttpRequest().post('/login', params)
}

export function* signIn () {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  let params = {email: email, passwordHash: sha256(password), platform: 'BALLYHOO'}
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(fetchSignIn, params);
    // yield put(reposLoaded(repos, username));
    yield put(signInSuccess(response))
  } catch (err) {
    yield put(signInError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onSignInRequest () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(SIGN_IN, signIn);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function fetchCreateTnx (params) {
  // console.log(">>>>>>>>>>>>>>>>>>>>>>")
  // console.log("***********",params)
  // return new HttpRequest().postFile('/createTnx', params)
}

export function* createTnx () {
  // let params = yield select(makeSelectCreateTnxParams())
  try {
    // Call our request helper (see 'utils/request')
    // const response = yield call(fetchCreateTnx, params);
    // yield put(reposLoaded(repos, username));
    // yield put(createTnxSuccess(response))
  } catch (err) {
    // yield put(createTnxError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onCreateTnxRequest () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(CREATE_TNX, createTnx);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onSignInRequest,
  onCreateTnxRequest
];


