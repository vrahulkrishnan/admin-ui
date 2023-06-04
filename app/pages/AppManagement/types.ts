import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from '../../types';
import * as actions from './actions';

/* --- PROPS --- */

interface AppProps {
  readonly location?: { pathname?: string };
}

interface IStatusMessage {
  message: string;
  type?: ColorTypes;
}

type ColorTypes = 'info' | 'warning' | 'danger' | 'success';

/* --- STATE --- */
interface AppState {
  readonly loading: boolean;
  readonly data: any;
  readonly status: IStatusMessage;
  readonly showStatus: boolean;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type AppManagementProps = AppProps;
type AppManagementState = AppState;
type AppManagementActions = AppActions;

export { RootState, AppManagementProps, AppManagementState, AppManagementActions, IStatusMessage };
