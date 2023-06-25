import React from 'react'
import { Box } from '@mui/material';
import ExpenseInput from 'components/ExpenseInput';
import ExpenseDataGrid from 'components/ExpenseDataGrid';

const Expenses = () => {
  return (
    <div>
      <h1>Expenses</h1>


      <Box>
        <ExpenseInput/>
      </Box>

      <Box>
        <ExpenseDataGrid/>
      </Box>


    </div>
  )
}

export default Expenses
