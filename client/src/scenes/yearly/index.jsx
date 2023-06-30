import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { Box } from '@mui/material'
import { useGetExpensesQuery } from "state/api";
import { useMemo } from 'react';
import moment from "moment";

const YearlyView = () => {

    const { data} = useGetExpensesQuery();

    const events = useMemo(() => {
        console.log(data)
        if (!data) return [];
        
        const today = moment();
      
        const eventsList = data.flatMap((expense) => {
            const day = new Date(expense.expectedPaymentDate)
            const formattedDay = day.toISOString().split('T')[0]

          const expenseEvent = {
           value: expense.actualPaymentAmount? Math.ceil((new Date(expense.expectedPaymentDate) - new Date(expense.actualPaymentDate)) / (1000 * 60 * 60 * 24)) : 0,
           day: formattedDay
          };
      
          return expenseEvent;
        });
        console.log(eventsList)

        return eventsList

    }, [data]);

  return (
    <Box 
    mt='40px'
    height='75vh'
    borderRadius='4px'>
        <ResponsiveCalendar
            data={events}
            from = {moment().subtract(1, "year").format("YYYY-MM-DD")}
             to={moment().add(1, "year").format("YYYY-MM-DD")}
            emptyColor="#eeeeee"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    </Box>
  )
}

export default YearlyView
