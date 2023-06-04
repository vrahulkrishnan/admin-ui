/**
 * The app state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

import { initialState } from './reducer';

const selectApp = (state: ApplicationRootState) => state.app || initialState;

const makeSelectLoading = () => createSelector(selectApp, substate => substate.loading);
const makeSelectData = () => createSelector(selectApp, substate => substate.data);
const makeSelectStatusMessage = () => createSelector(selectApp, substate => substate.status);
const makeSelectShowStatus = () => createSelector(selectApp, substate => substate.showStatus);

export { makeSelectLoading, makeSelectData, makeSelectStatusMessage, makeSelectShowStatus };
