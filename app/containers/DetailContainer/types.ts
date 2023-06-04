import { ServerFileType } from 'types';

export interface DetailContainerProps {
  id?: string;
  mainImage: ServerFileType;
  galleryImages: ServerFileType[];
  name: string;
  description: string;
  onAction: (type: 'add' | 'edit' | 'delete', id: string) => void;
  onView: () => void;
}
