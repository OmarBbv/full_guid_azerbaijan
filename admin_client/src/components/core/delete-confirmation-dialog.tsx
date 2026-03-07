'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title = 'Silinməni təsdiqlə',
  description = 'Bu elementi silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.',
  isLoading = false,
}: DeleteConfirmationDialogProps): React.JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading} color="inherit">
          Ləğv et
        </Button>
        <Button onClick={onConfirm} disabled={isLoading} color="error" variant="contained" autoFocus>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sil'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
