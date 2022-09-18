import { useState, useContext } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../App.css';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const loginInitialValues = {
    username: '',
    password: ''
};

const formInitialValues = {
    name: '',
    username: '',
    password: ''
};
export default function SignIn({ isUserAuthenticated }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            username: data.get('username'),
            password: data.get('password'),
        });
    };
    // const Login = ({ isUserAuthenticated }) => {
    const [account, toggleAccount] = useState('login');
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(formInitialValues);
    const [error, showError] = useState('');
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignUp = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onValue = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInput = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const userSignUp = async () => {
        let response = await API.userSignUp(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(formInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const userLogin = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });

            isUserAuthenticated(true);
            // setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            {
                account === 'login' ?
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
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={login.username}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => onValue(e)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={login.password}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => onValue(e)}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => userLogin()}
                                >
                                    Login In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Button
                                            onClick={() => toggleSignUp()}
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Don't have an account? Sign In?
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                    :
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
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => onInput(e)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => onInput(e)}
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
                                    onChange={(e) => onInput(e)}
                                />
                                {error && <Error>{error}</Error>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => userSignUp()}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Button
                                            onClick={() => toggleSignUp()}
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Already have an account
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
            }
        </ThemeProvider>
    );
    // }
}
