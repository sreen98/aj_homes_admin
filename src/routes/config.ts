import { AuthenticationManagement, DashboardManagement, PropertyCreateManagement, PropertyManagement } from 'pages';

export const pageRoutes = {
  private: [
    { component: DashboardManagement, path: '/dashboard' },
    { component: PropertyManagement, path: '/properties' },
    { component: PropertyCreateManagement, path: '/properties/create' }
  ],
  public: [
    { path: '/', component: AuthenticationManagement, section: 'login' },
    { path: '/login', component: AuthenticationManagement, section: 'login' },
    { path: '/register', component: AuthenticationManagement, section: 'register' }
  ]
};
