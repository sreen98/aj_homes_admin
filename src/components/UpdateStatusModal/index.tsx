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
import { MenuItem } from '@mui/material';
import { IUpdateStatusModalProps } from './types';
import { getStatusLabel } from 'utils';

export default function UpdateStatusModal({ onClose, open, property, onSubmit }: Readonly<IUpdateStatusModalProps>) {
  const [status, setStatus] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const status = formJson.status;
    console.log(status);
    onSubmit(status.toString());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{property.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: '20px' }}>{messages.helperText.status}</DialogContentText>
          <DialogContentText sx={{ paddingBottom: '20px' }}>
            {messages.helperText.currentStatus} - {getStatusLabel(property.status)}
          </DialogContentText>
          <TextField
            sx={{ width: '350px' }}
            id="outlined-select-statu"
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
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{messages.button.cancel}</Button>
          <Button type="submit">{messages.button.submit}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
