import { useSnackbar } from "notistack";
import axios from "axios";
import React, { useState } from 'react';

import { useNavigate, Link, Navigate } from "react-router-dom";
import "./Login.css";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Cookie from "universal-cookie";



const Login = () => {
  
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
      const response = await axios.post('http://localhost:8088/login', formData);
      localStorage.setItem("username",formData.username);
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