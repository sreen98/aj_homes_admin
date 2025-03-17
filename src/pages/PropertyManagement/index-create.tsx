import * as React from 'react';
import { Container } from '@mui/material';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { NewPropertyForm } from './containers';
import { createStructuredSelector } from 'reselect';
import * as Selectors from './selectors';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from 'components';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading()
});

export default function PropertyCreateManagement() {
  const { loading }: any = useSelector(stateSelector);

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
      <PageTitle heading={messages.new.heading} showBack />
      {loading && <LoadingIndicator visible={loading} />}
      <NewPropertyForm />
    </Container>
  );
}
