import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { useGetExpensesQuery } from "state/api";


const CalendarView = () => {
   
    const localizer = momentLocalizer(moment);
    
    const { data, isLoading } = useGetExpensesQuery();
    console.log(data);

    const events = useMemo(() => {
        if (!data) return [];
    
        return data.map((expense) => ({
          start: new Date(expense.expectedPaymentDate),
          end: new Date(expense.expectedPaymentDate),
          title: expense.name,
        }));
      }, [data]);

  return (
    <div>
      <Box sx={{ height: "100vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          views={[Views.MONTH]}
        />
      </Box>
    </div>
  );
};

export default CalendarView;