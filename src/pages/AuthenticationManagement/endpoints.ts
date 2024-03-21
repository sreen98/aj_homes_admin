import request from 'config/apiConfig';
import { ILoginPayload } from './types';

export const loginUser = async (data: ILoginPayload) => {
  return await request.post('/login', data);
};
