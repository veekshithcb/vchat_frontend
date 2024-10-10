import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId='784315048523-hc7pkmeraab01t2atpl7bfnscpek68n9.apps.googleusercontent.com'>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        preventDuplicate
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>

);

