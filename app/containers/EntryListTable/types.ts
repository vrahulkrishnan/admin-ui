import { IEntriesList } from 'pages/EntriesManagement/types';

export interface EntryListTableProps {
  data: IEntriesList;
  handleView: (id: number) => void;
  handlePagination: (page: number) => void;
}
