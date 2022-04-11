import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

const UserSettingsPage = () => {
    let user = Cookies.get('username');

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    return (
        <Box>
            <Navbar />

            <Box display='flex' justifyContent='center' sx={{mt: 3, mx: 5}}>
                <Grid container>
                    <Grid height={500} item xs={3}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '90%'}}>
                            asdas
                        </Box>
                    </Grid>

                    <Grid height={500} item xs={9}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '100%'}}>
                            asdas
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
        </Box>
    )
}

export default UserSettingsPage