import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { useGetExpensesQuery } from "state/api";
import { useAddPaymentMutation } from "state/api";
import PopupExpensePaid from 'components/PopupExpensePaid';
import PopupExpense from "components/PopupExpense";
import PopupPayment from "components/PopupPayment";

const CalendarView = () => {
  const localizer = momentLocalizer(moment);
  const { data} = useGetExpensesQuery();
  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopupPayment, setShowPopupPayment] = React.useState(false);
  const [showPopupPaymentExpensePaid, setShowPopupExpensePaid] = React.useState(false);
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
        title: `${expense.name} Expense`,
        expenseId: expense._id,
        type: expense.actualPaymentAmount? 'expensePaid' : 'expense',
      };
  
      const paymentEvent = {
        start: moment(expense.actualPaymentDate).add(1, 'day').toDate(),
        end: moment(expense.actualPaymentDate).add(1, 'day').toDate(),
        title: `${expense.name} Payment`,
        amount: expense.actualPaymentAmount,
        type: 'payment',
        expenseId: expense._id,
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
    } else if(event.type === 'expensePaid') {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setShowPopupExpensePaid(true);
      
    } else {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setShowPopupPayment(true);
    }
    
  };


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
      <PopupPayment
        selectedEvent = { selectedEvent }
        setShowPopupPayment = { setShowPopupPayment }
        showPopupPayment = { showPopupPayment }
        paymentDate = { paymentDate }
        setPaymentDate = { setPaymentDate }
        paymentAmount = { paymentAmount }
        setPaymentAmount = { setPaymentAmount }
      />
      <PopupExpense
        selectedEvent = { selectedEvent }
        setShowPopup = { setShowPopup }
        showPopup = { showPopup }
        paymentDate = { paymentDate }
        setPaymentDate = { setPaymentDate }
        paymentAmount = { paymentAmount }
        setPaymentAmount = { setPaymentAmount }
      />
      <PopupExpensePaid 
        setShowPopupExpensePaid={setShowPopupExpensePaid} showPopupPaymentExpensePaid ={showPopupPaymentExpensePaid}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default CalendarView;