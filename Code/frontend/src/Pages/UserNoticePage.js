import { Box, Grid } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useParams, useNavigate } from 'react-router-dom';

const UserNoticePage = () => {
    const { tab } = useParams();
    const navigate = useNavigate();

    const linkNoticeLatest = () => {
        navigate('/notices/latest')
    }

    const linkNoticeAll = () => {
        navigate('/notices/all')
    }

    return (
        <Box>
            <Navbar />
            
            <Box mt={5} mx={10}>
                <Grid container>
                    <Grid item xs={3}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '820px', width: '90%'}}>
                            <Box paddingTop={8} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                <small>公告</small>
                            </Box>

                            <Box paddingTop={7}>
                                { tab === 'latest' ? 
                                    <small className='activated-setting' onClick={linkNoticeLatest}>最新公告</small> :
                                    <small className='nonactivated-setting' onClick={linkNoticeLatest}>最新公告</small>
                                }
                            </Box>

                            <Box paddingTop={4}>
                                { tab === 'all' ? 
                                    <small className='activated-setting' onClick={linkNoticeAll}>全部公告</small> :
                                    <small className='nonactivated-setting' onClick={linkNoticeAll}>全部公告</small>
                                }
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={9}>
                        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '100%', width: '100%'}}>
                            <Box>
                                { tab === 'latest' ?
                                    <Box paddingTop={9}sx={{width: '100%'}}>
                                        <Box display='flex' paddingLeft={10}>
                                            <Box>
                                                <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                                    <small>最新公告</small>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box> : ''
                                }

                                { tab === 'all' ?
                                    <Box paddingTop={9}sx={{width: '100%'}}>
                                        <Box display='flex' paddingLeft={10}>
                                            <Box>
                                                <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                                    <small>全部公告</small>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box> : ''
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default UserNoticePage