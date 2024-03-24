import { IEnquiry, IEnquiryResponse } from './types';

export const getMappedEnquiries = (enquiries: IEnquiryResponse[]): IEnquiry[] => {
  return enquiries?.map(enq => ({
    id: enq._id,
    ...(enq.propertyTitle && { propertyTitle: enq.propertyTitle }),
    name: enq.name,
    emailId: enq.emailId,
    ...(enq.propertyId && { propertyId: enq.propertyId }),
    subject: enq.subject,
    status: enq.status,
    message: enq.message
  }));
};
