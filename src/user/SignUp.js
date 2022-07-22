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
import { signup, call, useridcheck, emailcheck } from "../service/ApiService";

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

export default function SignUp() {

  const [emailError, setEmailError] = useState('이메일을 입력해주세요');
  const [passwordError, setPasswordError] = useState('비밀번호 (숫자+영문자+특수문자 8자리 이상)');
  const [repasswordError, resetPasswordError] = useState('비밀번호를 재입력해주세요');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [nameError, setNameError] = useState('이름');

  // 폼체크를 통해서 값 보내기 
  const [checked, setChecked] = useState(false);
  const [emailconfirm , setEmailConfirm] = useState(false);
  const [nameconfirm , setNameConfirm] = useState(false);
  const [passwordconfirm, setPasswordConfirm] = useState(false);
  const [repasswordconfirm, setrePasswordConfirm] = useState(false);

  // username onChange
  const nameChange = (e) => {
    useridcheck({ username: e.target.value }).then(
      (response) => {
        if(response){
          setNameError("아이디가 중복되었습니다.")
          setNameConfirm(false);
        }
      }
    );

    if(e.target.value.length < 2 || e.target.value.length > 12 ){
      setNameError("2글자 이상 12글자 미만으로 입력해주세요.")
      setNameConfirm(false);
    }else{
      setNameError("올바른 이름입니다. ")
      setNameConfirm(true);
    }
  }

  // 이메일 onChange
  const emailChange = (e) => {
    const emailRegex =  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    emailcheck({ email : e.target.value }).then(
      (response) => {
        if(response){
          setEmailError("이메일이 중복되었습니다.")
          setEmailConfirm(false);
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

  // 비밀번호 onChange
  const passwordChange = (e) => {
    setTemporaryPassword(e.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(!passwordRegex.test(e.target.value) ){
      setPasswordError("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요")
      setPasswordConfirm(false)
    }else{
      setPasswordError("올바른 비밀번호 형식입니다.")
      setPasswordConfirm(true)
    }
  }

  // 비밀번호 onChange
  const repasswordChange = (e) => {
    if(temporaryPassword !== e.target.value){
      resetPasswordError("비밀번호가 일치하지 않습니다.")
      setrePasswordConfirm(false)
    }
    else if(!passwordconfirm){
      resetPasswordError("위 비밀번호의 형식에 맞춰 입력해주세요")
    }
    else{
      resetPasswordError("비밀번호가 일치합니다.")
      setrePasswordConfirm(true)
    }
  }

  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    if(checked && emailconfirm && nameconfirm && passwordconfirm && repasswordconfirm){
      signup({ email: email, username: username, password: password }).then(
        (response) => {
          // 계정 생성 성공 시 login페이지로 리디렉트
          window.location.href = "/login";
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
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={nameError}
                  name="username"
                  autoComplete="username"
                  onChange = {nameChange}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={passwordError}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {passwordChange}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label={repasswordError}
                    onChange ={repasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleAgree} color="primary" />}
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="smarthome 가입에 동의하시나요?"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
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