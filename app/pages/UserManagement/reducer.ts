import { UserManagementState, UserManagementActions, IUser, IUserData } from './types';
import ActionTypes from './constants';

// The initial state of the User
export const initialState: UserManagementState = {
  loading: false,
  error: '',
  users: {} as IUserData,
  user: {} as IUser,
  activities: []
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function userReducer(state: UserManagementState = initialState, action: UserManagementActions): UserManagementState {
  switch (action.type) {
    case ActionTypes.GET_USER:
    case ActionTypes.GET_USER_LIST:
    case ActionTypes.GET_ACTIVITY_BY_USER:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: ''
      };
    case ActionTypes.GET_ACTIVITY_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.payload,
        error: ''
      };
    case ActionTypes.GET_USER_FAILED:
    case ActionTypes.GET_ACTIVITY_BY_USER_FAILED:
    case ActionTypes.GET_USER_LIST_FAILED:
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

export default userReducer;
