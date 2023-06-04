import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, ServerFileType } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface LocationPageProps {
  readonly location?: any;
}

/* --- STATE --- */

interface LocationState {
  readonly loading: boolean;
  readonly error: string;
  readonly locations: ILocation[];
  readonly location: ILocation;
}

export interface ILocation {
  id: string;
  mainImage: ServerFileType;
  name: string;
  description: string;
  galleryImages: ServerFileType[];
}

export interface ILocationResponse {
  id: string;
  images: ServerFileType[];
  name: string;
  description: string;
}

export interface LocationFormTypes {
  id?: string;
  name: string;
  description: string;
  mainImage: File | ServerFileType | null;
  galleryImages: Array<File | ServerFileType>;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type LocationManagementProps = LocationPageProps;
type LocationManagementState = LocationState;
type LocationManagementActions = AppActions;

export { RootState, LocationManagementProps, LocationManagementState, LocationManagementActions };
