import * as React from 'react';
import { Container } from '@mui/material';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import EditPropertyForm from './containers/EditProperty';
import { useParams } from 'react-router-dom';
import { LoadingIndicator } from 'components';
import { createStructuredSelector } from 'reselect';
import * as Selectors from './selectors';
import { useSelector } from 'react-redux';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading()
});

export default function PropertyEditManagement() {
  const { propId }: any = useParams();
  const { loading } = useSelector(stateSelector);

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
      <PageTitle heading={messages.new.editHeading} showBack />
      {loading && <LoadingIndicator visible={loading} />}
      <EditPropertyForm propId={propId}></EditPropertyForm>
    </Container>
  );
}
