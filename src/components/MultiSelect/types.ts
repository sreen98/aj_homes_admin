import { SelectProps } from '@mui/material/Select';

export interface MultiSelectProps extends Omit<SelectProps, 'children'> {
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
