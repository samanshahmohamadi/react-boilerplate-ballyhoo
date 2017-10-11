/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectGallery = (state) => state.get('gallery');

const makeSelectError = () => createSelector(
  selectGallery,
  (galleryState) => galleryState.get('error')
);

const makeSelectLoading = () => createSelector(
  selectGallery,
  (galleryState) => galleryState.get('loading')
);

const makeSelectGallery = () => createSelector(
  selectGallery,
  (galleryState) => galleryState.get('gallery')
);

const makeSelectMediaId = () => createSelector(
  selectGallery,
  (galleryState) => galleryState.get('mediaId')
);

export {
  selectGallery,
  makeSelectError,
  makeSelectLoading,
  makeSelectGallery,
  makeSelectMediaId
};
