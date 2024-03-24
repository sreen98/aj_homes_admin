import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, Button, Divider, Card, Link } from '@mui/material';
import PageTitle from 'components/PageTitle';
import {
  Bathtub as BathtubIcon,
  KingBed as KingBedIcon
  // Playground as PlaygroundIcon,
} from '@mui/icons-material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetails } from './slice';
import { createStructuredSelector } from 'reselect';
import * as Selectors from './selectors';
import ReactPlayer from 'react-player';

const stateSelector = createStructuredSelector({
  property: Selectors.makeSelectPropertyData()
});

const ProductDetailsPage = () => {
  const { propId }: any = useParams();
  const { property }: any = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyDetails(propId));
  }, [propId]);

  const [slideIndex, setSlideIndex] = useState(1);

  const plusDivs = (n: number) => {
    setSlideIndex(prevIndex => {
      let newIndex = prevIndex + n;
      if (newIndex > property?.images?.length) {
        newIndex = 1;
      }
      if (newIndex < 1) {
        newIndex = property?.images?.length;
      }
      return newIndex;
    });
  };
  return (
    <Container maxWidth="xl" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <PageTitle heading={property?.title} showBack />

      <Grid
        item
        xs={12}
        width={{ xs: 20 }}
        height={{ xs: 300, md: 600 }}
        p={{ xs: 2 }}
        style={{ paddingLeft: '40px', position: 'relative', width: '100%', overflow: 'hidden' }}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            maxWidth: '100%'
          }}
          src={
            property?.images?.length > 0
              ? property?.images[slideIndex - 1]
              : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
          }
          alt={`Slide ${slideIndex}`}
        />

        {/* Button Grid Item */}
        {property?.images?.length > 0 && (
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            xs={12}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              paddingLeft: '44px',
              paddingRight: '20px'
            }}
          >
            <Button
              className="w3-button w3-black"
              size="large"
              onClick={() => plusDivs(-1)}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                borderRadius: '5px',
                padding: '10px'
              }}
            >
              &#10094;
            </Button>
            <Button
              className="w3-button w3-black"
              onClick={() => plusDivs(1)}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                borderRadius: '5px',
                padding: '10px'
              }}
            >
              &#10095;
            </Button>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>{property?.description}</Typography>
            <Typography variant="h5" gutterBottom>
              Address
            </Typography>
            <Typography paragraph>
              {property?.address}, {property?.postcode}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Reference
            </Typography>
            <Typography paragraph>{property?.reference}</Typography>
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

            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <CorporateFareIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="primary" />
              <strong style={{ paddingRight: '20px' }}>Floors :</strong> {property?.floor}
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
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <ReceiptLongIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Tenure :</strong> {property?.tenure}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: '1rem' }} spacing={3}>
        <Grid item xs={12} md={8} padding="40px">
          <Card sx={{ height: { xs: 400, md: 600 }, padding: '30px' }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Property Videos</Typography>
            <Divider color="black" style={{ marginBottom: '2rem', marginTop: '2rem' }} />
            {property.ytLink ? (
              <ReactPlayer url={property?.ytLink && property.ytLink} controls={true} width="100%" height="100%" />
            ) : (
              <img
                style={{ width: '100%', height: '100%' }}
                src="https://www.47pitches.com/contents/images/no-video.jpg"
              />
            )}
            {/* </Paper> */}
          </Card>
        </Grid>
        <Grid item xs={12} md={4} padding="40px">
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <strong style={{ paddingRight: '20px' }}>Furnishment :</strong> {property?.furnishingType}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <strong style={{ paddingRight: '20px' }}>Letting Type :</strong> {property?.lettingType}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <strong style={{ paddingRight: '20px' }}>Total Area :</strong> {property?.area} sq.ft
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <strong style={{ paddingRight: '20px' }}>Minimum Term:</strong> {property?.minTerm}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <strong style={{ paddingRight: '20px' }}>Contract Length:</strong> {property?.contractLength}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: '1rem', marginTop: '20px' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <strong style={{ paddingRight: '20px' }}>Location</strong>
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <Link href={property?.mapLink} underline="none" target="_blank">
                <LocationOnIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="primary" />
                View Location
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
