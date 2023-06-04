/**
 * The User state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectUser = (state: ApplicationRootState) => state.user || initialState;

const makeSelectLoading = () => createSelector(selectUser, userState => userState.loading);
const makeSelectError = () => createSelector(selectUser, userState => userState.error);
const makeSelectUsers = () => createSelector(selectUser, userState => userState.users);
const makeSelectUser = () => createSelector(selectUser, userState => userState.user);
const makeSelectActivities = () => createSelector(selectUser, userState => userState.activities);

export { selectUser, makeSelectError, makeSelectLoading, makeSelectUsers, makeSelectUser, makeSelectActivities };
