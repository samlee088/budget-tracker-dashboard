import React, {useMemo} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box } from "@mui/material";

const localizer = momentLocalizer(moment);

   const events = [
     {
       start: new Date(),
       end: new Date(),
       title: 'Event 1',
     },
     {
       start: new Date(),
       end: new Date(),
       title: 'Event 2',
     },
   ];

const CalendarView = () => {

   

  return (
    <div>
        <h1>Hello Calendar</h1>

        <Box sx={{height:'100vh'}}>
            <Calendar localizer={localizer} events={events} />
        </Box>
    </div>
  )
}

export default CalendarView
