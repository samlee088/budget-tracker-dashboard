import React, { useState, useRef } from 'react'
import { Box, Typography, typographyClasses } from '@mui/material';
import { useAddUserMutation, useLoginUserMutation } from 'state/api';
import Auth from '../../utils/auth';

const Login = () => {

  const loginUserNameRef = useRef(null);
  const loginPasswordRef = useRef(null);

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const userNameRef = useRef(null);

  const [loginResponse, setLoginResponse] = useState('')
  const [loginError, setLoginError] = useState('');
  
  const [addUserPost, { isLoading: isLoadingAddUser }] = useAddUserMutation();
  const [loginUserPost, { isLoading: isLoadingLoginUser }] = useLoginUserMutation();
  

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
      setLoginResponse(response.data.message);

      const { token, user } = response.data;

      console.log( token );
      console.log( user );

      Auth.login(token);

      // Handle the response here
    } catch (error) {
      console.error(error);
    }

  }


  const login = async (e) => {
    e.preventDefault();

    try {
      console.log(loginPasswordRef.current.value);
      console.log(loginUserNameRef.current.value);
  
      const response = await loginUserPost({
        password: loginPasswordRef.current.value,
        username: loginUserNameRef.current.value,
      });
  
      console.log(response);
  
      if (response.error) {
        // If there is an error, set the state with error data
        setLoginResponse(response.error.data.status);
        setLoginError(response.error.data.message);
      } else {
        // If there is no error, proceed with login logic
        const { user, token } = response.data;
  
        console.log(token);
        console.log(user);
  
        // Move Auth.login(token) before state-setting functions
        Auth.login(token);
      }
  
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
              ref = { loginUserNameRef }
              type = 'text'
              placeholder = 'User Name'
            />
            <input 
              ref = { loginPasswordRef }
              type = 'password'
              placeholder = 'Password'
            />
          </form>
        </Box>

        <Box sx={{ m: '20px' }}>
          {loginResponse && (
            <>
              <Typography>Login Response</Typography>
              <br />
              <Typography>{loginResponse}</Typography>
            </>
          )}
        </Box>

        <Box sx={{ m: '20px' }}>
            {loginError && (
              <>
                <Typography>Login Error</Typography>
                <br/>
                <Typography>{loginError}</Typography>
              </>
            )}
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
