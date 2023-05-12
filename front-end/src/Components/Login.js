import React from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { API } from '../services/api';
import { dataContext } from '../context/provider';
import { useNavigate } from 'react-router-dom';
import starlight from '../starlight.png';

const Component = styled(Box)`
    width: 400px;
    margin-top: 25px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    display: 'flex',
    margin: 'auto',
});

const Wrapper = styled(Box)`
    padding: 20px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 5px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #7e277c;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #c0203f;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

//default values(objects) stored in Signup and Login State
const loginValues = {
    username: '',
    pass: '',
};

const signupValues = {
    name: '',
    username: '',
    pass: '',
};

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Login = ({ isUserAuthenticated }) => {


    const [account, setaccount] = useState('login');
    const [login, setLogin] = useState(loginValues);
    const [signup, setSignup] = useState(signupValues);
    const [error, showError] = useState('');
    const { setaccounts } = useContext(dataContext);

    const navigate = useNavigate();

    const LOGIN = async () => {
        let getresponse = await API.userLogin(login);//send state
        if (getresponse.isSuccess) //api.js
        {
            showError('');

            sessionStorage.setItem('aToken', `Bearer ${getresponse.data.aToken}`);
            sessionStorage.setItem('rToken', `Bearer ${getresponse.data.Token}`);
            //store globallt using context api or localstorage //context/provider
            setaccounts({ name: getresponse.data.name, username: getresponse.data.username , pass: getresponse.data.pass});

            isUserAuthenticated(true);
            setLogin(loginValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const SignUP = async () => {
        //promise returns
        let getresponse = await API.userSignup(signup);//send state
        if (getresponse.isSuccess) //api.js
        {
            showError('');
            setSignup(signupValues);
            setaccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }


    const changeForm = () => {
        account === 'signup' ? setaccount('login') : setaccount('signup');

        /*switch state between login/signup on button click*/
    }

    const onLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onSignupChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    return (
        <Box style={{marginTop:'20px'}}>
            <Component>
                <Box>
                    <Image src={starlight} alt="login" style={{ width: '70%', height: '80%' }} />
                    {
                        /*check the state and then display div */
                        account === 'login' ?
                            <Wrapper>

                                {/*controlled component value={login.username} */}
                                <TextField variant='standard' value={login.username} label='Enter User Name' onChange={(e) => onLoginChange(e)} name='username' />
                                <TextField variant='standard' value={login.pass} label='Enter Password' onChange={(e) => onLoginChange(e)} name='pass' />

                                {error && <Error>{error}</Error>}

                                <LoginButton variant='contained' onClick={() => LOGIN()}>Login</LoginButton>
                                <Text>OR</Text>
                                <SignupButton onClick={() => changeForm()}>Create an Account</SignupButton>
                            </Wrapper> :

                            <Wrapper>

                                <TextField variant='standard' label='Name' onChange={(e) => onSignupChange(e)} name='name' />
                                <TextField variant='standard' label='User Name' onChange={(e) => onSignupChange(e)} name='username' />
                                <TextField variant='standard' label='Password' onChange={(e) => onSignupChange(e)} name='pass' />

                                {error && <Error>{error}</Error>}

                                <SignupButton onClick={() => SignUP()}>Sign Up</SignupButton>
                                <Text>OR</Text>
                                <LoginButton variant='contained' onClick={() => changeForm()}>Already have an Account?</LoginButton>

                            </Wrapper>
                    }

                </Box>

            </Component>
        </Box>


    )
}

export default Login;