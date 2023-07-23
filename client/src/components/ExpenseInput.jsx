import React, { useRef }  from 'react'
import { Box } from '@mui/material';
import { useAddExpenseMutation } from 'state/api';
import Auth from '../utils/auth';
import { useState } from 'react';
import moment from 'moment';

const ExpenseInput = () => {

    const nameRef = useRef(null);
    const occurrenceRef = useRef(null);
    const dayRef = useRef(null);
    const expectedPaymentRef = useRef(null);
    const [response, setResponse] = useState('')

    const [addExpensePost, {isLoading}] = useAddExpenseMutation();

    const addExpense = async (e) => {
        e.preventDefault();


        try{
            console.log(nameRef.current.value);
            console.log(occurrenceRef.current.value);
            console.log(dayRef.current.value)
            console.log(expectedPaymentRef.current.value)

             // Convert the date string to local time zone before saving it
            const localDateTime = moment(dayRef.current.value).format(); 

            
            const response = await addExpensePost({
              name: nameRef.current.value,
              frequency: occurrenceRef.current.value,
              expectedPaymentDate: localDateTime,
              expectedPaymentAmount: expectedPaymentRef.current.value,  
              user: Auth.getProfile(),
            })

            console.log(response);

            const expense = response.data;
            setResponse(expense.name);
            console.log(expense);

        } catch (error) {
            console.error(error);

        }
        
    }

  return (
    <Box>
        <Box>
            <form>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
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

        <Box>
            <h1>Successful input for {response}</h1>
        </Box>

    </Box>
  )
}

export default ExpenseInput
