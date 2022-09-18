import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { API } from '../../../service/api';

//components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts();
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            }
        </>
    )
}

export default Posts;