import { Box } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useGetExpensesQuery } from "state/api";


const OverviewView = () => {

    const [payment, setPayment] = useState(0);

    const {data} = useGetExpensesQuery();

    useEffect(() => {
        if (data) {
          let totalPayment = 0;
          data.forEach((expense) => {
            if (expense.actualPaymentAmount) {
              let delta = expense.expectedPaymentAmount - expense.actualPaymentAmount;
              totalPayment += delta;
            }
          });
          setPayment(totalPayment);
        }
      }, [data]);


  return (
    <Box>
        <Box>
            <h1>Overview</h1>
        </Box>

        <Box
         sx={{m: '20px', justifyContent: 'center', textAlign: 'center' }}
        >
            <h1>Projects vs Actual Payments Total Lifetime</h1>
            <h2>${payment}</h2>
            <br/>
            <h3> Positive is Savings, Negative is overpayment to expected</h3>

        </Box>
   </Box>

    )
}

export default OverviewView
