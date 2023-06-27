import React, { useState } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { useAddPaymentMutation } from "state/api";

const PopupPayment = ({ showPopupPayment, setShowPopupPayment, selectedEvent, paymentDate, setPaymentDate, paymentAmount, setPaymentAmount, paymentTrigger, setPaymentTrigger }) => {
    const [addPaymentPost] = useAddPaymentMutation();

    const closePopupPayment = () => {
        setShowPopupPayment(false);
        setPaymentTrigger(false);
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
                <DialogTitle sx={{justifyContent: 'center', textAlign: 'center'}}>{selectedEvent?.title}</DialogTitle>
                {
                    paymentTrigger && 
                    <DialogTitle sx={{justifyContent: 'center', textAlign: 'center'}}>{selectedEvent?.originalDueDate.toLocaleString()}</DialogTitle>
                }
                <DialogContent sx={{justifyContent: 'center', textAlign: 'center'}}>
                    <DialogContentText sx={{m:'20px'}}>
                        Payment Date: {selectedEvent?.start.toLocaleString()}
                        <br/>
                        Payment Amount : {selectedEvent?.amount}
                        <br/>
                        

                    </DialogContentText>
                    <DialogContentText sx={{m:'20px'}}>
                    Both fields must be filled out for an update. Payment Amount cannot be negative.
                    </DialogContentText>
                    <TextField
                        label=" Updated Payment Date"
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <br/>
                    <TextField
                        label="Updated Payment Amount"
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
                <Button onClick={closePopupPayment}>Close</Button>
                <Button onClick={handleSubmitPayment}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PopupPayment
