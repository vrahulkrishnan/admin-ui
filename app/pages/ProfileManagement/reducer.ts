import { ProfileManagementActions, ProfileManagementState, IProfile } from './types';
import ActionTypes from './constants';

// The initial state of the User
export const initialState: ProfileManagementState = {
  loading: false,
  error: '',
  response: '',
  passwordUpdateResponse: '',
  profileDetails: {} as IProfile
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function userReducer(
  state: ProfileManagementState = initialState,
  action: ProfileManagementActions
): ProfileManagementState {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_DETAILS:
    case ActionTypes.UPDATE_PASSWORD:
    case ActionTypes.UPDATE_PROFILE:
    case ActionTypes.UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
    case ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: ''
      };
    case ActionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordUpdateResponse: action.payload,
        error: ''
      };
    case ActionTypes.GET_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        profileDetails: action.payload,
        error: ''
      };
    case ActionTypes.GET_PROFILE_DETAILS_FAILED:
    case ActionTypes.UPDATE_PASSWORD_FAILED:
    case ActionTypes.UPDATE_PROFILE_IMAGE_FAILED:
    case ActionTypes.UPDATE_PROFILE_FAILED:
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
