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
import { signup, call, useridcheck, emailcheck, temporaryauth } from "../service/ApiService";

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


function PasswordTemporary(){


    const [passwordError, setPasswordError] = useState('비밀번호 (숫자+영문자+특수문자 8자리 이상)');
    const [repasswordError, resetPasswordError] = useState('비밀번호를 재입력해주세요');
    const [temporaryError, setTemporaryError] = useState('인증번호');
    const [temporaryPassword, setTemporaryPassword] = useState('');

    // 폼체크를 통해서 값 보내기 
    const [checked, setChecked] = useState(false);
    const [passwordconfirm, setPasswordConfirm] = useState(false);
    const [repasswordconfirm, setrePasswordConfirm] = useState(false);


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


    const handleSubmit = (event) => {
        event.preventDefault();
        // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
        const data = new FormData(event.target);
        const temporary = data.get("temporary");
        const password = data.get("password");
        
        if(passwordconfirm && repasswordconfirm){
            temporaryauth({temporary:temporary, password:password }).then(
                (response)=>{
                    console.log(response);
                    if(response.check){
                        window.location.href = "/login";
                    }
                }
            )
        }
    };

    return(
        <>
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
                        인증번호를 입력해주세요
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="temporary"
                                    label = {temporaryError}
                                    name="temporary"
                                    autoComplete="temporary"
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label = {passwordError}
                                    name="password"
                                    autoComplete="password"
                                    onChange = {passwordChange}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="repassword"
                                    label = {repasswordError}
                                    name="repassword"
                                    autoComplete="repassword"
                                    onChange = {repasswordChange}
                                />
                                </Grid>
                            </Grid>
                            
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        확인
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
        </>
    )
}

export default PasswordTemporary;