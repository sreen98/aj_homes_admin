import { IEnquireStatus } from './containers/EnquiryBox/types';

export interface EnquiryManagementState {
  loading: boolean;
  enquiries: IEnquiry[];
  error: string;
}

export interface IEnquiryResponse {
  _id: string;
  propertyTitle?: string;
  name: string;
  emailId: string;
  propertyId?: string;
  subject: string;
  status: IEnquireStatus;
  message: string;
}

export type IEnquiry = Omit<IEnquiryResponse, '_id'> & {
  id: string;
};
