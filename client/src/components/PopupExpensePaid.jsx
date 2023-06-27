import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const PopupExpensePaid = ({ setShowPopupExpensePaid, showPopupPaymentExpensePaid, selectedEvent, expensePaidTrigger, setExpensePaidTrigger }) => {

    const closePopupExpensePaid = () => {
        setShowPopupExpensePaid(false);
        setExpensePaidTrigger(false);
    };

    return (
        <Box>
            <Dialog
                open={showPopupPaymentExpensePaid}
                onClose={closePopupExpensePaid}
            >
                <DialogTitle sx={{ justifyContent: 'center', textAlign: 'center' }}>{selectedEvent?.title}</DialogTitle>
                <DialogContent sx={{ justifyContent: 'center', textAlign: 'center' }}>
                    <DialogContentText>
                        This has been paid
                    </DialogContentText>
                    {expensePaidTrigger && (
                        <DialogContentText sx={{ m: '20px' }}>
                            Payment Date: {selectedEvent?.paymentDate.toLocaleString()} Payment Amount: {selectedEvent?.paymentAmount}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopupExpensePaid}>Close</Button>
                    <Button>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PopupExpensePaid;
