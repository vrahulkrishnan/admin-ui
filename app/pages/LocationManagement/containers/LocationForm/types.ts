import { ILocation, LocationFormTypes } from 'pages/LocationManagement/types';
import { ServerFileType } from 'types';

export interface LocationFormProps {
  isEdit?: boolean;
  data: ILocation;
  onView: () => void;
  onSubmit: (values: LocationFormTypes, deletedImages: ServerFileType[]) => void;
}
