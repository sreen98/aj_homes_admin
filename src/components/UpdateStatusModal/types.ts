import { IProperty } from 'types';

export interface IUpdateStatusModalProps {
  onClose: () => void;
  open: boolean;
  property: IProperty;
  onSubmit: (status: string) => void;
}
