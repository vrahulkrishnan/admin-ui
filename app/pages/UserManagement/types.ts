import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface UserPageProps {
  readonly location?: any;
}

/* --- STATE --- */

interface UserState {
  readonly loading: boolean;
  readonly error: string;
  readonly users: IUserData;
  readonly user: IUser;
  readonly activities: IActivities[];
}

interface IActivities {
  status: string;
  createdAt: Date;
  activity: { title: string };
  image: { imageUrl: string };
}
interface IUserData {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  data: IUser[];
}

export interface IUser {
  lastName: string;
  id: number;
  firstName: string;
  emailId: string;
  isVerified: boolean;
  image?: { imageUrl: string };
  country?: string;
  city?: string;
  phone?: string;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type UserManagementProps = UserPageProps;
type UserManagementState = UserState;
type UserManagementActions = AppActions;

export { RootState, UserManagementProps, UserManagementState, UserManagementActions, IUserData };
