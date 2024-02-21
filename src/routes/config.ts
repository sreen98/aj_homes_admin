import {
  AuthenticationManagement,
  DashboardManagement,
  PropertyCreateManagement,
  PropertyManagement,
  PropertyViewManagement,
  PropertyEditManagement,
  EnquiryManagement
} from 'pages';

export const pageRoutes = {
  private: [
    { component: DashboardManagement, path: '/dashboard' },
    { component: PropertyManagement, path: '/properties' },
    { component: PropertyViewManagement, path: '/property/:propId' },
    { component: PropertyCreateManagement, path: '/properties/new' },
    { component: PropertyEditManagement, path: '/properties/edit/:propId' },
    { component: EnquiryManagement, path: '/enquiries' }
  ],
  public: [
    { path: '/', component: AuthenticationManagement, section: 'login' },
    { path: '/login', component: AuthenticationManagement, section: 'login' },
    { path: '/register', component: AuthenticationManagement, section: 'register' }
  ]
};
