/**
 * The Dasboard state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectEntry = (state: ApplicationRootState) => state.dashboard || initialState;

const makeSelectLoading = () => createSelector(selectEntry, entryState => entryState.loading);
const makeSelectError = () => createSelector(selectEntry, entryState => entryState.error);
const makeSelectData = () => createSelector(selectEntry, entryState => entryState.data);

export { selectEntry, makeSelectError, makeSelectLoading, makeSelectData };
