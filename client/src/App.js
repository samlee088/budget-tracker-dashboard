import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import { themeSettings } from "theme";
import Layout from 'scenes/layout';
import Dashboard from 'scenes/dashboard';
import Expenses from 'scenes/expenses';
import Login from 'scenes/login';
import CalendarView from 'scenes/calendar';
import YearlyView from 'scenes/yearly';
import BreakdownView from 'scenes/breakdown';
import OverviewView from 'scenes/overview';

function useCurrentLocation() {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return location;
}


function App() {
  
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const getUserFromToken = (token) => {
    try{
      const user = jwtDecode(token);
      console.log(user)
      return user;
    } catch (error) {
      return null;
    } 
  }

  const token = localStorage.getItem('id_token');
  const user = getUserFromToken(token);
  const location = useCurrentLocation();

  useEffect(() => {
    if (!user && location !== '/') {
      window.location.href = '/'; // Redirect to homepage login
    }
  }, [user, location]);

  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {!user ? (
              <Route path='/' element={<Login />} />
            ) : (
              <Route element={<Layout />}>
                <Route path = '/' element={<Dashboard />} />
                <Route path = '/expenses' element={<Expenses />} />
                <Route path = '/calendar' element={<CalendarView />} />
                <Route path = '/yearly' element={<YearlyView/>} />
                <Route path = '/breakdown' element={<BreakdownView />} />
                <Route path = '/overview' element = { <OverviewView /> } />
              </Route>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
