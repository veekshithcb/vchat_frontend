import { useSnackbar } from "notistack";
import axios from "axios";
import React, { useState } from 'react';

import { useNavigate, Link, Navigate } from "react-router-dom";
import "./Login.css";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

import jwt from "jwt-decode";
import Google from "../img/web_neutral_sq_na@3x.png"
import Cookies from "universal-cookie";



const Login = () => {

  const cookies = new Cookies(null, { path: '/' });


  const [authenticating, setAuthenticating] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const login = async (formData) => {

    try {
      
      // Replace the URL with your API endpoint
      const response = await axios.post('https://vchat-backend-ti7v.onrender.com/login', formData, {}, { withCredentials: true });

      // const response = await  axios.post('https://vchat-backend-ti7v.onrender.com/login', {formData}, {
      //   withCredentials: true, // This allows cookies to be sent and received
      // })

      cookies.set('token', response.data);
      console.log(cookies.get('token')); // Pacman
      localStorage.setItem("username", formData.username);
      navigate('/');

      // Handle success
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }


  }




  // var cookies = new Cookie();

  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  // const login = async (formData) => {


  //   cookies.set('JSESSIONID', 'Pacman');


  let googleLogIn = () => {
    window.location.href = 'https://vchat-backend-ti7v.onrender.com/oauth2/authorization/google'
  }

  let msLogIn = () => {
    window.location.href = 'https://vchat-backend-ti7v.onrender.com/oauth2/authorization/microsoft'
  }


  return (
    <Box className="content"

      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
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
          login(formData)
        }}>
          LOGIN TO QKART
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
          Don’t have an account?{" "}
          <Link className="link" to="/register">
            Register now
          </Link>
        </p>
      </Stack>
    </Box>



  )
}

export default Login