import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const HomeFlipPage = ({ url }) => {
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
        const fetchNoteAllPageCount = async() => {
            const data = await api.noteGetAllPageCount();
            return data;
        }

        const fetchNoteLatestPageCount = async() => {
            const data = await api.noteGetLatestPageCount();
            return data;
        }

        const fetchQuestionAllPageCount = async() => {
            const data = await api.questionGetAllPageCount();
            return data;
        }

        const fetchQuestionLatestPageCount = async() => {
            const data = await api.questionGetLatestPageCount();
            return data;
        }

        const getNoteAllPageCount = async() => {
            const data = await fetchNoteAllPageCount();
            setMaxPage(data.page);
        }

        const getNoteLatestPageCount = async() => {
            const data = await fetchNoteLatestPageCount();
            setMaxPage(data.page);
        }

        const getQuestionAllPageCount = async() => {
            const data = await fetchQuestionAllPageCount();
            setMaxPage(data.page)
        }

        const getQuestionLatestPageCount = async() => {
            const data = await fetchQuestionLatestPageCount();
            setMaxPage(data.page)
        }

        if (url === 'notes' && tab === 'all') {
            getNoteAllPageCount()
        } else if (url === 'notes' && tab === 'popular') {
            
        } else if (url === 'notes' && tab === 'latest') {
            getNoteLatestPageCount()
        } else if (url === 'questions' && tab === 'all') {
            getQuestionAllPageCount()
        } else if (url === 'questions' && tab === 'popular') {

        } else if (url === 'questions' && tab === 'latest') {
            getQuestionLatestPageCount()
        }
    }, [tab, page, url])
    
    const previousPage = () => {
        navigate(`/${url}/${tab}/${parseInt(page) - 1}`);
    }

    const nextPage = () => {
        navigate(`/${url}/${tab}/${parseInt(page) + 1}`);
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