import { LocationManagementState, LocationManagementActions, ILocation } from './types';
import ActionTypes from './constants';

// The initial state of the Location
export const initialState: LocationManagementState = {
  loading: false,
  error: '',
  locations: [],
  location: {} as ILocation
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function locationReducer(
  state: LocationManagementState = initialState,
  action: LocationManagementActions
): LocationManagementState {
  switch (action.type) {
    case ActionTypes.GET_LOCATION_LIST:
    case ActionTypes.ADD_LOCATION:
    case ActionTypes.UPDATE_LOCATION:
    case ActionTypes.DELETE_LOCATION:
    case ActionTypes.GET_LOCATION:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_LOCATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
        error: ''
      };
    case ActionTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        location: action.payload,
        error: ''
      };
    case ActionTypes.ADD_LOCATION_SUCCESS:
    case ActionTypes.UPDATE_LOCATION_SUCCESS:
    case ActionTypes.DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case ActionTypes.GET_LOCATION_LIST_FAILED:
    case ActionTypes.ADD_LOCATION_FAILED:
    case ActionTypes.UPDATE_LOCATION_FAILED:
    case ActionTypes.DELETE_LOCATION_FAILED:
    case ActionTypes.GET_LOCATION_FAILED:
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

export default locationReducer;
