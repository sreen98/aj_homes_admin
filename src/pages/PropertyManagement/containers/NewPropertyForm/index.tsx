import { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Divider, Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import messages from './messages';
import { IState } from './types';
import { contractOptions, payableOptions, statusOptions } from 'config';
import { createProperty, uploadImage } from 'pages/PropertyManagement/slice';
import { useDispatch } from 'react-redux';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const initialState = {
  title: '',
  reference: '',
  postcode: '',
  description: '',
  address: '',
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
  price: 0,
  currency: '£',
  payable: '',
  type: '',
  status: '',
  ytLink: '',
  mapLink: '',
  images: []
};

const loadState = {
  title: 'ABCD',
  reference: 'dqwdwqdqwd',
  postcode: '678912',
  description: 'adajndqwdjhqwoidq',
  address: 'Address 123',
  area: 10,
  floor: 20,
  bathroom: 30,
  bedroom: 40,
  tenure: 'Fixed',
  furnishingType: 'furnished',
  lettingType: 'sfsgfsafd',
  minTerm: 'ssdsdfds',
  contractLength: 'fgawgwr',
  deposit: '13211233',
  price: 0,
  currency: '£',
  payable: 'weekly',
  type: 'adads',
  status: 'available',
  ytLink: 'ahdsiaduhiqh'
};

function NewPropertyForm() {
  const [state, setState] = useState<IState>(initialState);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: 'payable' | 'status' | 'furnishingType') => {
    setState({ ...state, [id]: event.target.value });
  };
  const bathroomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  const handleFileChange = (event: any) => {
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append('file', files);
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
    setSelectedFiles((prevFiles): any => [...prevFiles, formData.get('file')]);
  };

  const handleSubmit = () => {
    const isValidForm = handleValidation();
    if (isValidForm) {
      dispatch(createProperty(state));
    }
  };

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
              <TextField
                required
                multiline
                fullWidth
                id="outlined-textarea"
                label={messages.basicInfo.label.address}
                value={state.address}
                onChange={e => setState({ ...state, address: e.target.value })}
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
                id=""
                select
                label={messages.propInfo.label.bathroom}
                value={state.bathroom}
                onChange={e => setState({ ...state, bathroom: Number(e.target.value) })}
              >
                {bathroomOptions.map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
              <TextField
                id=""
                select
                label={messages.propInfo.label.bedroom}
                value={state.bedroom}
                onChange={e => setState({ ...state, bedroom: Number(e.target.value) })}
              >
                {bedroomOptions.map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
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
                disabled
                label={messages.moreDetails.label.currency}
                value={state.currency}
                onChange={e => setState({ ...state, currency: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.moreDetails.label.price}
                value={state.price}
                onChange={e => setState({ ...state, price: Number(e.target.value) })}
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
      <Grid item xs={12} mb={6}>
        <Card>
          <CardHeader title={messages.imageUpload.title} />
          <Divider />
          <Grid container spacing={3} sx={{ margin: '2rem', width: '100%', height: '100%' }}>
            {selectedFiles.map((file, index) => (
              <Grid item xs={3} key={index}>
                {' '}
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
            ))}
          </Grid>
          <CardContent>
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
                {messages.uploadFile}
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleSubmit} variant="contained" color="primary" size="large">
          {messages.button.submit}
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewPropertyForm;
