import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { PropertyCard } from './containers';
import { localRedirect } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties, updateStatus } from './slice';
import * as Selectors from './selectors';
import { LoadingIndicator, UpdateStatusModal } from 'components';
import { IProperty } from 'types';
import { PropertyInitialState } from 'config';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(stateSelector);

  const [showModal, setShowModal] = useState(false);
  const [propId, setPropId] = useState('');
  const [property, setProperty] = useState<IProperty>(PropertyInitialState);

  useEffect(() => {
    dispatch(getAllProperties());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNext = () => {
    localRedirect('/properties/new');
  };
  const handleStatusUpdate = (status: string) => {
    dispatch(updateStatus({ id: propId, status }));
  };
  return (
    <>
      {showModal && (
        <UpdateStatusModal
          onClose={() => setShowModal(false)}
          open={showModal}
          property={property}
          onSubmit={handleStatusUpdate}
        />
      )}
      <Container maxWidth="xl" sx={{ marginBottom: '2rem', marginLeft: '2rem' }}>
        {loading && <LoadingIndicator visible={loading} />}
        <PageTitle heading={messages.heading} buttonText={messages.button} onButtonClick={handleAddNext} />
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 1, sm: 2, md: 12 }}>
          <PropertyCard
            properties={properties}
            onOpenModal={(id: string) => {
              setShowModal(true);
              setPropId(id);
              const property = properties?.filter(item => item._id === id);
              setProperty(property[0]);
            }}
          />
        </Grid>
      </Container>
    </>
  );
}
