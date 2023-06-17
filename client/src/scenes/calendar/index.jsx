import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { useGetExpensesQuery } from "state/api";
import Auth from '../../utils/auth';


const CalendarView = () => {
   
    const localizer = momentLocalizer(moment);
    
    const { data, isLoading } = useGetExpensesQuery();
    console.log(data);

    const events = [
        {
            start: new Date(),
            end: new Date(),
            title: "Event 1",
        },
        {
            start: new Date(),
            end: new Date(),
            title: "Event 2",
        },
    ];

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
