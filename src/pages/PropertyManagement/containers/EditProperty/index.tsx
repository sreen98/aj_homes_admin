import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import messages from './messages';
import { IState } from './types';
import { contractOptions, payableOptions, statusOptions } from 'config';
import { updateProperty, getPropertyDetails, uploadImage } from 'pages/PropertyManagement/slice';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const initialState = {
  title: '',
  reference: '',
  postcode: '',
  description: '',
  area: 0,
  floor: 0,
  bathroom: 0,
  bedroom: 0,
  tenure: '',
  furnishingType: '',
  lettingType: '',
  minTerm: '',
  contractLength: '',
  deposit: '',
  price: '',
  payable: '',
  type: '',
  status: '',
  ytLink: '',
  mapLink: '',
  images: []
};

const stateSelector = createStructuredSelector({
  property: Selectors.makeSelectPropertyData()
});

function EditPropertyForm({ propId }: any) {
  const { property }: any = useSelector(stateSelector);

  const [state, setState] = useState<IState>(initialState);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: 'payable' | 'status' | 'furnishingType') => {
    setState({ ...state, [id]: event.target.value });
  };
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const handleValidation = () => {
    const requiredFields = ['title', 'postcode', 'description', 'price', 'payable', 'status'];
    let isPass = true;
    requiredFields.forEach(item => {
      if (state[item] === '') {
        isPass = false;
      }
    });
    return isPass;
  };
  const handleSubmit = () => {
    const isValidForm = handleValidation();
    if (isValidForm) {
      dispatch(updateProperty({ id: propId, state }));
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    dispatch(
      uploadImage({
        image: formData,
        callback: (imgUrl: string): void => {
          setState((prevState: any) => ({
            ...prevState,
            images: [...prevState.images, imgUrl]
          }));
        }
      })
    );
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const filteredImages = state.images.filter(url => url !== urlToRemove);
    setState({ ...state, images: filteredImages });
  };

  useEffect(() => {
    dispatch(getPropertyDetails(propId));
  }, [propId]);

  useEffect(() => {
    const propertyData = property;

    setState({
      title: propertyData.title,
      reference: propertyData.reference,
      postcode: propertyData.postcode,
      description: propertyData.description,
      area: propertyData.area,
      floor: propertyData.floor,
      bathroom: propertyData.bathroom,
      bedroom: propertyData.bedroom,
      tenure: propertyData.tenure,
      furnishingType: propertyData.furnishingType,
      lettingType: propertyData.lettingType,
      minTerm: propertyData.minTerm,
      contractLength: propertyData.contractLength,
      deposit: propertyData.deposit,
      price: propertyData.price,
      payable: propertyData.payable,
      type: propertyData.type,
      status: propertyData.status,
      ytLink: propertyData.ytLink,
      mapLink: propertyData.mapLink,
      images: propertyData.images
    });
  }, [property]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
      {/* Basic Info */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={messages.basicInfo.title} />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25rem' },
                '& .MuiFormControl-fullWidth': { m: 1, width: '77rem' }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label={messages.basicInfo.label.title}
                value={state.title}
                onChange={e => setState({ ...state, title: e.target.value })}
              />
              <TextField
                id="outlined-required"
                label={messages.basicInfo.label.reference}
                value={state.reference}
                onChange={e => setState({ ...state, reference: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.basicInfo.label.postcode}
                value={state.postcode}
                onChange={e => setState({ ...state, postcode: e.target.value })}
              />
              <TextField
                required
                multiline
                fullWidth
                id="outlined-textarea"
                label={messages.basicInfo.label.description}
                value={state.description}
                onChange={e => setState({ ...state, description: e.target.value })}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* Property Info */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={messages.propInfo.title} />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25rem' },
                '& .MuiFormControl-fullWidth': { m: 1, width: '77rem' }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                id="outlined-required"
                label={messages.propInfo.label.area}
                value={state.area}
                onChange={e => setState({ ...state, area: Number(e.target.value) })}
              />
              <TextField
                id="outlined-required"
                type="number"
                label={messages.propInfo.label.floor}
                value={state.floor}
                onChange={e => setState({ ...state, floor: Number(e.target.value) })}
              />
              <TextField
                id="outlined-required"
                type="number"
                label={messages.propInfo.label.bathroom}
                value={state.bathroom}
                onChange={e => setState({ ...state, bathroom: Number(e.target.value) })}
              />
              <TextField
                id="outlined-required"
                type="number"
                label={messages.propInfo.label.bedroom}
                value={state.bedroom}
                onChange={e => setState({ ...state, bedroom: Number(e.target.value) })}
              />
              <TextField
                id="outlined-required"
                label={messages.propInfo.label.tenure}
                value={state.tenure}
                onChange={e => setState({ ...state, tenure: e.target.value })}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* Contract Info */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={messages.contractInfo.title} />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25rem' },
                '& .MuiFormControlLabel-root': { m: 1, width: '25rem' }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-select-payable"
                select
                label={messages.contractInfo.label.furnishingType}
                value={state.furnishingType}
                onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'furnishingType')}
              >
                {contractOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-required"
                label={messages.contractInfo.label.lettingType}
                value={state.lettingType}
                onChange={e => setState({ ...state, lettingType: e.target.value })}
              />
              <TextField
                id="outlined-required"
                label={messages.contractInfo.label.minTerm}
                value={state.minTerm}
                onChange={e => setState({ ...state, minTerm: e.target.value })}
              />
              <TextField
                id="outlined-required"
                label={messages.contractInfo.label.contractLength}
                value={state.contractLength}
                onChange={e => setState({ ...state, contractLength: e.target.value })}
              />
              <TextField
                id="outlined-required"
                label={messages.contractInfo.label.deposit}
                value={state.deposit}
                onChange={e => setState({ ...state, deposit: e.target.value })}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* More Details */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={messages.moreDetails.title} />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25rem' },
                '& .MuiFormControl-fullWidth': { m: 1, width: '77rem' }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label={messages.moreDetails.label.price}
                value={state.price}
                onChange={e => setState({ ...state, price: e.target.value })}
              />
              <TextField
                id="outlined-select-payable"
                required
                select
                label={messages.moreDetails.label.payable}
                value={state.payable}
                onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'payable')}
              >
                {payableOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-required"
                label={messages.moreDetails.label.type}
                value={state.type}
                onChange={e => setState({ ...state, type: e.target.value })}
              />
              <TextField
                id="outlined-select-statu"
                required
                select
                label={messages.moreDetails.label.status}
                value={state.status}
                onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'status')}
              >
                {statusOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-required"
                label={messages.moreDetails.label.ytLink}
                value={state.ytLink}
                onChange={e => setState({ ...state, ytLink: e.target.value })}
              />
              <TextField
                id="outlined-required"
                label={messages.moreDetails.label.mapLink}
                value={state.mapLink}
                onChange={e => setState({ ...state, mapLink: e.target.value })}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={messages.imageUpload.title} />
          <Divider />
          <Grid container spacing={3} sx={{ padding: '2rem 0 2rem 0' }}>
            {state.images?.map((imageUrl, index) => (
              <Grid item xs={4} key={index}>
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '300px', height: '200px', objectFit: 'fill' }}
                  />
                  {hoveredIndex === index && (
                    <div
                      style={{
                        position: 'absolute',
                        height: '30px',
                        width: '30px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <DeleteIcon style={{ color: 'white' }} onClick={() => handleRemoveImage(imageUrl)} />
                    </div>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} mb={6}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25rem' },
                '& .MuiFormControl-fullWidth': { m: 1, width: '77rem' }
              }}
              noValidate
              autoComplete="off"
              style={{ textAlign: 'center' }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {messages.button.uploadFile}
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </Button>
            </Box>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12} sx={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleSubmit} variant="contained" color="primary" size="small">
          {messages.button.submit}
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditPropertyForm;
