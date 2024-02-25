import React, { useEffect } from 'react';
import { Container, Grid, Typography, Paper, Divider } from '@mui/material';
import PageTitle from 'components/PageTitle';
import { Bathtub as BathtubIcon, KingBed as KingBedIcon } from '@mui/icons-material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import messages from './messages';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetails } from './slice';
import { createStructuredSelector } from 'reselect';
import * as Selectors from './selectors';

const stateSelector = createStructuredSelector({
  property: Selectors.makeSelectPropertyData()
});

const ProductDetailsPage = () => {
  const { propId }: any = useParams();
  const { property }: any = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyDetails(propId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propId]);

  const product = {
    name: 'Sample Product',
    description:
      'A very spacious nine double bedroom house situated near to the University of Birmingham. Each bedroom has its own ensuite and flat screen TV. The property has a large open plan kitchen and lounge area. The lounge includes a wall mounted flat screen TV and comfy leather sofas. The kitchen includes a dishwasher, washing machine, tumble dryer, two electric ovens and plenty of fridge-freezer space. Large back garden with gazebo and BBQ, great for social events.    ',
    price: '$19.99',
    deposit: '$9.99',
    payable: 'Monthly',
    imageUrl: 'https://eadn-wc02-7638196.nxedge.io/wp-content/uploads/2019/07/PropertyManagerBlog1-2048x1366.jpeg',
    details: {
      bedrooms: 3,
      bathrooms: 2,
      status: 'Available'
    }
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <PageTitle heading={messages.view.heading} showBack />

      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 500,
          background: `url(${product.imageUrl}) center/cover`,
          marginBottom: '1rem'
        }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>{property?.description}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <KingBedIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="primary" />
              <strong style={{ paddingRight: '20px' }}>Bedrooms :</strong> {property?.bedroom}
            </Typography>

            {/* Bathrooms */}
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <BathtubIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="primary" />
              <strong style={{ paddingRight: '20px' }}>Bathrooms :</strong> {property?.bathroom}
            </Typography>

            {/* Status */}
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <EventAvailableIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="primary" />
              <strong style={{ paddingRight: '20px' }}>Status :</strong> {property?.status}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <CurrencyPoundIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Price :</strong> £ {property?.price}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <ReceiptIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Payable :</strong> {property?.payable}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <SavingsIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Deposit :</strong> {property?.deposit}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: '1rem' }} spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h5" gutterBottom>
              Property Videos
            </Typography>
            <Divider />

            {/* YouTube Video */}
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/7TO7EcTZutg?si=SVORrhUFEHlfMGmJ"
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h5" gutterBottom>
              Property Videos
            </Typography>
            <Divider />

            {/* YouTube Video */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15746.55967500723!2d76.58349845!3d9.365096750000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062389640eacc3%3A0x534f2de477aac83c!2sBLACK%20FORT%20Cafe%20And%20Grill%20Resto%20Thiruvalla!5e0!3m2!1sen!2sin!4v1707045363912!5m2!1sen!2sin"
              title="Property Video"
              width="100%"
              height="315"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
