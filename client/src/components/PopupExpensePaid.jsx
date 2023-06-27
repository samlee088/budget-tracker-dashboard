import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";

const PopupExpensePaid = ({setShowPopupExpensePaid, showPopupPaymentExpensePaid, selectedEvent}) => {


  const closePopupExpensePaid = () => {
    setShowPopupExpensePaid(false);
  };

  return (
    <Box>

      <Dialog
        open={showPopupPaymentExpensePaid}
        onClose={closePopupExpensePaid}
      >
        <DialogTitle>{selectedEvent?.title} Payment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{m:'20px'}}>
            Payment Date: {selectedEvent?.start.toLocaleString()} Payment Amount: {selectedEvent?.amount}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopupExpensePaid}>Close</Button>
          <Button>Submit</Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  )
}

export default PopupExpensePaid
