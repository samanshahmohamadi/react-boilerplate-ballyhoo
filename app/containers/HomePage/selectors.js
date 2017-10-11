/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectEmail = () => createSelector(
  selectHome,
  (homeState) => homeState.get('email')
);

const makeSelectPassword = () => createSelector(
  selectHome,
  (homeState) => homeState.get('password')
);

const makeSelectUser = () => createSelector(
  selectHome,
  (homeState) => homeState.get('currentUser')
);

const makeSelectCreateTnxParams = () => createSelector(
  selectHome,
  (homeState) => homeState.get('createTnxParams')
);

const makeSelectFileError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('error')
);

const makeSelectLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSelectCreateTnxSuccess = () => createSelector(
  selectHome,
  (homeState) => homeState.get('success')
);

export {
  selectHome,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectUser,
  makeSelectCreateTnxParams,
  makeSelectFileError,
  makeSelectLoading,
  makeSelectCreateTnxSuccess
};
