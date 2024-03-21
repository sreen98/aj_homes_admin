import request from 'config/apiConfig';
import { ILoginPayload } from './types';

export const loginUser = async (data: ILoginPayload) => {
  const s = await request.post('/login', data);
  console.log('🚀 ~ loginUser ~ s:', s);
  return s;
};
