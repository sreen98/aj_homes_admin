import { AuthenticationManagement, DashboardManagement } from 'pages';
import PropertyManagement from 'pages/PropertyManagement';

export const pageRoutes = {
  private: [
    { component: DashboardManagement, path: '/dashboard' },
    { component: PropertyManagement, path: '/properties' }
  ],
  public: [
    { path: '/', component: AuthenticationManagement, section: 'login' },
    { path: '/login', component: AuthenticationManagement, section: 'login' },
    { path: '/register', component: AuthenticationManagement, section: 'register' }
  ]
};
