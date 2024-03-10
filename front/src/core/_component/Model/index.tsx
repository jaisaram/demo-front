import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface MuiModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick?: () => void;
  children: React.ReactNode;
}

// const useStyles: any = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '& .MuiDialog-paper': {
//         width: '100%',
//         maxWidth: '600px',
//         [theme.breakpoints.down('sm')]: {
//           margin: '32px',
//         },
//       },
//     },
//     buttonContainer: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginTop: '24px',
//     },
//     button: {
//       marginLeft: '16px',
//     },
//   })
// );

const Model: React.FC<MuiModelProps> = ({
  isOpen,
  onClose,
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  children,
}) => {
  //const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogContent>
        <DialogTitle sx={{padding: '5px 0'}}>{title}</DialogTitle>
        <DialogContentText  sx={{padding: '5px 0'}}>{description}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions >
        {secondaryButtonLabel && (
          <Button
            onClick={onSecondaryButtonClick}

            variant="outlined"
          >
            {secondaryButtonLabel}
          </Button>
        )}
        <Button
          onClick={onPrimaryButtonClick}

          variant="contained"
          color="primary"
        >
          {primaryButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Model;
