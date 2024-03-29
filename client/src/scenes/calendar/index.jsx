import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, } from "@mui/material";
import { useGetExpensesQuery } from "state/api";
import { useAddPaymentMutation } from "state/api";
import PopupExpensePaid from 'components/PopupExpensePaid';
import PopupExpense from "components/PopupExpense";
import PopupPayment from "components/PopupPayment";

const CalendarView = () => {
  const localizer = momentLocalizer(moment);
  const { data} = useGetExpensesQuery();
  const [ showPopup, setShowPopup ] = React.useState(false);
  const [ showPopupPayment, setShowPopupPayment ] = React.useState(false);
  const [ showPopupPaymentExpensePaid, setShowPopupExpensePaid ] = React.useState(false);
  const [ selectedEvent, setSelectedEvent ] = React.useState(null);
  const [ paymentDate, setPaymentDate ] = React.useState("");
  const [ paymentAmount, setPaymentAmount ] = React.useState("");
  const [ addPaymentPost ] = useAddPaymentMutation();
  const [ expenseTrigger, setExpenseTrigger ] = React.useState(false);
  const [ expensePaidTrigger, setExpensePaidTrigger ] = React.useState(false);
  const [ paymentTrigger, setPaymentTrigger ] = React.useState(false);
  

  const events = useMemo(() => {
    console.log(data)
    if (!data) return [];
    const today = moment();
  
    return data.flatMap((expense) => {
      const expenseEvent = {
        start: new Date(expense.expectedPaymentDate),
        end: new Date(expense.expectedPaymentDate),
        title: `${expense.name} Expense`,
        expenseId: expense._id,
        expectedPayment: expense.expectedPaymentAmount,
        type: expense.actualPaymentAmount? 'expensePaid' :  (new Date(expense.expectedPaymentDate) < new Date(today)) ? 'late' : 'expense',
        paymentDate: expense.actualPaymentAmount? moment(expense.actualPaymentDate).toDate() : '',
        paymentAmount : expense.actualPaymentAmount? expense.actualPaymentAmount: '',
      };
  
      const paymentEvent = {
        originalDueDate : new Date(expense.expectedPaymentDate),
        start: moment(expense.actualPaymentDate).toDate(),
        end: moment(expense.actualPaymentDate).toDate(),
        title: `${expense.name} Payment`,
        amount: expense.actualPaymentAmount,
        type: 'payment',
        expenseId: expense._id,
      };
  
      if (expense.actualPaymentDate) {
        return [paymentEvent, expenseEvent];
      }
      console.log(expenseEvent)
      return [expenseEvent];
    });
  }, [data]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.type === 'payment' ? 'green' : event.type === 'expensePaid' ? 'blue' : event.type === 'late' ? 'red' : 'orange',
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
      setExpenseTrigger(true);
      console.log(selectedEvent)
      setShowPopup(true);
      console.log(showPopup)

    } else if(event.type === 'expensePaid') {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setExpensePaidTrigger(true);
      setShowPopupExpensePaid(true);
    } else if (event.type === 'late') {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setExpenseTrigger(true);
      console.log(selectedEvent)
      setShowPopup(true);
      console.log(showPopup)
    }else {
      console.log(event);
      const mongoExpenseId = event.expenseId;
      console.log(mongoExpenseId);
      setSelectedEvent(event);
      setPaymentTrigger(true);
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
        paymentTrigger = { paymentTrigger }
        setPaymentTrigger = { setPaymentTrigger }
      />
      <PopupExpense
        selectedEvent = { selectedEvent }
        setShowPopup = { setShowPopup }
        showPopup = { showPopup }
        paymentDate = { paymentDate }
        setPaymentDate = { setPaymentDate }
        paymentAmount = { paymentAmount }
        setPaymentAmount = { setPaymentAmount }
        expenseTrigger = { expenseTrigger }
        setExpenseTrigger = { setExpenseTrigger }
      />
      <PopupExpensePaid 
        selectedEvent = { selectedEvent }
        setShowPopupExpensePaid = { setShowPopupExpensePaid } 
        showPopupPaymentExpensePaid = { showPopupPaymentExpensePaid }
        expensePaidTrigger = { expensePaidTrigger }
        setExpensePaidTrigger = { setExpensePaidTrigger }
      />
    </div>
  );
};

export default CalendarView;