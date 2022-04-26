import React from 'react'
import { Box, Pagination } from '@mui/material'
import api from '../Api/api'
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserReport from './UserReport';
import UserBug from './UserBug';

const UserReports = () => {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [bugs, setBugs] = useState();

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
        const fetchBugs = async() => {
            const data = await api.bugGetAllByUser(page);
            setBugs(data.data)
            setMaxPage(data.page)
        }

        fetchBugs();
    }, [page])

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    return (
        <Box>
            <Box paddingTop={9}sx={{width: '100%'}}>
                <Box display='flex' paddingLeft={10}>
                    <Box>
                        <Box display='flex'>
                            <Box display='flex' sx={{fontSize: '40px', fontWeight: 'bold'}}>
                                <small>我的反馈</small>
                            </Box>

                            <Box mt={0.5} ml={4}>
                                <ThemeProvider theme={theme}>
                                    <Pagination count={maxPage} color='gold' showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                                </ThemeProvider>
                            </Box>
                        </Box>

                        <Box mt={5}>
                            { bugs !== undefined ? 
                                <Box>
                                    <Box height={550} maxHeight={550}>
                                        { bugs.map((bug, index) => (
                                            <UserBug key={index} bug={bug} />
                                        )) }
                                    </Box>
                                </Box> : ''
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UserReports