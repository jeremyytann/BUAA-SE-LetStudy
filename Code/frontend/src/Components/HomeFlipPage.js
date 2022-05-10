import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const HomeFlipPage = ({ url }) => {
    const { tab, page, search } = useParams();
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
        const fetchNoteAllPageCount = async() => {
            const data = await api.noteGetAllPageCount();
            setMaxPage(data.page)
        }

        const fetchNotePopularPageCount = async() => {
            const data = await api.noteGetPopularPageCount();
            setMaxPage(data.page);
        }

        const fetchNoteLatestPageCount = async() => {
            const data = await api.noteGetLatestPageCount();
            setMaxPage(data.page)
        }

        const fetchNoteSearchPageCount = async() => {
            const data = await api.noteGetSearchPageCount(search);
            setMaxPage(data.page)
        }

        const fetchQuestionAllPageCount = async() => {
            const data = await api.questionGetAllPageCount();
            setMaxPage(data.page)
        }

        const fetchQuestionPopularPageCount = async() => {
            const data = await api.questionGetPopularPageCount();
            setMaxPage(data.page);
        }

        const fetchQuestionLatestPageCount = async() => {
            const data = await api.questionGetLatestPageCount();
            setMaxPage(data.page)
        }

        const fetchQuestionSearchPageCount = async() => {
            const data = await api.questionGetSearchPageCount(search);
            setMaxPage(data.page);
        }

        const fetchPrivateRoomsPageCount = async() => {
            const data = await api.roomGetPrivatePageCount();
            setMaxPage(data.page);
        }

        if (url === 'notes' && tab === 'all') {
            fetchNoteAllPageCount()
        } else if (url === 'notes' && tab === 'popular') {
            fetchNotePopularPageCount()
        } else if (url === 'notes' && tab === 'latest') {
            fetchNoteLatestPageCount()
        } else if (url === 'notes' && tab === 'search') {
            fetchNoteSearchPageCount()
        } else if (url === 'questions' && tab === 'all') {
            fetchQuestionAllPageCount()
        } else if (url === 'questions' && tab === 'popular') {
            fetchQuestionPopularPageCount()
        } else if (url === 'questions' && tab === 'latest') {
            fetchQuestionLatestPageCount()
        } else if (url === 'questions' && tab === 'search') {
            fetchQuestionSearchPageCount()
        } else if (url === 'rooms' && tab === 'public') {
            setMaxPage(1)
        } else if (url === 'rooms' && tab === 'private') {
            fetchPrivateRoomsPageCount();
        }
    }, [tab, page, url, search])
    
    const previousPage = () => {
        if ((url === 'notes' && tab === 'search') || (url === 'questions' && tab === 'search')) {
            navigate(`/${url}/${tab}/${search}/${parseInt(page) - 1}`);
        } else {
            navigate(`/${url}/${tab}/${parseInt(page) - 1}`);
        }
    }

    const nextPage = () => {
        if ((url === 'notes' && tab === 'search') || (url === 'questions' && tab === 'search')) {
            navigate(`/${url}/${tab}/${search}/${parseInt(page) + 1}`);
        } else {
            navigate(`/${url}/${tab}/${parseInt(page) + 1}`);
        }
    }

    return (
        <Box mx={10} mt={3} display='flex'>
            { page > 1 ?
                <Box mr={2}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={previousPage} variant="contained" color="gold" size="small" style={{ borderRadius: 10 }}>
                            <Box sx={{fontSize: 15, fontWeight: 'bold', margin: '0px 8px 0px 8px', minWidth: '50px'}}>上一页</Box>
                        </Button>
                    </ThemeProvider> 
                </Box> : ''
            }

            { maxPage > 1 ?
                <Box>
                    { parseInt(page) !== maxPage ? 
                        <ThemeProvider theme={theme}>
                            <Button onClick={nextPage} variant="contained" color="gold" size="small" style={{ borderRadius: 10 }}>
                                <Box sx={{fontSize: 15, fontWeight: 'bold', margin: '0px 8px 0px 8px', minWidth: '50px'}}>下一页</Box>
                            </Button>
                        </ThemeProvider> : ''
                    }
                </Box> : ''
            }
            
        </Box>
    )
}

export default HomeFlipPage