import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, DropdownAPIOption, DropdownOption, ServerFileType } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface RestaurantPageProps {
  readonly location?: any;
}

/* --- STATE --- */

interface RestaurantState {
  readonly loading: boolean;
  readonly error: string;
  readonly restaurants: IRestaurant[];
  readonly restaurant: IRestaurant & { location: RestaurantFormTypes['location'] };
  readonly locations: DropdownOption[];
}

export interface IRestaurant {
  id: string;
  mainImage: ServerFileType;
  name: string;
  description: string;
  location: DropdownAPIOption;
  galleryImages: ServerFileType[];
}

export interface IRestaurantResponse {
  id: string;
  images: ServerFileType[];
  name: string;
  description: string;
  location: DropdownAPIOption;
}

export interface RestaurantFormTypes {
  id?: string;
  name: string;
  location: DropdownOption;
  description: string;
  mainImage: File | ServerFileType | null;
  galleryImages: Array<File | ServerFileType>;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type RestaurantManagementProps = RestaurantPageProps;
type RestaurantManagementState = RestaurantState;
type RestaurantManagementActions = AppActions;

export { RootState, RestaurantManagementProps, RestaurantManagementState, RestaurantManagementActions };
