import * as React from 'react';
import { Container, Grid } from '@mui/material';

import PageTitleWrapper from 'components/PageTitleWrapper';
import PageTitle from 'components/PageTitle';
import messages from './messages';
import { PropertyCard } from './containers';

export default function PropertyManagement() {
  return (
    <Container sx={{ marginLeft: '1rem', height: '100vh' }}>
      <PageTitleWrapper>
        <PageTitle heading={messages.heading} subHeading={messages.subHeading} />
      </PageTitleWrapper>
      <Grid container spacing={{ xs: 2, md: 4, lg: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <PropertyCard />
      </Grid>
    </Container>
  );
}
