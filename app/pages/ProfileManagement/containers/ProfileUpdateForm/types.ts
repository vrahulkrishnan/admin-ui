import { FormEvent } from 'react';
import { IProfile } from '../../types';

export interface ProfileUpdateFormProps {
  data: IProfile;
  response?: string;
  onUpdate: (values: IProfile, event: FormEvent<HTMLFormElement>) => void;
  classes?: any;
}
