import request from 'config/apiConfig';

export const getAllProperties = () => {
  return request.get('/properties', { params: { isAdmin: true } });
};

export const getPropertyDetails = (id: string) => {
  return request.get(`/properties/${id}`, { params: { isAdmin: true }});
};

export const createProperty = (data: any) => {
  return request.post('/properties', data, { params: { isAdmin: true }});
};

export const uploadImage = (file: any) => {
  return request.post('/properties/image-upload', file, { params: { isAdmin: true }});
};

export const updateProperty = (data: any) => {
  return request.put(`/properties/${data.id}`, data.state, { params: { isAdmin: true }});
};

export const updateStatus = (data: any) => {
  return request.put(`/properties/${data.id}/status`, { status: data.status }, { params: { isAdmin: true }});
};
