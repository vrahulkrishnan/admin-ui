import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface EntriesPageProps {
  readonly location?: any;
}

export interface EntryModalProps {
  data: IEntries;
  onAction: (type: 'rejected' | 'approved', id: string) => void;
  opened: boolean;
  onClose: () => void;
}
/* --- STATE --- */

interface EntriesState {
  readonly loading: boolean;
  readonly error: string;
  readonly entryList: IEntriesList;
  readonly exitModal: boolean;
}

interface IEntries {
  id: number;
  status: string;
  createdAt: Date;
  activity: IActivity;
  user: IUser;
  image: { imageUrl: string };
}

interface IActivity {
  title: string;
  restaurant: { name: string };
}
interface IUser {
  emailId: string;
  firstName: string;
  lastName: string;
}

export interface IEntriesList {
  totalItems: number;
  data: IEntries[];
  totalPages: number;
  currentPage: number;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type EntriesManagementProps = EntriesPageProps;
type EntriesManagementState = EntriesState;
type EntriesManagementActions = AppActions;

export { RootState, EntriesManagementProps, EntriesManagementState, EntriesManagementActions };
