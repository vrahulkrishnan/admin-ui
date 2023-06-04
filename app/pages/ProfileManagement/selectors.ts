/**
 * The Profile state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectUser = (state: ApplicationRootState) => state.profile || initialState;

const makeSelectLoading = () => createSelector(selectUser, profileState => profileState.loading);
const makeSelectError = () => createSelector(selectUser, profileState => profileState.error);
const makeSelectProfileDetails = () => createSelector(selectUser, profileState => profileState.profileDetails);
const makeSelectResponse = () => createSelector(selectUser, profileState => profileState.response);
const makeSelectPasswordUpdateResponse = () =>
  createSelector(selectUser, profileState => profileState.passwordUpdateResponse);

export {
  selectUser,
  makeSelectError,
  makeSelectLoading,
  makeSelectProfileDetails,
  makeSelectResponse,
  makeSelectPasswordUpdateResponse
};
