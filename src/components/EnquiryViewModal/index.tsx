import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import messages from './messages';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { IEnquiryViewModalProps } from './types';
import EnquiryStatusChip from 'components/EnquiryStatusChip';

export default function EnquiryViewModal({ onClose, open, enquiry }: Readonly<IEnquiryViewModalProps>) {
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
                  <Typography variant="h5" color="black">
                    {enquiry.subject}
                  </Typography>
                </Box>
                <EnquiryStatusChip status={enquiry.status} />
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'center' }}>
                      <Box pr={3} pb={2}>
                        {messages.name}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Typography color="black">
                        <b>{enquiry.name}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'center' }}>
                      <Box pr={3} pb={2}>
                        {messages.email}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Typography color="black">
                        <b>{enquiry.emailId}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'center' }}>
                      <Box pr={3} pb={2}>
                        {messages.message}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Typography color="black">{enquiry.message}</Typography>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>{messages.button.ok}</Button>
      </DialogActions>
    </Dialog>
  );
}
