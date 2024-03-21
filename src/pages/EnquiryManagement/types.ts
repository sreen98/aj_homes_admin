import { IEnquireStatus } from './containers/EnquiryBox/types';

export interface EnquiryManagementState {
  loading: boolean;
  enquiries: IEnquiry[];
  error: string;
}

export interface IEnquiry {
  _id?: string; // Need to reconfirm
  id: string;
  propertyTitle?: string;
  name: string;
  emailId: string;
  propertyId: string;
  subject: string;
  status: IEnquireStatus;
  message: string;
}
