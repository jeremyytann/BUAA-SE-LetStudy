import { Box, Pagination } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import api from '../Api/api';
import Note from './Note'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom'

const UserProfileNotes = ({ noteType }) => {
    const { username, tab } = useParams();
    const [notes, setNotes] = useState()
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0);

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
        const fetchNotes = async() => {
            const data = await api.noteGetAllByUser(username, page);
            setNotes(data.data);
            setMaxPage(data.page);
        }

        fetchNotes();
    }, [username, page])

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    return (
        <Box>
            <Box height={590} ml={4.8} mb={4.5}>
                { notes !== undefined && notes.length > 0 ?
                    <Box display='flex' flexWrap='wrap'>
                        {notes.map((note, index) => (
                            <Note key={index} note={note}/>
                        ))}
                    </Box> :
                    <Box>
                        <Box display='flex' ml={1.5} pt={2} fontSize={24} color='darkgrey'>
                            此用户未分享过任何笔记
                        </Box> 
                    </Box>
                }
            </Box>

            <Box display='flex' ml={4.8}>
                {maxPage > 0 ?
                    <Box>
                        <ThemeProvider theme={theme}>
                            <Pagination count={maxPage} color='gold' showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                        </ThemeProvider>
                    </Box> : ''
                }
            </Box>
        </Box>
    )
}

export default UserProfileNotes