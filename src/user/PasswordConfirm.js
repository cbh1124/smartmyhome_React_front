import React,{useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signup, call, useridcheck, emailcheck, passwordfind } from "../service/ApiService";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        119vkfks@gmail.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
        primary: {
        // Purple and green play nicely together.
        main:  '#000000',
        },
        secondary: {
        // This is green.A700 as hex.
        main: '#000000',
        },
    },
});

export default function PasswordConfirm() {

  const [emailError, setEmailError] = useState('이메일을 입력해주세요');

  // 폼체크를 통해서 값 보내기 
  const [checked, setChecked] = useState(false);
  const [emailconfirm , setEmailConfirm] = useState(false);
  const [nameconfirm , setNameConfirm] = useState(false);
  const [passwordconfirm, setPasswordConfirm] = useState(false);
  const [repasswordconfirm, setrePasswordConfirm] = useState(false);

  // 이메일 onChange
  const emailChange = (e) => {
    const emailRegex =  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    emailcheck({ email : e.target.value }).then(
      (response) => {
        if(response){
          setEmailError("해당 이메일이 존재합니다.")
          setEmailConfirm(true);
        }
      }
    );
  
    if(!emailRegex.test(e.target.value) ){
      setEmailError("이메일 형식이 틀렸습니다.")
      setEmailConfirm(false);
    }else{
      setEmailError("올바른 이메일 형식입니다.")
      setEmailConfirm(true);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const email = data.get("email");
    
    if(emailconfirm ){
      passwordfind({ email: email }).then(
        (response) =>{
          console.log(response);
          if(response){
            window.location.href = "/passwordtemporary";
          }
        }
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            비밀번호 찾기
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label={emailError}
                        name="email"
                        autoComplete="email"
                        onChange = {emailChange}
                        />
                    </Grid>
                </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              비밀번호 찾기
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                    계정을 가지고 계신다면 로그인을 시도하세요
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}