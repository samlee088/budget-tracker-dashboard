import React from 'react'
import ExpenseInput from 'components/ExpenseInput';
import { Box } from '@mui/material';

const Expenses = () => {
  return (
    <div>
      <h1>Expenses</h1>


      <Box>
        <ExpenseInput/>
      </Box>


    </div>
  )
}

export default Expenses
