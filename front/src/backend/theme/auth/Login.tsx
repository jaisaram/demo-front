import React, { useState, useEffect } from "react";
//@ts-ignore
import { loginRequest } from "@/backend/state/data-layer/auth";
import { connect } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ImageListItem } from "@mui/material";

const Login = (props: any) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') && data.get('password')) {
      props.loginRequest({ email: data.get('email'), password: data.get('password') });

    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        
        <Avatar sx={{ width: 70, height: 70, backgroundColor: '#fff', border: '1px solid #1565c0', padding: '10px' }}>
          <ImageListItem>
            <img
              src={`/assets/images/demoUserLogin.webp?w=164&h=164&fit=crop&auto=format`}
              srcSet={`@/assets/images/demoUserLogin.webp?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={"Demo User"}
              loading="lazy"
            />
          </ImageListItem>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}


const mapDispatchState = (dispatch: any) => {
  return {
    loginRequest: (payload: any) => dispatch(loginRequest(payload)),
  };
};
export default connect(null, mapDispatchState)(Login)
