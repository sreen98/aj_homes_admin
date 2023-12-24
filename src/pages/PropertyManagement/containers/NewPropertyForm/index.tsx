import { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Divider, Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import messages from './messages';
import { IState } from './types';
import { payableOptions, statusOptions } from 'config';

const initialState = {
  title: '',
  description: '',
  reference: '',
  postcode: '',
  area: 0,
  floor: 0,
  bathroom: 0,
  bedroom: 0,
  tenure: '',
  furnished: false,
  lettingType: '',
  minTerm: '',
  contractLength: '',
  deposit: '',
  price: '',
  payable: '',
  type: '',
  status: ''
};

const loadState = {
  title: 'ABCD',
  description: 'adajndqwdjhqwoidq',
  reference: 'dqwdwqdqwd',
  postcode: '678912',
  area: 10,
  floor: 20,
  bathroom: 30,
  bedroom: 40,
  tenure: 'Fixed',
  furnished: false,
  lettingType: 'sfsgfsafd',
  minTerm: 'ssdsdfds',
  contractLength: 'fgawgwr',
  deposit: '13211233',
  price: '12331232',
  payable: 'weekly',
  type: 'adads',
  status: 'available'
};

function NewPropertyForm() {
  const [state, setState] = useState<IState>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: 'payable' | 'status') => {
    setState({ ...state, [id]: event.target.value });
  };
  //load values if edit
  // useEffect(() => {
  //   setState(loadState);
  // }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
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
                required
                id="outlined-required"
                label={messages.basicInfo.label.reference}
                value={state.title}
                onChange={e => setState({ ...state, reference: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.basicInfo.label.postcode}
                value={state.title}
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
                required
                type="number"
                id="outlined-required"
                label={messages.propInfo.label.area}
                value={state.area}
                onChange={e => setState({ ...state, area: Number(e.target.value) })}
              />
              <TextField
                required
                id="outlined-required"
                type="number"
                label={messages.propInfo.label.floor}
                value={state.floor}
                onChange={e => setState({ ...state, floor: Number(e.target.value) })}
              />
              <TextField
                required
                id="outlined-required"
                type="number"
                label={messages.propInfo.label.bathroom}
                value={state.bathroom}
                onChange={e => setState({ ...state, bathroom: Number(e.target.value) })}
              />
              <TextField
                required
                id="outlined-required"
                type="number"
                label={messages.propInfo.label.bedroom}
                value={state.bedroom}
                onChange={e => setState({ ...state, bedroom: Number(e.target.value) })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.propInfo.label.tenure}
                value={state.tenure}
                onChange={e => setState({ ...state, tenure: e.target.value })}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

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
                required
                id="outlined-required"
                label={messages.contractInfo.label.lettingType}
                value={state.lettingType}
                onChange={e => setState({ ...state, lettingType: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.contractInfo.label.minTerm}
                value={state.minTerm}
                onChange={e => setState({ ...state, lettingType: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.contractInfo.label.contractLength}
                value={state.contractLength}
                onChange={e => setState({ ...state, contractLength: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label={messages.contractInfo.label.deposit}
                value={state.deposit}
                onChange={e => setState({ ...state, deposit: e.target.value })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={state.furnished}
                    onChange={e => setState({ ...state, furnished: !state.furnished })}
                  />
                }
                label={messages.contractInfo.label.furnished}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

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
                required
                id="outlined-required"
                label={messages.moreDetails.label.payable}
                value={state.minTerm}
                onChange={e => setState({ ...state, payable: e.target.value })}
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
                required
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
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NewPropertyForm;
