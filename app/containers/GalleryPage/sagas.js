/**
 * Gets the repositories of the user from Github
 */

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {GET_GALLERY, GET_GALLERY_SUCCESS, GET_GALLERY_ERROR, DOWNLOAD_FILE} from './constants';
import {getGallerySuccess, getGalleryError, downloadFileSuccess, downloadFileError} from './actions';

import request from 'utils/request';
import HttpRequest from '../../utils/HttpRequest';
import {sha256} from '../../utils/crypto';

import {makeSelectCurrentUser} from 'containers/App/selectors';
import {makeSelectMediaId} from './selectors'


import {push} from 'react-router-redux';

function fetchGetGallery(token) {
  return new HttpRequest().post('/listUserTransactions', {token: token})
}

export function* getGallery() {
  const user = yield select(makeSelectCurrentUser());
  // const password = yield select(makeSelectPassword());
  // let params = {email: email, passwordHash: sha256(password), platform: 'web'}
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(fetchGetGallery, user.token);
    // yield put(reposLoaded(repos, username));
    yield put(getGallerySuccess(response))
  } catch (err) {
    yield put(getGalleryError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onGetGallery() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(GET_GALLERY, getGallery);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function fetchDownloadFile(params) {
  window.open("http://localhost:8080"+ '/downloadTnxFile/' + params.token + '&' + params.mediaId)
  // return new HttpRequest().get('/downloadTnxFile/' + params.token + '&' + params.mediaId, {})
}

export function* downloadFile() {
  const user = yield select(makeSelectCurrentUser())
  const mediaId = yield select(makeSelectMediaId())
  // let params = {email: email, passwordHash: sha256(password), platform: 'web'}
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(fetchDownloadFile, {token: user.token, mediaId: mediaId});
    // yield put(reposLoaded(repos, username));
    yield put(downloadFileSuccess(response))
  } catch (err) {
    yield put(downloadFileError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onDownloadFile() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(DOWNLOAD_FILE, downloadFile);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// Bootstrap sagas
export default [
  onGetGallery,
  onDownloadFile
];
