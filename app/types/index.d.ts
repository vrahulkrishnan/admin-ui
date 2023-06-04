import { Reducer, Store } from 'redux';
import { Saga } from '@redux-saga/types';
import { RouterState } from 'connected-react-router';
import { AppManagementState as AppState } from 'pages/AppManagement/types';
import { AuthManagementState as AuthState } from 'pages/AuthManagement/types';
import { LocationManagementState as LocationState } from 'pages/LocationManagement/types';
import { RestaurantManagementState as RestaurantState } from 'pages/RestaurantManagement/types';
import { ActivityManagementState as ActivityState } from 'pages/ActivityManagement/types';
import { UserManagementState as UserState } from 'pages/UserManagement/types';
import { EntriesManagementState as EntryState } from 'pages/EntriesManagement/types';
import { ProfileManagementState as ProfileState } from 'pages/ProfileManagement/types';
import { DashboardManagementState as DasboardState } from 'pages/DashboardManagement/types';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga | (() => IterableIterator<any>) | undefined, args: any | undefined): any;
}
export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

export interface RequestSagaParams {
  type: string;
  payload: any;
  meta?: any;
  error?: any;
}

export interface DropdownOption {
  label: string;
  value: string;
}
export interface DropdownAPIOption {
  id: number;
  name: string;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly app: AppState;
  readonly auth: AuthState;
  readonly location: LocationState;
  readonly restaurant: RestaurantState;
  readonly activity: ActivityState;
  readonly user: UserState;
  readonly entry: EntryState;
  readonly profile: ProfileState;
  readonly dashboard: DasboardState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly

  // for testing purposes
  readonly test: any;
}

export declare interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export { InteractiveElementProps, NavigationElementProps, AnchorElementProps } from './interactive-element';
export { Omit } from './omit';

export interface ServerFileType {
  id: string;
  imageUrl: string;
  isMainImage: boolean;
  fileName: string;
  serverFileName: string;
}
