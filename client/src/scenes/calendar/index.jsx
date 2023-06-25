import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { useGetExpensesQuery } from "state/api";

const CalendarView = () => {
  const localizer = momentLocalizer(moment);
  const { data, isLoading } = useGetExpensesQuery();
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [paymentDate, setPaymentDate] = React.useState("");
  const [paymentAmount, setPaymentAmount] = React.useState("");

  const events = useMemo(() => {
    if (!data) return [];

    return data.map((expense) => ({
      start: new Date(expense.expectedPaymentDate),
      end: new Date(expense.expectedPaymentDate),
      title: expense.name,
      expenseId: expense._id,
    }));
  }, [data]);

  const clickEvent = (event) => {
    console.log(event);
    const mongoExpenseId = event.expenseId;
    console.log(mongoExpenseId);
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async() => {

    closePopup();
  }

  return (
    <div>
      <Box sx={{ height: "100vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          views={[Views.MONTH]}
          onSelectEvent={clickEvent}
        />
      </Box>
        <Dialog
        open={showPopup}
        onClose={closePopup}
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
          <Button onClick={closePopup}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarView;
