/**
 * The restaurant state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectRestaurant = (state: ApplicationRootState) => state.restaurant || initialState;

const makeSelectLoading = () => createSelector(selectRestaurant, restaurantState => restaurantState.loading);
const makeSelectError = () => createSelector(selectRestaurant, restaurantState => restaurantState.error);
const makeSelectRestaurants = () => createSelector(selectRestaurant, restaurantState => restaurantState.restaurants);
const makeSelectRestaurant = () => createSelector(selectRestaurant, restaurantState => restaurantState.restaurant);
const makeSelectLocations = () => createSelector(selectRestaurant, restaurantState => restaurantState.locations);

export {
  selectRestaurant,
  makeSelectError,
  makeSelectLoading,
  makeSelectRestaurants,
  makeSelectRestaurant,
  makeSelectLocations
};
