import { DashboardManagementState, DashboardManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Dashboard
export const initialState: DashboardManagementState = {
  loading: false,
  error: '',
  data: {}
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function dashboardReducer(
  state: DashboardManagementState = initialState,
  action: DashboardManagementActions
): DashboardManagementState {
  switch (action.type) {
    case ActionTypes.GET_DASHBOARD_DATA:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ''
      };

    case ActionTypes.GET_DASHBOARD_DATA_FAILED:
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

export default dashboardReducer;
