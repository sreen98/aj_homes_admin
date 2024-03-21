import React, { useEffect, useState } from 'react';
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
  const [enquiry, setEnquiry] = useState({} as IEnquiry);

  useEffect(() => {
    dispatch(getAllEnquiries({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (flag: string) => {
    let status;
    if (flag === 'contacted') {
      status = true;
    } else if (flag === 'notContacted') {
      status = false;
    } else {
      dispatch(getAllEnquiries({}));
      return;
    }
    dispatch(getAllEnquiries({ status }));
  };

  const handleTableAction = (type: 'update' | 'view', id: string) => {
    setShowModal(true);
    const enq = enquiries.find(enquiry => {
      return enquiry.id === id;
    });
    if (enq) {
      setEnquiry(enq);
    }
  };
  return (
    <>
      <Container maxWidth="xl" sx={{ marginBottom: '2rem' }}>
        {showModal && <EnquiryViewModal onClose={() => setShowModal(false)} open={showModal} enquiry={enquiry} />}
        {loading && <LoadingIndicator visible={loading} />}
        <PageTitle heading={messages.heading} />
        <EnquiryTable enquiries={enquiries} onFilterChange={handleFilterChange} onAction={handleTableAction} />
      </Container>
    </>
  );
}
