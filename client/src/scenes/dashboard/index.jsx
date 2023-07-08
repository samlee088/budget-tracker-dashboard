import React from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const theme = useTheme();
  const colors = [
      theme.palette.secondary[500],
      theme.palette.secondary[300],
      theme.palette.primary[100],
 
  ]

  const menuOptions = [
    { page: 'Homepage', path: '/', description:'Homepage' },
    { page: 'Expenses', path: '/expenses', description: 'Add expenses and view expenses in data grid' },
    { page: 'Overview', path: '/overview', description: 'View overall under/over budget' },
    { page: 'Calendar', path: '/calendar', description: 'View in calendar view' },
    { page: 'Yearly', path: '/yearly', description: 'View in whole year overview' },
    { page: 'Breakdown', path: '/breakdown', description: 'View pie chart breakdown' },
  ]


  return (
    <div>
      <h1>Dashboard</h1>
       <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
        }}
      >
        {menuOptions.map(({ page, path, description }) => (
          <Card
            key={page}
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link to={path} style={{ textDecoration: 'none' }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.primary[100]} gutterBottom>
                  {page}
                </Typography>
                <br />
                <Typography variant="body2" color={theme.palette.secondary[500]}>
                  {description}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
      
    </div>
  )
}

export default Dashboard
