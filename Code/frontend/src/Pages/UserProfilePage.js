import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../Api/api';
import Navbar from '../Components/Navbar'
import { Grid, Box } from '@mui/material';
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import ProfileDescription from '../Components/ProfileDescription';

const UserProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState([]);
    const [days, setDays] = useState(0);

    useEffect(() => {
        const fetchUser = async() => {
            const data = await api.userGetByUsername(username);
            setUser(data.data[0]);
            setDays(data.days)
        }

        fetchUser();
    }, [username])

    let currentUser = Cookies.get('username');

    if (currentUser === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <Box>
            <Navbar />
            
            { user !== undefined ? 
                <Box mt={5} mx={10}>
                    <Grid container>
                        <Grid item xs={2.5}>
                            <Box borderRadius={10} sx={{backgroundColor: 'white', height: '320px', width: '90%'}}>
                                <ProfileDescription user={user} days={days}/>
                            </Box>

                            <Box mt={5} borderRadius={10} sx={{backgroundColor: 'white', height: '320px', width: '90%'}}>
                            
                            </Box>
                        </Grid>

                        <Grid item xs={9.5}>
                            <Box borderRadius={10} sx={{backgroundColor: 'white', height: '820px', width: '100%'}}>
                                
                            </Box>
                        </Grid>
                    </Grid>
                </Box> : ''
            }
        </Box>
    )
}

export default UserProfilePage