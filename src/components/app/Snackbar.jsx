import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function CustomizedSnackbars({ open, message, severity, handleBreadClose }) {
    const [isOpen, setIsOpen] = React.useState(open);
  
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsOpen(false);
        handleBreadClose(); // Llama a handleClose cuando el Snackbar se cierre
      };
    React.useEffect(() => {
      setIsOpen(open);
    }, [open]);
  
    return (
      <div>
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert
            onClose={handleSnackbarClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }