/**
 * The location state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectLocation = (state: ApplicationRootState) => state.location || initialState;

const makeSelectLoading = () => createSelector(selectLocation, locationState => locationState.loading);
const makeSelectError = () => createSelector(selectLocation, locationState => locationState.error);
const makeSelectLocations = () => createSelector(selectLocation, locationState => locationState.locations);
const makeSelectLocation = () => createSelector(selectLocation, locationState => locationState.location);

export { selectLocation, makeSelectError, makeSelectLoading, makeSelectLocations, makeSelectLocation };
