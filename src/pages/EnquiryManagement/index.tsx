import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import PageTitle from 'components/PageTitle';
import messages from './messages';
import { EnquiryTable } from './containers';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEnquiries } from './slice';
import * as Selectors from './selectors';
import { EnquiryViewModal, LoadingIndicator } from 'components';
import { IEnquiry } from './types';

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
    dispatch(getAllEnquiries(status === 'contacted'));
  };

  const handleTableAction = (type: 'update' | 'view', id: string) => {
    setShowModal(true);
    setEnqId(id);
  };

  const selectedEnquiry = useMemo(() => {
    return enquiries?.find(item => item.id === enqId) as IEnquiry;
  }, [enqId, enquiries]);

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
      {showModal && <EnquiryViewModal onClose={() => setShowModal(false)} open={showModal} enquiry={selectedEnquiry} />}
      {loading && <LoadingIndicator visible={loading} />}
      <PageTitle heading={messages.heading} />
      <EnquiryTable enquiries={enquiries} onFilterChange={handleFilterChange} onAction={handleTableAction} />
    </Container>
  );
}
