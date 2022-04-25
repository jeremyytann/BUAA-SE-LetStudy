import React from 'react'
import { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const HomeSubTab = ({ url }) => {
    const navigate = useNavigate();
    const { tab } = useParams();

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
            }
        }
    });

    const linkCreateRoom = () => {
        navigate('/rooms/create');
    }

    const linkCreateNote = () => {
        navigate('/notes/create');
    }

    const linkCreateQuestion = () => {
        navigate('/questions/create');
    }

    return (
        <Box mx={10} mt={4} alignItems='center' display='flex'>
            <Box display='flex' width='92%'>
                { url === 'rooms' ? 
                    <Box>
                        { tab === 'public' ?
                            <Box display='flex'>
                                <Box onClick={() => navigate('/rooms/public/1')} color='#E0A96D' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    公共房间
                                </Box>
                                <Box onClick={() => navigate('/rooms/private/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    私人房间
                                </Box>
                            </Box> : ''
                        }

                        { tab === 'private' ?
                            <Box display='flex'>
                                <Box onClick={() => navigate('/rooms/public/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    公共房间
                                </Box>
                                <Box onClick={() => navigate('/rooms/private/1')} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    私人房间
                                </Box>
                            </Box> : ''
                        }
                    </Box> : ''
                }

                { url === 'notes' ?
                    <Box>
                        { tab === 'all' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/notes/all/1')} color='#E0A96D' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => navigate('/notes/popular/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => navigate('/notes/latest/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'popular' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/notes/all/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => navigate('/notes/popular/1')} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => navigate('/notes/latest/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                            </Box>
                            : ''
                        }

                        { tab === 'latest' ?
                            <Box display='flex' alignItems='center'>
                                <Box onClick={() => navigate('/notes/all/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    全部
                                </Box>
                                <Box onClick={() => navigate('/notes/popular/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    热门
                                </Box>
                                <Box onClick={() => navigate('/notes/latest/1')} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                    最新
                                </Box>
                            </Box>
                            : ''
                        }
                    </Box> : ''
                }

                { url === 'questions' ? 
                    <Box>
                    { tab === 'all' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => navigate('/questions/all/1')} color='#E0A96D' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => navigate('/questions/popular/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => navigate('/questions/latest/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                        </Box>
                        : ''
                    }

                    { tab === 'popular' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => navigate('/questions/all/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => navigate('/questions/popular/1')} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => navigate('/questions/latest/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                        </Box>
                        : ''
                    }

                    { tab === 'latest' ?
                        <Box display='flex' alignItems='center'>
                            <Box onClick={() => navigate('/questions/all/1')} color='#D5D5D5' fontSize={35} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                全部
                            </Box>
                            <Box onClick={() => navigate('/questions/popular/1')} color='#D5D5D5' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                热门
                            </Box>
                            <Box onClick={() => navigate('/questions/latest/1')} color='#E0A96D' fontSize={35} ml={5} fontWeight='bold' sx={{cursor: 'pointer'}}>
                                最新
                            </Box>
                        </Box>
                        : ''
                    }
                </Box> : ''
                }
            </Box>

            { url === 'rooms' ? 
                <Box width='8%'>
                    { tab === 'private' ? 
                        <ThemeProvider theme={theme}>
                            <Button onClick={linkCreateRoom} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                                <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>创建房间</Box>
                            </Button>
                        </ThemeProvider> : ''
                    }
                </Box> : ''
            }

            { url === 'notes' ? 
                <Box width='8%'>
                    <ThemeProvider theme={theme}>
                        <Button onClick={linkCreateNote} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                            <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>分享笔记</Box>
                        </Button>
                    </ThemeProvider>
                </Box> : ''
            }

            { url === 'questions' ? 
                <Box width='8%'>
                <ThemeProvider theme={theme}>
                    <Button onClick={linkCreateQuestion} variant="contained" size="small" color="gold" style={{ borderRadius: 13, width: 140 }}> 
                        <Box sx={{fontSize: 18, margin: '0px 8px 0px 8px', minWidth: '50px', fontWeight: 'bold'}}>提问</Box>
                    </Button>
                </ThemeProvider>
            </Box> : ''
            }
        </Box>
    )
}

export default HomeSubTab