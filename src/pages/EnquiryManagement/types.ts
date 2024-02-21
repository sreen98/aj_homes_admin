import { IEnquireStatus } from './containers/EnquiryBox/types';

export interface EnquiryManagementState {
  loading: boolean;
  enquiries: IEnquiry[];
  error: string;
}

export interface IEnquiry {
  id: string;
  name: string;
  emailId: string;
  propertyId: string;
  subject: string;
  status: IEnquireStatus;
  message: string;
}
