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
  properties: Selectors.makeSelectPropertiesData()
});

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(stateSelector);
  useEffect(() => {
    dispatch(getAllProperties());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNext = () => {
    console.log('🚀 ~ handleAddNext ~ handleAddNext:');
    localRedirect('/properties/new');
  };
  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem', marginLeft: '2rem' }}>
      {loading && <LoadingIndicator visible={loading} />}
      <PageTitle heading={messages.heading} buttonText={messages.button} onButtonClick={handleAddNext} />
      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <PropertyCard properties={properties} />
      </Grid>
    </Container>
  );
}
