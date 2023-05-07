import React from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useState } from 'react';


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
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
    pass: ''
};

const signupValues = {
    name: '',
    username: '',
    pass: '',
};

const Login = () => {

    const [account, setaccount] = useState('login');
    const [login, setLogin] = useState(loginValues);
    const [signup, setSignup] = useState(signupValues);


    const changeForm= () => {
        account === 'signup' ? setaccount('login') : setaccount('signup');
        
                    /*switch state between login/signup on button click*/
    }

    const onLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onSignupChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    /*check the state and then display div */
                    account === 'login' ?
                        <Wrapper>

                            <TextField variant='standard' label='Enter User Name' onChange={(e) => onLoginChange(e)} name='username' />
                            <TextField variant='standard' label='Enter Password' onChange={(e) => onLoginChange(e)} name='pass' />
                            <LoginButton variant='contained'>Login</LoginButton>
                            <Text>OR</Text>
                            <SignupButton onClick={() => changeForm()}>Create an Account</SignupButton>
                        </Wrapper> :

                        <Wrapper>

                            <TextField variant='standard' label='Name' onChange={(e) => onSignupChange(e)} name='name' />
                            <TextField variant='standard' label='User Name'  onChange={(e) => onSignupChange(e)} name='username'  />
                            <TextField variant='standard' label='Password'  onChange={(e) => onSignupChange(e)} name='pass' />
                            <SignupButton>Sign Up</SignupButton>
                            <Text>OR</Text>
                            <LoginButton variant='contained' onClick={() => changeForm()}>Already have an Account?</LoginButton>

                        </Wrapper>
                }

            </Box>

        </Component>




    )
}

export default Login;