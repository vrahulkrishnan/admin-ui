import { RestaurantManagementState, RestaurantManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Restaurant
export const initialState: RestaurantManagementState = {
  loading: false,
  error: '',
  restaurants: [],
  restaurant: {} as RestaurantManagementState['restaurant'],
  locations: []
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function restaurantReducer(
  state: RestaurantManagementState = initialState,
  action: RestaurantManagementActions
): RestaurantManagementState {
  switch (action.type) {
    case ActionTypes.GET_RESTAURANT_LIST:
    case ActionTypes.ADD_RESTAURANT:
    case ActionTypes.UPDATE_RESTAURANT:
    case ActionTypes.DELETE_RESTAURANT:
    case ActionTypes.GET_RESTAURANT:
    case ActionTypes.GET_ALL_LOCATIONS:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_RESTAURANT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
        error: ''
      };
    case ActionTypes.GET_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
        error: ''
      };
    case ActionTypes.GET_ALL_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
        error: ''
      };
    case ActionTypes.ADD_RESTAURANT_SUCCESS:
    case ActionTypes.UPDATE_RESTAURANT_SUCCESS:
    case ActionTypes.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case ActionTypes.GET_RESTAURANT_LIST_FAILED:
    case ActionTypes.ADD_RESTAURANT_FAILED:
    case ActionTypes.UPDATE_RESTAURANT_FAILED:
    case ActionTypes.DELETE_RESTAURANT_FAILED:
    case ActionTypes.GET_RESTAURANT_FAILED:
    case ActionTypes.GET_ALL_LOCATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ActionTypes.RESET_REDUX:
      return {
        ...state,
        ...action.payload.reduce((acc, key) => ({ ...acc, [key]: initialState[key] }), {})
      };
    default:
      return state;
  }
}

export default restaurantReducer;
