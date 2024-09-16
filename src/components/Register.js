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
      const response = await axios.post('http://localhost:8088/register', formData);

      navigate('/login');

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