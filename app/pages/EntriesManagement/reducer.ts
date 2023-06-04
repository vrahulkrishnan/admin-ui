import { EntriesManagementState, EntriesManagementActions, IEntriesList } from './types';
import ActionTypes from './constants';

// The initial state of the Entries
export const initialState: EntriesManagementState = {
  loading: false,
  error: '',
  entryList: {} as IEntriesList,
  exitModal: false
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function userReducer(
  state: EntriesManagementState = initialState,
  action: EntriesManagementActions
): EntriesManagementState {
  switch (action.type) {
    case ActionTypes.POST_ENTRY_FEEDBACK:
    case ActionTypes.GET_ENTRY_LIST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_ENTRY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        entryList: action.payload,
        error: ''
      };
    case ActionTypes.POST_ENTRY_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        exitModal: action.payload,
        error: ''
      };
    case ActionTypes.POST_ENTRY_FEEDBACK_FAILED:
    case ActionTypes.GET_ENTRY_LIST_FAILED:
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
