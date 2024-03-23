import request from 'config/apiConfig';

export const getAllEnquiries = (data?: any) => {
  return request.get('/enquiry/all', { params: { data: data.status } });
};

export const updateEnquiryStatus = (data: any) => {
  return request.put(`/enquiry/${data}`, { params: { enquiryId: data } });
};
