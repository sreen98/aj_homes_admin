import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import messages from './messages';
import { statusOptions } from 'config';
import { Box, Card, CardContent, Chip, Divider, Grid, MenuItem, Typography } from '@mui/material';
import { IEnquiryViewModalProps } from './types';
import { IEnquireStatus } from 'pages/EnquiryManagement/containers/EnquiryBox/types';

const getStatusLabel = (status: IEnquireStatus): JSX.Element => {
  const map = {
    contacted: {
      text: 'Not Contacted',
      color: 'error'
    },
    notContacted: {
      text: 'Contacted',
      color: 'success'
    }
  };

  const { text, color }: any = map?.[status];

  return <Chip color={color} label={text} variant="outlined" sx={{ minWidth: '150px' }}></Chip>;
};

export default function EnquiryViewModal({ onClose, open, enquiry, onSubmit }: IEnquiryViewModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'}>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Box p={3} display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {messages.title}
                  </Typography>
                  <Typography variant="subtitle2">{enquiry.subject}</Typography>
                </Box>
                {/* <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button> */}
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        {messages.name}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Typography color="black">
                        <b>{enquiry.name}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        {messages.email}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Typography color="black">
                        <b>{enquiry.emailId}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        {messages.message}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                        <Typography color="black">{enquiry.message}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* <DialogContentText sx={{ paddingBottom: '20px' }}>{messages.helperText.status}</DialogContentText>
          <DialogContentText sx={{ paddingBottom: '20px' }}>{getStatusLabel(enquiry.status)}</DialogContentText>
          <TextField
            id="outlined-select-status"
            required
            name="status"
            select
            label={messages.label.status}
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {statusOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={() => onClose()}>
          {messages.button.submit}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
