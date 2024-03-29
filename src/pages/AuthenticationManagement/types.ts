export interface AuthManagementProps {
  readonly location?: any;
  readonly section?: 'login';
  readonly appVersion?: string;
}

export interface AuthManagementState {
  loading: boolean;
  error: string;
}
export interface ILoginPayload {
  email: string;
  password: string;
}
