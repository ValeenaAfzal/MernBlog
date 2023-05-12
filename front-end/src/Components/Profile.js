import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Typography, TextField } from '@mui/material';

import { API } from '../services/api';

import { dataContext } from '../context/provider';
import starlight from '../profilelgo.png';
import iconsteam from '../iconsteam.png';
import { useNavigate } from 'react-router-dom';

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

const Save = styled(Button)`
    text-transform: none;
    background: #7e277c;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Profile = () => {

    const { account } = useContext(dataContext);
    const initialProfile = {
        prevusername: account.username,
        name: account.name,
        username: account.username,
        pass: account.pass,
    };


    const { setaccounts } = useContext(dataContext);
    const [profiles, setProfile] = useState(initialProfile);
    const [error, showError] = useState('');


    const onProfileChange = (e) => {
        setProfile({ ...profiles, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    const SavedProfile = async () => {
        console.log("here in save");
        //promise returns
        // <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
        let getresponse = await API.saveprofile(profiles);//send state
        if (getresponse.isSuccess) //api.js
        {
            console.log("here in 66save");
            showError('');
            setProfile(profiles);
            setaccounts({ name: getresponse.data.name, username: getresponse.data.username, pass: getresponse.data.pass });
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }
    return (
        <Box style={{ marginTop: '20px', background: { starlight } }}>
            <Component>
                <Box>
                    <Image src={starlight} alt="login" style={{ width: '60%', height: '30%' }} />
                    {
                        <Wrapper>
                            <Image src={iconsteam} alt="dp" style={{ width: '30%', height: '10%' }} />
                            {/*controlled component value={login.username} */}
                            <TextField variant='standard' InputProps={{ readOnly: false }} value={profiles.name} label='Name' onChange={(e) => onProfileChange(e)} name='name' />
                            <TextField variant='standard' InputProps={{ readOnly: false }} value={profiles.username} label='User Name' onChange={(e) => onProfileChange(e)} name='username' />
                            <TextField variant='standard' InputProps={{ readOnly: false }} value={profiles.pass} label='Password' onChange={(e) => onProfileChange(e)} name='pass' />
                            {error && <div className="error"> {error} </div>}
                            <Save variant='contained' onClick={() => SavedProfile()}>Save</Save>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Box>
    )
}

export default Profile;