import React, { useEffect, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { PropertyCard } from './containers';
import { getDecodedQueryParams, localRedirect } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties, updateStatus } from './slice';
import * as Selectors from './selectors';
import { LoadingIndicator, UpdateStatusModal } from 'components';
import { IProperty } from 'types';
import { PropertyInitialState } from 'config';
import { useParams } from 'react-router-dom';
import { propertyTypeMap } from 'utils/constants';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { category } = getDecodedQueryParams();

  const { properties, loading } = useSelector(stateSelector);

  const [showModal, setShowModal] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [propId, setPropId] = useState('');
  const [property, setProperty] = useState<IProperty>(PropertyInitialState);

  useEffect(() => {
    dispatch(getAllProperties({ category }));
    setPageTitle(propertyTypeMap[category as keyof typeof propertyTypeMap] || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleAddNext = () => {
    localRedirect('/admin/properties/new');
  };
  const handleStatusUpdate = (status: string) => {
    dispatch(updateStatus({ id: propId, status, category }));
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
      <Container maxWidth="xl" sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
        {loading && <LoadingIndicator visible={loading} />}
        <PageTitle
          heading={`${messages.heading} - ${pageTitle}`}
          buttonText={messages.button}
          onButtonClick={handleAddNext}
        />

        <Grid container spacing={{ xs: 2, md: 3, lg: 4, xl: 3 }} columns={{ xs: 4, sm: 8, md: 12, xl: 12 }}>
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
