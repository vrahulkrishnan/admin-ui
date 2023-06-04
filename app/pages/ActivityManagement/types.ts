import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, DropdownAPIOption, DropdownOption, ServerFileType } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface ActivityPageProps {
  readonly location?: any;
}

/* --- STATE --- */

interface ActivityState {
  readonly loading: boolean;
  readonly error: string;
  readonly activities: IActivity[];
  readonly activity: IActivity & { restaurant: DropdownOption };
  readonly restaurants: DropdownOption[];
}

export interface IActivity {
  id: string;
  mainImage: ServerFileType;
  title: string;
  description: string;
  restaurant: DropdownAPIOption;
  galleryImages: ServerFileType[];
}
export interface IActivityResponse {
  id: string;
  images: ServerFileType[];
  title: string;
  description: string;
  restaurant: DropdownAPIOption;
}

export interface ActivityFormTypes {
  id?: string;
  title: string;
  restaurant: DropdownOption;
  description: string;
  mainImage: File | ServerFileType | null;
  galleryImages: Array<File | ServerFileType>;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ActivityManagementProps = ActivityPageProps;
type ActivityManagementState = ActivityState;
type ActivityManagementActions = AppActions;

export { RootState, ActivityManagementProps, ActivityManagementState, ActivityManagementActions };
