/**
 * The auth state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectAuth = (state: ApplicationRootState) => state.auth || initialState;

const makeSelectLoading = () => createSelector(selectAuth, authState => authState.loading);
const makeSelectError = () => createSelector(selectAuth, authState => authState.error);
const makeSelectResponse = () => createSelector(selectAuth, authState => authState.response);
const makeSelectUserId = () => createSelector(selectAuth, authState => authState.userId);

export { selectAuth, makeSelectError, makeSelectLoading, makeSelectResponse, makeSelectUserId };
