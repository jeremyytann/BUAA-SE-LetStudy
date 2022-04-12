import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import './GeneralUser.css'

const UserSettingsPage = () => {
    const { tab } = useParams();
    let user = Cookies.get('username');
    const navigate = useNavigate();

    if (user === undefined) {
        return <Navigate to='/login'/>
    }

    const linkPassword = () => {
        navigate('/settings/password')
    }

    const linkTerminate = () => {
        navigate('/settings/terminate')
    }

    const linkReports = () => {
        navigate('/settings/reports')
    }

    const linkBugs = () => {
        navigate('/settings/bugs')
    }

    return (
        <Box>
            <Navbar />

            <Box display='flex' justifyContent='center' sx={{mt: 3, mx: 5}}>
                <Grid container>
                    <Grid height={500} item xs={3}>

                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '90%'}}>
                            <Box paddingTop={8} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                <small>设置</small>
                            </Box>
                            
                            <Box paddingTop={7}>
                                { tab === 'password' ? 
                                    <small className='activated-setting' onClick={linkPassword}>账户信息</small> :
                                    <small className='nonactivated-setting' onClick={linkPassword}>账户信息</small>
                                }
                            </Box>

                            <Box paddingTop={4}>
                                { tab === 'terminate' ? 
                                    <small className='activated-setting' onClick={linkTerminate}>注销账户</small> :
                                    <small className='nonactivated-setting' onClick={linkTerminate}>注销账户</small>
                                }
                            </Box>

                            <Box paddingTop={4}>
                                { tab === 'reports' ? 
                                    <small className='activated-setting' onClick={linkReports}>我的举报</small> :
                                    <small className='nonactivated-setting' onClick={linkReports}>我的举报</small>
                                }
                            </Box>

                            <Box paddingTop={4}>
                                { tab === 'bugs' ? 
                                    <small className='activated-setting' onClick={linkBugs}>我的反馈</small> :
                                    <small className='nonactivated-setting' onClick={linkBugs}>我的反馈</small>
                                }
                            </Box>
                        </Box>
                    </Grid>

                    <Grid height={500} item xs={9}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '100%'}}>
                            {tab}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default UserSettingsPage