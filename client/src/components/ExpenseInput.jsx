import React, { useRef }  from 'react'
import { Box } from '@mui/material';
import { useAddExpenseMutation } from 'state/api';
import Auth from '../utils/auth';

const ExpenseInput = () => {

    const nameRef = useRef(null);
    const occurrenceRef = useRef(null);
    const dayRef = useRef(null);
    const expectedPaymentRef = useRef(null);

    const [addExpensePost, {isLoading}] = useAddExpenseMutation();

    const addExpense = async (e) => {
        e.preventDefault();


        try{
            console.log(nameRef.current.value);
            console.log(occurrenceRef.current.value);
            console.log(dayRef.current.value)
            console.log(expectedPaymentRef.current.value)

            
            const response = await addExpensePost({
              name: nameRef.current.value,
              frequency: occurrenceRef.current.value,
              expectedPaymentDate: dayRef.current.value,
              expectedPaymentAmount: expectedPaymentRef.current.value,  
              user: Auth.getProfile(),
            })

            console.log(response);

            const expense = response.data;

            console.log(expense);

        } catch (error) {
            console.error(error);

        }
        
    }

  return (
    <Box>
        <form>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '50%'}}>
            <input
                ref = { nameRef }
                type = 'text'
                placeholder = 'Name'
            />
            <select id='occurrence' name='frequency' ref={occurrenceRef}>
                <option value='once'>Once</option>
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='bi-weekly'>Bi-Weekly</option>
                <option value='monthly'>Monthly</option>
                <option value='semi-annual'>Semi-Annual</option>
            </select>
            <input
                ref = { dayRef }
                type = 'date'
                placeholder = 'Due Date'
            />
            <input 
                ref = {expectedPaymentRef}
                type="number" 
                id="dollar-input" 
                name="dollar-input" 
                min="0.00" 
                max="10000.00"
                placeholder = "Expected Payment Amount"
            />
            <button onClick={addExpense}> 
                Add Expense 
            </button>
            </Box>
        </form>

    </Box>
  )
}

export default ExpenseInput
