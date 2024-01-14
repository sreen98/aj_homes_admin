import { IProperty } from 'types';

export interface IPropertyCardProps {
  properties: IProperty[];
  onOpenModal: (id: string) => void;
}
