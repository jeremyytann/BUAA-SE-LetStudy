import { Box, Grid, Pagination } from '@mui/material'
import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useParams, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import UserNotice from '../Components/UserNotice';

const UserNoticePage = () => {
    const { tab } = useParams();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [notices, setNotices] = useState();
    const navigate = useNavigate();

    const theme = createTheme ({
        typography: {
            button: {
                textTransform: 'none',
            }
        },

        palette: {
            gold: {
                main: '#E0A96D',
                contrastText: '#fff',
            },
            black: {
                main: '#000000',
                contrastText: '#fff',
            },
            pink: {
                main: '#FA9285',
                contrastText: '#fff',
            },
            yellow: {
                main: '#F2DB36'
            }
        }
    }); 

    useEffect(() => {
        const fetchAllNoticesByPage = async() => {
            const data = await api.noticeGetAllByPage(page, 4);
            setNotices(data.data);
            setMaxPage(data.page);
        }

        const fetchLatestNoticesByPage = async() => {
            const data = await api.noticeGetLatestByPage(page, 4);
            setNotices(data.data);
            setMaxPage(data.page);
        }

        if (tab === 'all') {
            fetchAllNoticesByPage();
        } else if (tab === 'latest') {
            fetchLatestNoticesByPage();
        }
    }, [tab, page])

    const linkNoticeLatest = () => {
        setPage(1);
        navigate('/notices/latest');
    }

    const linkNoticeAll = () => {
        setPage(1);
        navigate('/notices/all');
    }

    const handlePageChange = (event, value) => {
        setPage(value)
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
                                                <Box display='flex'>
                                                    <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                                        <small>最新公告</small>
                                                    </Box>
                                                    
                                                    <Box mt={0.5} ml={4}>
                                                        { maxPage > 0 ?
                                                            <ThemeProvider theme={theme}>
                                                                <Pagination count={maxPage} color='gold' showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                                                            </ThemeProvider> : ''
                                                        }
                                                    </Box>
                                                </Box>

                                                <Box mt={5}>
                                                    { notices !== undefined && notices.length > 0 ? 
                                                        <Box>
                                                            <Box height={550} maxHeight={550}>
                                                                { notices.map((notice, index) => (
                                                                    <UserNotice key={index} notice={notice} />
                                                                )) }
                                                            </Box>
                                                        </Box> :
                                                        <Box>
                                                            <Box pt={2} fontSize={24} fontWeight='bold' color='darkgrey'>
                                                                近期没有发布任何公告
                                                            </Box> 
                                                        </Box>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box> : ''
                                }

                                { tab === 'all' ?
                                    <Box paddingTop={9}sx={{width: '100%'}}>
                                        <Box display='flex' paddingLeft={10}>
                                            <Box>
                                                <Box display='flex'>
                                                    <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                                        <small>全部公告</small>
                                                    </Box>
                                                    
                                                    <Box mt={0.5} ml={4}>
                                                        { maxPage > 0 ?
                                                            <ThemeProvider theme={theme}>
                                                                <Pagination count={maxPage} color='gold' showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                                                            </ThemeProvider> : ''
                                                        }
                                                    </Box>
                                                </Box>

                                                <Box mt={5}>
                                                    { notices !== undefined && notices.length > 0 ? 
                                                        <Box>
                                                            <Box height={550} maxHeight={550}>
                                                                { notices.map((notice, index) => (
                                                                    <UserNotice key={index} notice={notice} />
                                                                )) }
                                                            </Box>
                                                        </Box> :

                                                        <Box>
                                                            <Box pt={2} fontSize={24} fontWeight='bold' color='darkgrey'>
                                                                暂时还未发布任何公告
                                                            </Box> 
                                                        </Box>
                                                    }
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