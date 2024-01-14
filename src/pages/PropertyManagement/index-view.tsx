import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { PropertyCard } from './containers';
import { localRedirect } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from './slice';
import * as Selectors from './selectors';
import { LoadingIndicator } from 'components';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  property: Selectors.makeSelectPropertyData()
});

export default function PropertyViewManagement() {
  console.log('🚀 ~ PropertyViewManagement ~ PropertyViewManagement:');
  const dispatch = useDispatch();

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
      <PageTitle heading={messages.view.heading} showBack />
    </Container>
  );
}
