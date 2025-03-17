import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, Button, Divider, Card, Link, Toolbar, Tooltip } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetails, deleteProperty } from './slice';
import { createStructuredSelector } from 'reselect';
import * as Selectors from './selectors';
import ReactPlayer from 'react-player';
import ReactHtmlParser from 'react-html-parser';
import { ConfirmationModal, LoadingIndicator } from 'components';
import { propertyTypeMap } from 'utils/constants';
import { localRedirect } from 'utils';

const mapkey = process.env.REACT_APP_MAP_API_KEY;

const stateSelector = createStructuredSelector({
  property: Selectors.makeSelectPropertyData(),
  loading: Selectors.makeSelectPropertiesLoading()
});

const ProductDetailsPage = () => {
  const { propId }: any = useParams();
  const { property, loading }: any = useSelector(stateSelector);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const moveInDate = new Date(property?.moveInDate).toLocaleDateString();

  useEffect(() => {
    dispatch(getPropertyDetails({ propId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const MapComponent = ({ mapLink }: any) => {
    const placeName = mapLink?.split('/place/')[1]?.split('/@')[0];
    const encodedPlaceName = encodeURIComponent(placeName);
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${mapkey}&q=${encodedPlaceName}`;
    return (
      <iframe
        title="Location Map"
        width="100%"
        height="400"
        loading="lazy"
        frameBorder="0"
        style={{ border: 0 }}
        src={embedUrl}
        allowFullScreen
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
      {showDeleteModal && (
        <ConfirmationModal
          open={showDeleteModal}
          title="Delete Property"
          message="Do you want to delete this property"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteProperty({ id: propId }));
          }}
        />
      )}
      <PageTitle heading={property?.title} showBack />
      {loading && <LoadingIndicator visible={loading} />}

      <Paper sx={{ marginBottom: '1rem' }}>
        <Grid
          item
          xs={12}
          width={{ xs: 20 }}
          height={{ xs: 300, md: 600 }}
          p={{ xs: 2 }}
          style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
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
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {property?.description && (
            <Paper elevation={3} sx={{ padding: '1rem' }}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant="h5" gutterBottom>
                    Description
                  </Typography>
                  <div>{ReactHtmlParser(property?.description)}</div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '10px'
                    }}
                  >
                    <Tooltip title="View on Map" placement="top">
                      <LocationOnIcon
                        sx={{ cursor: 'pointer' }}
                        fontSize="small"
                        onClick={() => window.open(property?.mapLink)}
                      />
                    </Tooltip>
                    <Tooltip title="Edit Property" placement="top">
                      <EditIcon
                        onClick={() => localRedirect(`/admin/properties/new/${propId}`)}
                        fontSize="small"
                        sx={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Property" placement="top">
                      <DeleteIcon
                        onClick={() => setShowDeleteModal(true)}
                        fontSize="small"
                        sx={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          )}
          <Paper elevation={3} sx={{ padding: '1rem', marginTop: '1rem' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Address :</strong> {property?.address}, {property?.postcode}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Reference :</strong> {property?.reference || '-'}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Featured :</strong> {property?.isFeatured ? 'Yes' : 'No'}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Move In Date:</strong>{' '}
                  {(property?.moveInDate && moveInDate) || '-'}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}> Category:</strong>{' '}
                  {propertyTypeMap[property?.category as keyof typeof propertyTypeMap] || ''}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Furnishment :</strong> {property?.furnishingType || '-'}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Letting Type :</strong> {property?.lettingType || '-'}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Total Area :</strong> {property?.area} sq.ft
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Minimum Term:</strong> {property?.minTerm || '-'}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <strong style={{ paddingRight: '20px' }}>Contract Length:</strong> {property?.contractLength || '-'}
                </Typography>
              </Grid>
            </Grid>
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
              <strong style={{ paddingRight: '20px' }}>Price :</strong> £ {property?.price} {property?.priceDesc ?? ''}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <ReceiptIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Payable :</strong> {property?.payable}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <SavingsIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Deposit :</strong> {property?.deposit || '-'}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <ReceiptLongIcon fontSize="small" sx={{ marginRight: '0.5rem' }} color="warning" />
              <strong style={{ paddingRight: '20px' }}>Tenure :</strong> {property?.tenure || '-'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {property.ytLink && (
        <Card sx={{ marginTop: '1rem', padding: '20px' }}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Property Video</Typography>
            <Divider color="black" style={{ marginBottom: '.5rem', marginTop: '.5rem' }} />
            {property.ytLink ? (
              <ReactPlayer url={property?.ytLink && property.ytLink} controls={true} width="100%" height="600px" />
            ) : (
              <img
                style={{ width: '100%', height: '100%' }}
                alt="Failed to Load"
                src="https://www.47pitches.com/contents/images/no-video.jpg"
              />
            )}
          </Grid>
        </Card>
      )}
      {property.mapLink && (
        <Grid item xs={12} md={8} padding="40px">
          <MapComponent mapLink={property?.mapLink} />
        </Grid>
      )}
    </Container>
  );
};

export default ProductDetailsPage;
