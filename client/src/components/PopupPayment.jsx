import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { useAddPaymentMutation } from "state/api";

const PopupPayment = ({ showPopupPayment, setShowPopupPayment, selectedEvent, paymentDate, setPaymentDate, paymentAmount, setPaymentAmount }) => {
    const [addPaymentPost] = useAddPaymentMutation();

    const closePopupPayment = () => {
        setShowPopupPayment(false);
      };

      const handleSubmitPayment = async() => {

        try{
          console.log(selectedEvent.expenseId);
          console.log(paymentAmount);
          console.log(paymentDate);
    
        const addPaymentResponse = await addPaymentPost({
          _id: selectedEvent.expenseId,
          actualPaymentAmount: paymentAmount,
          actualPaymentDate: paymentDate
        })
    
        console.log(addPaymentResponse);
        
        closePopupPayment();
    
        setPaymentDate("");
        setPaymentAmount("");
        
    
    
        } catch(error) {
          console.error(error);
        }
       
      }


  return (
    <Box>
    <Dialog
        open={showPopupPayment}
        onClose={closePopupPayment}
    >
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>
        <DialogContentText sx={{m:'20px'}}>
            Expense ID: {selectedEvent?.expenseId}
        </DialogContentText>
        <TextField
            label="Payment Date"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <TextField
            label="Payment Amount"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={closePopupPayment}>Close</Button>
        <Button onClick={handleSubmitPayment}>Submit</Button>
        </DialogActions>
    </Dialog>
</Box>
  )
}

export default PopupPayment
