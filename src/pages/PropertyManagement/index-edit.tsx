import * as React from 'react';
import { Container } from '@mui/material';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import EditPropertyForm from './containers/EditProperty';
import { useParams } from 'react-router-dom';

export default function PropertyEditManagement() {
  const { propId }: any = useParams();

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
      <PageTitle heading={messages.new.heading} showBack />
      <EditPropertyForm propId={propId}></EditPropertyForm>
    </Container>
  );
}
