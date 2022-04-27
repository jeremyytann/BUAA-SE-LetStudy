import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AdminHomeFlipPage = ({ url }) => {
    const { tab, page } = useParams();
    const [maxPage, setMaxPage] = useState(0);
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
            }
        }
    });

    useEffect(() => {
        const fetchNoticeLatestPageCount = async() => {
            const data = await api.noticeGetLatestPageCount(8);
            setMaxPage(data.page)
        }

        const fetchNoticeAllPageCount = async() => {
            const data = await api.noticeGetAllPageCount(8);
            setMaxPage(data.page);
        }

        const fetchReportStatusPageCount = async() => {
            if (tab === 'unfinished') {
                const data = await api.reportGetStatusPageCount(0, 8);
                setMaxPage(data.page);
            } else if (tab === 'completed') {
                const data = await api.reportGetStatusPageCount(1, 8);
                setMaxPage(data.page);
            } else if (tab === 'rejected') {
                const data = await api.reportGetStatusPageCount(2, 8);
                setMaxPage(data.page);
            } else if (tab === 'all') {
                const data = await api.reportGetAllPageCount(8);
                setMaxPage(data.page);
            }
        }

        const fetchBugStatusPageCount = async() => {
            if (tab === 'unfinished') {
                const data = await api.bugGetStatusPageCount(0, 8);
                setMaxPage(data.page);
            } else if (tab === 'completed') {
                const data = await api.bugGetStatusPageCount(1, 8);
                setMaxPage(data.page);
            } else if (tab === 'all') {
                const data = await api.bugGetAllPageCount(8);
                setMaxPage(data.page);
            }
        }

        const fetchUserStatusPageCount = async() => {
            if (tab === 'all') {
                const data = await api.userGetAllPageCount(12);
                setMaxPage(data.page);
            } else if (tab === 'active') {
                const data = await api.userGetStatusPageCount(1, 12);
                setMaxPage(data.page);
            } else if (tab === 'banned') {
                const data = await api.userGetStatusPageCount(0, 12);
                setMaxPage(data.page);
            }
        }

        if (url === 'notices' && tab === 'latest') {
            fetchNoticeLatestPageCount();
        } else if (url === 'notices' && tab === 'all') {
            fetchNoticeAllPageCount();
        } else if (url === 'reports') {
            fetchReportStatusPageCount();
        } else if (url === 'bugs') {
            fetchBugStatusPageCount();
        } else if (url === 'users') {
            fetchUserStatusPageCount();
        }
    }, [tab, url])

    const previousPage = () => {
        navigate(`/admin/${url}/${tab}/${parseInt(page) - 1}`);
    }

    const nextPage = () => {
        navigate(`/admin/${url}/${tab}/${parseInt(page) + 1}`);
    }
    
    return (
        <Box mx={10} mt={3} display='flex'>
            { page > 1 ?
                <Box mr={2}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={previousPage} variant="contained" color="black" size="small" style={{ borderRadius: 10 }}>
                            <Box sx={{fontSize: 15, fontWeight: 'bold', margin: '0px 8px 0px 8px', minWidth: '50px'}}>上一页</Box>
                        </Button>
                    </ThemeProvider> 
                </Box> : ''
            }

            { maxPage > 1 ?
                <Box>
                    { parseInt(page) !== maxPage ? 
                        <ThemeProvider theme={theme}>
                            <Button onClick={nextPage} variant="contained" color="black" size="small" style={{ borderRadius: 10 }}>
                                <Box sx={{fontSize: 15, fontWeight: 'bold', margin: '0px 8px 0px 8px', minWidth: '50px'}}>下一页</Box>
                            </Button>
                        </ThemeProvider> : ''
                    }
                </Box> : ''
            }
            
        </Box>
    )
}

export default AdminHomeFlipPage