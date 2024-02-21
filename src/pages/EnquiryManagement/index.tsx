import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { EnquiryTable } from './containers';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEnquiries, updateEnquiryStatus } from './slice';
import * as Selectors from './selectors';
import { EnquiryViewModal, LoadingIndicator } from 'components';
import { IProperty } from 'types';
import { PropertyInitialState } from 'config';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectEnquiriesLoading(),
  enquiries: Selectors.makeSelectEnquiriesData()
});

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { enquiries, loading } = useSelector(stateSelector);

  const [showModal, setShowModal] = useState(false);
  const [enqId, setEnqId] = useState('');

  useEffect(() => {
    dispatch(getAllEnquiries({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (status: string) => {
    console.log('🚀 ~ handleStatusChange ~ status:', status);
    dispatch(getAllEnquiries({}));
  };
  const handleStatusChange = (status: string) => {
    console.log('🚀 ~ handleStatusChange ~ status:', status);
    dispatch(getAllEnquiries({}));
  };
  const handleTableAction = (type: 'update' | 'view', id: string) => {
    console.log('🚀 ~ handleIconClick ~ id:', id);
    console.log('🚀 ~ handleIconClick ~ type:', type);
    setShowModal(true);
  };
  return (
    <>
      <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
        {showModal && (
          <EnquiryViewModal
            onClose={() => setShowModal(false)}
            open={showModal}
            enquiry={{
              id: '1',
              propertyId: '100',
              name: 'Mildred',
              emailId: 'ebebin@kowanfu.mo',
              subject: 'pPoQBZCwVOWRnOnPtPv',
              status: 'contacted',
              message:
                'impossible string frog excitement crop moving diagram cent press living doctor breathing single enter learn path snow rope money particular height radio part wealth'
            }}
            onSubmit={handleStatusChange}
          />
        )}
        {loading && <LoadingIndicator visible={loading} />}
        <PageTitle heading={messages.heading} />
        <EnquiryTable enquiries={enquiries} onFilterChange={handleFilterChange} onAction={handleTableAction} />
      </Container>
    </>
  );
}
