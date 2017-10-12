/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CREATE_TNX,
  CREATE_TNX_ERROR,
  CREATE_TNX_SUCCESS,
  SELECT_FILE_ERROR,
  CLEAR_SELECT_FILE_ERROR,
  CLEAR_LOADING
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function signIn() {
  return {
    type: SIGN_IN,
  };
}

export function signInSuccess(response) {
  return {
    type: SIGN_IN_SUCCESS,
    response
  };
}

export function signInError(err) {
  return {
    type: SIGN_IN_ERROR,
    err
  };
}


export function createTnx() {
  return {
    type: CREATE_TNX
  };
}

export function createTnxSuccess() {
  return {
    type: CREATE_TNX_SUCCESS
  };
}

export function createTnxError(err) {
  return {
    type: CREATE_TNX_ERROR,
    err
  };
}

export function selectFileError(err) {
  return {
    type: SELECT_FILE_ERROR,
    err
  };
}

export function clearSelectFileError() {
  return {
    type: CLEAR_SELECT_FILE_ERROR
  };
}

export function clearLoading() {
  return {
    type: CLEAR_LOADING
  };
}


