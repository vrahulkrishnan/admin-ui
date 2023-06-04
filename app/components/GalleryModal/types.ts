import { ModalProps } from '@mantine/core';
import { ServerFileType } from 'types';

export interface GalleryModalProps extends ModalProps {
  opened: boolean;
  onClose: () => void;
  images: ServerFileType[];
}
