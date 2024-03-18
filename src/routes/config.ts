import {
  AuthenticationManagement,
  PropertyCreateManagement,
  PropertyManagement,
  PropertyViewManagement,
  PropertyEditManagement,
  EnquiryManagement
} from 'pages';

export const pageRoutes = {
  private: [
    { component: PropertyManagement, path: '/admin/properties' },
    { component: PropertyViewManagement, path: '/admin/property/:propId' },
    { component: PropertyCreateManagement, path: '/admin/properties/new' },
    { component: PropertyEditManagement, path: '/admin/properties/edit/:propId' },
    { component: EnquiryManagement, path: '/admin/enquiries' }
  ],
  public: [
    { path: '/admin', component: AuthenticationManagement, section: 'login' },
    { path: '/admin/login', component: AuthenticationManagement, section: 'login' }
  ]
};
