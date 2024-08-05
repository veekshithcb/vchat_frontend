import { useSnackbar } from "notistack";
import axios from "axios";
import React, { useState } from 'react';

import { useNavigate ,Link } from "react-router-dom";
import "./Login.css";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Cookie from "universal-cookie";



const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  var cookies = new Cookie();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const login = async (formData) => {


    cookies.set('JSESSIONID', 'Pacman');

    if (validateInput(formData)) {
      try {
        setAuthenticating(true);
        const response = await axios.post(`/auth/login`, formData);
        enqueueSnackbar("Logged in successfully", { variant: 'success' });
        let { token, username, balance } = response.data;
        persistLogin(token, username, balance);

        navigate('/chat');
        console.log(response.data);

      } catch (error) {
        if (error.response && error.response.status === 400) {
          enqueueSnackbar(error.response.data.message, { variant: "error" })
          console.log(error.response.data.message);
        }
        else {
          const errorMessage = "Something went wrong. Check that the backend is running, reachable, and returns valid JSON.";
          enqueueSnackbar(errorMessage, { variant: "error" });

        }
      } finally {
        setAuthenticating(false);
      }
    }

    const validateInput = (data) => {
      if (!data.username) {
        enqueueSnackbar("Username is a required field", { variant: 'warning' })
        return false;
      }
      if (!data.password) {
        enqueueSnackbar("Password is a required field", { variant: 'warning' })
        return false;
      }
      return true;
    };

    const persistLogin = (token, username, balance) => {
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('balance', balance);
    };

  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="username"
            name="username"
            placeholder="Username"
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            title="password"
            name="Password"
            placeholder="Password"
            fullWidth
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
          {authenticating? <Box sx={{textAlign:'center'}}> <CircularProgress /></Box>:<Button className="button" variant="contained" onClick={()=>{
            login({username,password})
           }}>
            LOGIN TO QKART
           </Button>}

           <p className="secondary-action">
           Don’t have an account?{" "}
             <Link className="link" to="/register">
             Register now
             </Link>
          </p>
        </Stack>
      </Box>
    </Box>

  )
}

export default Login