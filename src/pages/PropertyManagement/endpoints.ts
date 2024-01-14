import request from 'config/apiConfig';

export const getAllProperties = () => {
  return request.get('/properties');
};

export const getPropertyDetails = () => {
  //TODO Update endpoimt
  return request.get('/properties');
};

export const createProperty = (data: any) => {
  return request.post('/properties', data);
};

export const updateStatus = (data: any) => {
  return request.put(`/properties/${data.id}/status`, { status: data.status });
};
