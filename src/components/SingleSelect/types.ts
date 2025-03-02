import { SelectProps } from '@mui/material';

export interface SingleSelectProps extends Omit<SelectProps, 'someProperty'> {
  control: any;
  label: string;
  placeholder: string;
  id: string;
  errors: any;
  items: any;
  propertyId: string;
  propertyText: string;
  name: string;
}
