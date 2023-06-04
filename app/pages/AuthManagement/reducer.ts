import { AuthManagementState, AuthManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Auth
export const initialState: AuthManagementState = {
  loading: false,
  error: '',
  response: '',
  userId: ''
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function authReducer(state: AuthManagementState = initialState, action: AuthManagementActions): AuthManagementState {
  switch (action.type) {
    case ActionTypes.LOGIN:
    case ActionTypes.RESET_USER_PASSWORD:
    case ActionTypes.FORGOT_LOGIN_PASSWORD:
    case ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.RESET_USER_PASSWORD_SUCCESS:
    case ActionTypes.FORGOT_LOGIN_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: ''
      };
    case ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload,
        error: ''
      };
    case ActionTypes.LOGIN_FAILED:
    case ActionTypes.RESET_USER_PASSWORD_FAILED:
    case ActionTypes.FORGOT_LOGIN_PASSWORD_FAILED:
    case ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY_FAILED:
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

export default authReducer;
