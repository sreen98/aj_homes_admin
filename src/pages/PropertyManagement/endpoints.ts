import request from 'config/apiConfig';

export const getAllProperties = ({ category }: { category: string }) => {
  return request.get('/properties', { params: { isAdmin: true, ...(category !== 'all' && { category }) } });
};

export const getPropertyDetails = ({ propId }: { propId: string }) => {
  return request.get(`/properties/${propId}`, { params: { isAdmin: true } });
};

export const createProperty = (data: any) => {
  return request.post('/properties', data, { params: { isAdmin: true } });
};

export const uploadImage = (file: any) => {
  return request.post('/properties/image-upload', file, { params: { isAdmin: true } });
};

export const updateProperty = (data: any) => {
  return request.put(`/properties/${data.id}`, data.state, { params: { isAdmin: true } });
};

export const updateStatus = (data: any) => {
  return request.put(`/properties/${data.id}/status`, { status: data.status }, { params: { isAdmin: true } });
};

export const deleteProperty = (data: any) => {
  return request.delete(`/properties/${data.id}`);
};
