
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/5269530/pexels-photo-5269530.jpeg?cs=srgb&dl=pexels-uzunov-rostislav-5269530.jpg&fm=jpg) center/cover no-repeat #000;
    object-fit: contain;
    object-position: center;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    color: #FFFFFF;
`;

const Banner = () => {

    return (
        <Image>
            <Heading>Explore Ideas</Heading>
            <SubHeading>Final year ideas for you.</SubHeading>
        </Image>
    )
}

export default Banner;