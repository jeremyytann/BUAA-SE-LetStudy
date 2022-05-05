import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../Api/api';
import Navbar from '../Components/Navbar'
import { Grid, Box } from '@mui/material';
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import ProfileDescription from '../Components/ProfileDescription';
import ProfileAchievement from '../Components/ProfileAchievement';
import UserProfileTab from '../Components/UserProfileTab';
import UserProfileNotes from '../Components/UserProfileNotes';
import UserProfileQuestions from '../Components/UserProfileQuestions';
import UserProfileCollections from '../Components/UserProfileCollections';

const UserProfilePage = () => {
    const { username, tab } = useParams();
    const [error, setError] = useState(0);
    const [user, setUser] = useState();
    const [days, setDays] = useState(0);

    useEffect(() => {
        const fetchUser = async() => {
            const data = await api.userGetByUsername(username);

            if (data.errorCode === 0) {
                setUser(data.data[0]);
                setDays(data.days)
            } else if (data.errorCode === 404) {
                setError(404);
            }
        }

        fetchUser();
    }, [username])

    let currentUser = Cookies.get('username');

    if (currentUser === undefined) {
        return <Navigate to='/login'/>
    }

    if (error === 404) {
        return <Navigate to='/404' />
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
                                <ProfileAchievement user={user} />
                            </Box>
                        </Grid>

                        <Grid item xs={9.5}>
                            <Box borderRadius={10} sx={{backgroundColor: 'white', height: '820px', width: '100%'}}>
                                <UserProfileTab />
                                
                                { tab === 'notes' ?
                                    <UserProfileNotes /> : ''
                                }

                                { tab === 'questions' ?
                                    <UserProfileQuestions /> : ''
                                }

                                { tab === 'collections' ?
                                    <UserProfileCollections /> : ''
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box> : ''
            }
        </Box>
    )
}

export default UserProfilePage