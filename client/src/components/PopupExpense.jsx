import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { useAddPaymentMutation } from "state/api";

const PopupExpense = ({ showPopup, setShowPopup, selectedEvent, paymentDate, setPaymentDate, paymentAmount, setPaymentAmount, expenseTrigger, setExpenseTrigger }) => {

    const [addPaymentPost] = useAddPaymentMutation();

    const closePopupExpense = () => {
        setShowPopup(false);
        setExpenseTrigger(false);
    };

    const handleSubmitExpense = async() => {

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
            
            closePopupExpense();

            setPaymentDate("");
            setPaymentAmount("");

        } catch(error) {
            console.error(error);
        }
    }


  return(
    <Box>
        <Dialog
            open={showPopup}
            onClose={closePopupExpense}
        >
            <DialogTitle sx={{ justifyContent: 'center', textAlign: 'center' }} >{selectedEvent?.title}</DialogTitle>
            <DialogContent sx={{ justifyContent: 'center', textAlign: 'center' }}>
                { expenseTrigger && 
                    <DialogContentText sx={{m:'20px'}}>
                        Due Date : {selectedEvent?.start.toLocaleString()}
                        <br/>
                        Due Amount : {selectedEvent?.expectedPayment}
                    </DialogContentText>
                }
                <DialogContentText sx={{m:'20px'}}>
                    Both fields must be filled out for an update. Payment Amount cannot be negative.
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
                <br/>
                <TextField
                    label="Payment Amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue !== "" && parseFloat(inputValue) >= 0) {
                        setPaymentAmount(inputValue);
                        }
                    }}
                    sx={{mt:'20px'}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closePopupExpense}>Close</Button>
                <Button onClick={handleSubmitExpense}>Submit</Button>
            </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PopupExpense
