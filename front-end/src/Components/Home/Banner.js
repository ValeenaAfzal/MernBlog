import { Box, Typography, styled } from '@mui/material';
import Banners from './Banner.jpg'

const Image = styled(Box)`
    background: url(${Banners}) center/100%;
    width:100%;
    height:70vh;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`
const Heading = styled(Typography)`

    padding: 10px 0px 5px 0px;
    font-size: 70px;
    color: #7e277c;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #c0203f;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>MUALIF</Heading>
            <SubHeading>Create the magic with the words</SubHeading>
        </Image>
    )
}

export default Banner;