/**
 * The activity state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectActivity = (state: ApplicationRootState) => state.activity || initialState;

const makeSelectLoading = () => createSelector(selectActivity, activityState => activityState.loading);
const makeSelectError = () => createSelector(selectActivity, activityState => activityState.error);
const makeSelectActivities = () => createSelector(selectActivity, activityState => activityState.activities);
const makeSelectActivity = () => createSelector(selectActivity, activityState => activityState.activity);
const makeSelectRestaurants = () => createSelector(selectActivity, activityState => activityState.restaurants);

export {
  selectActivity,
  makeSelectError,
  makeSelectLoading,
  makeSelectActivities,
  makeSelectActivity,
  makeSelectRestaurants
};
