import { IProperty } from 'types';

export interface PropertyManagementState {
  loading: boolean;
  properties: IProperty[];
  property: IProperty;
  error: string;
}
