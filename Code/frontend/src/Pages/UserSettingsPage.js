import React from 'react'
import Navbar from '../Components/Navbar'
import Cookies from 'js-cookie'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import './GeneralUser.css'
import UserPasswordForm from '../Components/UserPasswordForm';
import UserTerminate from '../Components/UserTerminate';
import UserReports from '../Components/UserReports';
import UserBugs from '../Components/UserBugs';
import api from '../Api/api';

const UserSettingsPage = () => {
    const { tab } = useParams();
    let user = Cookies.get('username');
    const navigate = useNavigate();

    const banCheck = async() => {
        const data = api.userGetByUsername(user)

        if (data.data[0].status === 0) {
            return <Navigate to='/banned'/>
        }
    }

    if (user === undefined) {
        return <Navigate to='/login'/>
    } else {
        banCheck();
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

                    <Grid item xs={9}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '100%'}}>
                            <Box>
                                { tab === 'password' ? <UserPasswordForm /> : ''}
                            </Box>
                            
                            <Box>
                                { tab === 'terminate' ? <UserTerminate /> : ''}
                            </Box>

                            <Box>
                                { tab === 'reports' ? <UserReports /> : ''}
                            </Box>

                            <Box>
                                { tab === 'bugs' ? <UserBugs /> : ''}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default UserSettingsPage