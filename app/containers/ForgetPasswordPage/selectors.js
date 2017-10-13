/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectForgetPassword = (state) => state.get('forgetPassword');

const makeSelectEmail = () => createSelector(
  selectForgetPassword,
  (forgetPasswordState) => forgetPasswordState.get('email')
);

const makeSelectError = () => createSelector(
  selectForgetPassword,
  (forgetPasswordState) => forgetPasswordState.get('error')
);

const makeSelectLoading = () => createSelector(
  selectForgetPassword,
  (forgetPasswordState) => forgetPasswordState.get('loading')
);

const makeSelectSuccess = () => createSelector(
  selectForgetPassword,
  (forgetPasswordState) => forgetPasswordState.get('success')
);

export {
  makeSelectEmail,
  makeSelectSuccess,
  makeSelectError,
  makeSelectLoading,
};
