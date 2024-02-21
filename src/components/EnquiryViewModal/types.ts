import { IEnquiry } from 'pages/EnquiryManagement/types';

export interface IEnquiryViewModalProps {
  onClose: () => void;
  open: boolean;
  enquiry: IEnquiry;
  onSubmit: (status: string) => void;
}
