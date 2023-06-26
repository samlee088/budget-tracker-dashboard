import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { useGetExpensesQuery } from "state/api";
import { useAddPaymentMutation } from "state/api";

const CalendarView = () => {
  const localizer = momentLocalizer(moment);
  const { data, isLoading } = useGetExpensesQuery();
  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopupPayment, setShowPopupPayment] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [paymentDate, setPaymentDate] = React.useState("");
  const [paymentAmount, setPaymentAmount] = React.useState("");
  const [addPaymentPost] = useAddPaymentMutation();


  const events = useMemo(() => {
    console.log(data)
    if (!data) return [];
  
    return data.flatMap((expense) => {
      const expenseEvent = {
        start: new Date(expense.expectedPaymentDate),
        end: new Date(expense.expectedPaymentDate),
        title: expense.name,
        expenseId: expense._id,
        type: 'expense',
      };
  
      const paymentEvent = {
        start: new Date(expense.actualPaymentDate),
        end: new Date(expense.actualPaymentDate),
        title: expense.name,
        amount: expense.actualPaymentAmount,
        type: 'payment',
      };
  
      if (expense.actualPaymentDate) {
        return [paymentEvent, expenseEvent];
      }
  
      return [expenseEvent];
    });
  }, [data]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.type === 'expense' ? 'blue' : 'green',
      color: 'white',
    };

    return {
      style,
    };
  };

  
  
  const clickEvent = (event) => {
    if(event.type === 'expense') {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setShowPopup(true);
    } else {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setShowPopupPayment(true);
    }
    
  };

  const closePopupExpense = () => {
    setShowPopup(false);
  };

  const closePopupPayment = () => {
    setShowPopupPayment(false);
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
    <div>
      <Box sx={{ height: "100vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          views={[Views.MONTH]}
          onSelectEvent={clickEvent}
          eventPropGetter={eventStyleGetter}
        />
      </Box>
        <Dialog
        open={showPopup}
        onClose={closePopupExpense}
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
          <Button onClick={closePopupExpense}>Close</Button>
          <Button onClick={handleSubmitExpense}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showPopupPayment}
        onClose={closePopupPayment}
      >
        <DialogTitle>{selectedEvent?.title} Payment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{m:'20px'}}>
            Payment Date: {selectedEvent?.start.toLocaleString()} Payment Amount: {selectedEvent?.amount}
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
    </div>
  );
};

export default CalendarView;
