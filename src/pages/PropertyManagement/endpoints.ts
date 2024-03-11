import request from 'config/apiConfig';

export const getAllProperties = () => {
  return request.get('/properties');
};

export const getPropertyDetails = (id: string) => {
  return request.get(`/properties/${id}`);
};

export const createProperty = (data: any) => {
  return request.post('/properties', data);
};

export const uploadImage =(file: any) => {
  return request.post('/properties/image-upload', file)
}

export const updateProperty = (data: any) => {
  return request.put(`/properties/${data.id}`, data.state);
};

export const updateStatus = (data: any) => {
  return request.put(`/properties/${data.id}/status`, { status: data.status });
};
