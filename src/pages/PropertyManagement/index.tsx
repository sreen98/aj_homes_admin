import * as React from 'react';
import { Container, Grid } from '@mui/material';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { PropertyCard } from './containers';
import { localRedirect } from 'utils';

export default function PropertyManagement() {
  const handleAddNext = () => {
    localRedirect('/properties/create');
  };
  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem', marginLeft: '2rem' }}>
      <PageTitle heading={messages.heading} buttonText={messages.button} onButtonClick={handleAddNext} />
      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <PropertyCard />
      </Grid>
    </Container>
  );
}
