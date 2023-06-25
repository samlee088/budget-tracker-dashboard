import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useGetExpensesQuery } from 'state/api';
import {Box, useTheme } from '@mui/material';


const ExpenseDataGrid = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetExpensesQuery();

    
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
                rows={data || []}
                columns={columns}
                />
            </Box>
            </Box>
        </div>
    )
}

export default ExpenseDataGrid
