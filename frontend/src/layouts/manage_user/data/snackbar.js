import React, { useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
function Snackbar2() {
  const [openSnack, setOpenSnack] = useState(false);

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleSnackClick}>
        Open Snackbar
      </Button>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Snackbar2;