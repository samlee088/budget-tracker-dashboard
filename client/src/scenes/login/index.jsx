import React, { useState, useRef } from 'react'
import { Box, Typography } from '@mui/material';
import { useAddUserMutation } from 'state/api';

const Login = () => {

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const userNameRef = useRef(null);
  const [addUserPost, { isLoading }] = useAddUserMutation();

  const register = async (e) => {
    e.preventDefault();

    try {
      console.log(emailRef.current.value);
      console.log(passRef.current.value);
      console.log(userNameRef.current.value);
      
      const response = await addUserPost({
          email: emailRef.current.value,
          password: passRef.current.value,
          username: userNameRef.current.value,
      },
      );

      console.log(response);

      // Handle the response here
    } catch (error) {
      console.error(error);
    }

  }


  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await addUserPost({
        body: {
          email: emailRef.current.value,
          password: passRef.current.value,
        },
      });

      // Handle the response here
    } catch (error) {
      console.error(error);
    }
  };

  



  return (
    <div>
      <h1>Login Page</h1>
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column'
    }}>

    <button type = 'submit' onClick = { login }>
      Login
    </button>

      <Box sx={{m: '20px'}}>
        <form>
          <input
            ref = { emailRef }
            type = 'email'
            placeholder = 'Email Address'
          />
          <input 
            ref = { passRef }
            type = 'password'
            placeholder = 'Password'
          />
        </form>
      </Box>

    <button type = 'submit' onClick = { register }>
      Sign Up
    </button>

      <Box sx={{m: '20px'}}>
        <form>
            <input
              ref = { emailRef }
              type = 'email'
              placeholder = 'Email Address'
            />
            <input 
              ref = { passRef }
              type = 'password'
              placeholder = 'Password'
            />
              <input 
              ref = { userNameRef }
              type = 'text'
              placeholder = 'User Name'
            />
            </form>
        </Box>
    </Box>

    </div>
  )
}

export default Login
