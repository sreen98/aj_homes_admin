import React from 'react';

import { NativeLogin } from './containers';
import { AuthManagementProps } from './types';

const AuthenticationManagement = ({ section = 'login' }: AuthManagementProps) => {
  const RenderAuthComponent = {
    login: NativeLogin
  }[section];
  return <RenderAuthComponent />;
};

export default AuthenticationManagement;
