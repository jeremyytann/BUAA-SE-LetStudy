import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import './GeneralUser.css'
import UserPasswordForm from '../Components/UserPasswordForm';
import AdminPasswordForm from '../Components/AdminPasswordForm';

const AdminSettingsPage = () => {
    const { tab } = useParams();
    let user = Cookies.get('username');
    const navigate = useNavigate();

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    const linkPassword = () => {
        navigate('/settings/password')
    }

    return (
        <Box>
            <Navbar />

            <Box mt={5} mx={10}>
                <Grid container>
                    <Grid item xs={3}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '820px', width: '90%'}}>
                            <Box paddingTop={8} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                <small>设置</small>
                            </Box>
                            
                            <Box paddingTop={7}>
                                { tab === 'password' ? 
                                    <small className='activated-setting' onClick={linkPassword}>账户信息</small> :
                                    <small className='nonactivated-setting' onClick={linkPassword}>账户信息</small>
                                }
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={9}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '100%'}}>
                            <Box>
                                { tab === 'password' ? <AdminPasswordForm /> : ''}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AdminSettingsPage