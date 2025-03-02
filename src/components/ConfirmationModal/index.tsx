import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import messages from './messages';
import { IConfirmationModalProps } from './types';

export default function ConfirmationModal({
  onClose,
  onConfirm,
  title,
  message,
  open
}: Readonly<IConfirmationModalProps>) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ paddingBottom: '20px' }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{messages.button.no}</Button>
        <Button onClick={onConfirm}>{messages.button.yes}</Button>
      </DialogActions>
    </Dialog>
  );
}
