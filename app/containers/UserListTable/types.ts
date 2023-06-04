import { IUser } from 'pages/UserManagement/types';

export interface UserListTableProps {
  data: IUser[];
  handleView: (id: number) => void;
  totalPages: number;
  handlePagination: (page: number) => void;
  currentPage: number;
}
