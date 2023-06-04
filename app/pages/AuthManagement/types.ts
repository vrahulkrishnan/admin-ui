import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface AuthPageProps {
  readonly location?: any;
  readonly section?: 'login' | 'fp';
}

/* --- STATE --- */

interface AuthState {
  readonly loading: boolean;
  readonly error: string;
  readonly response: string;
  readonly userId: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type AuthManagementProps = AuthPageProps;
type AuthManagementState = AuthState;
type AuthManagementActions = AppActions;

export { RootState, AuthManagementProps, AuthManagementState, AuthManagementActions };
