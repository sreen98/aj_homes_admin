import * as React from 'react';
import { Container } from '@mui/material';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { NewPropertyForm } from './containers';

export default function PropertyCreateManagement() {
  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
      <PageTitle heading={messages.new.heading} showBack />
      <NewPropertyForm></NewPropertyForm>
    </Container>
  );
}
