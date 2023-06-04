import { ActivityFormTypes } from 'pages/ActivityManagement/types';
import { DropdownOption, ServerFileType } from 'types';

export interface ActivityFormProps {
  isEdit?: boolean;
  data: ActivityFormTypes;
  onView: () => void;
  onSubmit: (values: ActivityFormTypes, deletedImages: ServerFileType[]) => void;
  restaurants: DropdownOption[];
}
