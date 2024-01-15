import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidate,setEmailValidate]=useState(false)
  const [userNotFound,setUserNotFound]=useState("")
  const [invalidPassword,setInvalidPassword]=useState("")
  const auth=useAuth()
  const navigate=useNavigate()

  const isEmailValid = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const logInSub=(email,password)=> {
    axios.post('http://localhost:5000/login-user', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        const data=response.data
        console.log(data);
        if(data?.data?.length > 0)
        {
          localStorage.setItem('user', JSON.stringify(data.user));
          window.localStorage.setItem("loggedIn", true);
          auth.login(data.user)
          navigate('/dashboard')
        } else if(data.error==="User not found") {
          setUserNotFound(data.error)
        }
        else if(data.error==="Invalid Password")
        {
          setInvalidPassword("Invalid Password")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const handleLogin = () => {
    if (!isEmailValid(username)) {
      setEmailValidate(true)
    }
    // Implement your login logic here
    logInSub(username,password)
  };

  return (
    <Container component="main" maxWidth="xs" className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}>
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: '100%', marginTop: '20px' }} noValidate>
          <TextField
            error={emailValidate || !!userNotFound}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="Email"
            autoComplete="email"
            autoFocus
            value={username}
            helperText={((emailValidate && "Incorrect email.") ||userNotFound)}
            onChange={(e) =>{
              setEmailValidate(false)
              setUsername(e.target.value)}}
          />
          <TextField
            error={!!invalidPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={invalidPassword}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
        <Link
            fullWidth
            onClick={()=>{}}
            style={{ marginTop: '20px' }}
            to={"/signup"}
          >
            New User for Sign Up
          </Link>
      </Paper>
    </Container>
  );
};

export default Login;

