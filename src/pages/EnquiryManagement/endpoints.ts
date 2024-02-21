import request from 'config/apiConfig';

export const getAllEnquiries = () => {
  return request.get('/enquiry');
};

export const updateEnquiryStatus = (data: any) => {
  return request.put(`/properties/${data.id}/status`, { status: data.status });
};
