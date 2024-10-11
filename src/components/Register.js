import { useSnackbar } from "notistack";
import axios from "axios";
import React, { useState } from 'react';

import { useNavigate, Link, Navigate } from "react-router-dom";
import "./Register.css";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Cookie from "universal-cookie";



const Register = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [authenticating, setAuthenticating] = useState(false);

  const navigate = useNavigate();

  const register = async (formData) => {

    try {
      // Replace the URL with your API endpoint
      const response = await axios.post('https://vchat.backend.projects.veekshith.dev/register', formData);

      navigate('/login');

      // Handle success
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }


  }

  let googleLogIn = () => {
    window.location.href = 'https://vchat.backend.projects.veekshith.dev/oauth2/authorization/google'
  }




  // var cookies = new Cookie();

  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  // const login = async (formData) => {


  //   cookies.set('JSESSIONID', 'Pacman');



  return (
    <Box className="content"

      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Stack spacing={2} className="form">
        <h2 className="title">Register</h2>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          title="username"
          name="username"
          placeholder="username"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="fullname"
          label="fullname"
          variant="outlined"
          title="fullname"
          name="fullname"
          placeholder="fullname"
          fullWidth
          onChange={handleChange}
        />

        <TextField
          id="email"
          label="email"
          variant="outlined"
          title="email"
          name="email"
          placeholder="email"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          title="password"
          name="password"
          placeholder="password"
          fullWidth
          onChange={handleChange}
        />
        {authenticating ? <Box sx={{ textAlign: 'center' }}> <CircularProgress /></Box> : <Button className="button" variant="contained" onClick={() => {
          register(formData)
        }}>
          Register
        </Button>}

        <p >
          Login with

        </p>

        <button className="gsi-material-button"
          onClick={googleLogIn}
        >
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg version="1.1" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span></span>
          </div>
        </button>

        <p className="secondary-action">
          Have an account?{" "}
          <Link className="link" to="/login">
            Login now
          </Link>
        </p>

      </Stack>
    </Box>


  )
}

export default Register