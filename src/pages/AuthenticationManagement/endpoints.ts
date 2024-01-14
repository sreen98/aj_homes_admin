import request from 'config/apiConfig';
import { ILoginPayload } from './types';

export const loginUser = (data: ILoginPayload) => {
  return request.post('/login', data);
};
