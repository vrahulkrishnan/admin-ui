import { RestaurantFormTypes } from 'pages/RestaurantManagement/types';
import { DropdownOption, ServerFileType } from 'types';

export interface RestaurantFormProps {
  isEdit?: boolean;
  data: RestaurantFormTypes;
  onView: () => void;
  onSubmit: (values: RestaurantFormTypes, deletedImages: ServerFileType[]) => void;
  locations: DropdownOption[];
}
