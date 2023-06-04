import { ActivityManagementState, ActivityManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Activity
export const initialState: ActivityManagementState = {
  loading: false,
  error: '',
  activities: [],
  activity: {} as ActivityManagementState['activity'],
  restaurants: []
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function activityReducer(
  state: ActivityManagementState = initialState,
  action: ActivityManagementActions
): ActivityManagementState {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITY_LIST:
    case ActionTypes.ADD_ACTIVITY:
    case ActionTypes.UPDATE_ACTIVITY:
    case ActionTypes.DELETE_ACTIVITY:
    case ActionTypes.GET_ACTIVITY:
    case ActionTypes.GET_RESTAURANT_LIST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.payload,
        error: ''
      };
    case ActionTypes.GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activity: action.payload,
        error: ''
      };
    case ActionTypes.GET_RESTAURANT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
        error: ''
      };
    case ActionTypes.ADD_ACTIVITY_SUCCESS:
    case ActionTypes.UPDATE_ACTIVITY_SUCCESS:
    case ActionTypes.DELETE_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case ActionTypes.GET_ACTIVITY_LIST_FAILED:
    case ActionTypes.ADD_ACTIVITY_FAILED:
    case ActionTypes.UPDATE_ACTIVITY_FAILED:
    case ActionTypes.GET_ACTIVITY_FAILED:
    case ActionTypes.DELETE_ACTIVITY_FAILED:
    case ActionTypes.GET_RESTAURANT_LIST_FAILED:
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

export default activityReducer;
