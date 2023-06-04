import { ServerFileType } from 'types';

export interface ListItemContainerProps {
  id: string;
  mainImage: ServerFileType;
  name: string;
  description: string;
  onAction: (type: 'view' | 'edit' | 'delete', id: string) => void;
  editOnly?: boolean;
}
