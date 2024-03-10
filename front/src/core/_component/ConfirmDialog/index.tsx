import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfirmationDialogProps {
    title: string;
    message: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    title,
    message,
    open,
    onClose,
    onConfirm,
  }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">{message}</Typography>
        </DialogContent>
        <DialogActions sx={{padding: '15px'}}>
        
          <Button variant="outlined" onClick={onClose} color="info">Cancel</Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  export default ConfirmationDialog;