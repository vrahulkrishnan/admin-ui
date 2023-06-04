/**
 * The User state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectEntry = (state: ApplicationRootState) => state.entry || initialState;

const makeSelectLoading = () => createSelector(selectEntry, entryState => entryState.loading);
const makeSelectError = () => createSelector(selectEntry, entryState => entryState.error);
const makeSelectEntries = () => createSelector(selectEntry, entryState => entryState.entryList);
const makeSelectExitModal = () => createSelector(selectEntry, entryState => entryState.exitModal);

export { selectEntry, makeSelectError, makeSelectLoading, makeSelectEntries, makeSelectExitModal };
