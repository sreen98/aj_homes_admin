import { IEnquiry } from 'pages/EnquiryManagement/types';

export interface IPropertyCardProps {}
export type IEnquireStatus = 'contacted' | 'notContacted';
export interface EnquiryTableProps {
  className?: string;
  enquiries: IEnquiry[];
  onFilterChange: (status: string) => void;
  onAction: (type: 'update' | 'view', id: string) => void;
}
