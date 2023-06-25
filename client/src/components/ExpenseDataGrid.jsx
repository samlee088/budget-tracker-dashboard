import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useGetExpensesQuery } from 'state/api';
import {Box, useTheme } from '@mui/material';
import moment from 'moment';

const ExpenseDataGrid = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetExpensesQuery();

    let convertedData = [];
    if (data) {
      convertedData = data.map((expense) => {
        const convertedExpense = { ...expense }; // Create a copy of the expense object
  
        // Convert UTC dates to non-UTC using Moment.js
        convertedExpense.expectedPaymentDate = moment.utc(expense.expectedPaymentDate).local().format('YYYY-MM-DD');
        convertedExpense.actualPaymentDate = moment.utc(expense.actualPaymentDate).local().format('YYYY-MM-DD');
  
        return convertedExpense;
      });
    }
    
    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "frequency",
            headerName: "Frequency",
            flex: 1.0,
        },
        {
            field: "expectedPaymentDate",
            headerName: "Payment Due Date",
            flex: 1.0,
        },
        {
            field: "expectedPaymentAmount",
            headerName: "Payment Payment Amount",
            flex: 1.0,
        },
        {
            field: "actualPaymentDate",
            headerName: "Payment Date",
            flex: 1.0,
        },
        {
            field: "actualPaymentAmount",
            headerName: "Payment Amount",
            flex: 1.0,
        },

    
    ];
    return (
        <div>
                    <Box m="1.5rem 2.5rem">
            <Box
                mt="40px"
                height="75vh"
                sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                },
                }}
            >
                <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={convertedData || []}
                columns={columns}
                />
            </Box>
            </Box>
        </div>
    )
}

export default ExpenseDataGrid
