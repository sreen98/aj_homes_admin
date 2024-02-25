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
    { component: PropertyManagement, path: '/properties' },
    { component: PropertyViewManagement, path: '/property/:propId' },
    { component: PropertyCreateManagement, path: '/properties/new' },
    { component: PropertyEditManagement, path: '/properties/edit/:propId' },
    { component: EnquiryManagement, path: '/enquiries' }
  ],
  public: [
    { path: '/', component: AuthenticationManagement, section: 'login' },
    { path: '/login', component: AuthenticationManagement, section: 'login' }
  ]
};
