import { ServerFileType } from 'types';
import { FileButtonProps } from '@mantine/core';
import { iconMapKeys } from '.icons';

export interface MultipleFileInputProps extends Omit<FileButtonProps<true>, 'children'> {
  label: string;
  icon?: iconMapKeys;
  value: Array<File | ServerFileType>;
  onClose?: (item: File | ServerFileType) => void;
}
