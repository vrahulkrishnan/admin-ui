import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface ProfilePageProps {
  readonly location?: any;
}

/* --- STATE --- */

interface ProfileState {
  readonly loading: boolean;
  readonly error: string;
  readonly response: string;
  readonly profileDetails: IProfile;
  readonly passwordUpdateResponse: string;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  emailId: string;
  image?: { imageUrl: string; serverFileName: string };
  phone?: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ProfileManagementProps = ProfilePageProps;
type ProfileManagementState = ProfileState;
type ProfileManagementActions = AppActions;

export { RootState, ProfileManagementProps, ProfileManagementState, ProfileManagementActions };
