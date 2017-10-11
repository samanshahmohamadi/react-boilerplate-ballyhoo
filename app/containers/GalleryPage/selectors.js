/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectSignUp = (state) => state.get('signup');

const makeSelectEmail = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('email')
);

const makeSelectError = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('error')
);

const makeSelectSignupParams = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('params')
);

const makeSelectLoading = () => createSelector(
  selectSignUp,
  (signUpState) => signUpState.get('loading')
);

export {
  selectSignUp,
  makeSelectEmail,
  makeSelectError,
  makeSelectSignupParams,
  makeSelectLoading
};
