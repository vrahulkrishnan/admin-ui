import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface DasboardProps {
  readonly location?: any;
}

/* --- STATE --- */

interface DasboardState {
  readonly loading: boolean;
  readonly error: string;
  readonly data: any;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DashboardManagementProps = DasboardProps;
type DashboardManagementState = DasboardState;
type DashboardManagementActions = AppActions;

export { RootState, DashboardManagementProps, DashboardManagementState, DashboardManagementActions };
