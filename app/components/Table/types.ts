import { TableProps } from 'react-data-table-component';

export declare type DataTableProps<C> = TableProps<C> & {
  page?: number;
  total?: number;
  onChange?: (page: number) => void;
  zeroPad?: boolean;
  noDataMessage?: string;
};
