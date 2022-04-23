import { Box, Grid, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import NoteComments from '../Components/NoteComments'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './GeneralUser.css'
import NoteFavLike from '../Components/NoteFavLike'

const NoteViewPage = () => {
    const { id } = useParams();
    const [note, setNote] = useState()
    const [image, setImage] = useState([])
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
        const fetchNote = async() => {
            const data = await api.noteGet(id);
            return data;
        }

        const fetchNoteImage = async() => {
            const data = await api.noteImageGet(id);
            return data;
        }

        const getNote = async() => {
            const noteFromServer = await fetchNote();
            setNote(noteFromServer.data[0])
        }

        const getNoteImage = async() => {
            const image = await fetchNoteImage();

            if (image !== undefined) {
                setImage(image.data[0]);
            } else {
                setImage([]);
            }
        }

        getNote();
        getNoteImage();
    }, [id])

    const linkUser = () => {
        navigate(`/profile/${note.user.username}`);
    }

    const linkReport = () => {
        navigate(`/report/create/note/${id}`);
    }

    return (
        <Box>
            <Navbar />
            
            { note !== undefined ? 
                <Box mt={5} mx={10}>
                    <Grid container>
                        <Grid item xs={8.5}>
                            <Box borderRadius={10} sx={{backgroundColor: 'white', height: '820px', width: '95%'}}>
                                <Grid container height='100%'>
                                    <Grid item xs={4}>
                                        <Box mt={5}>
                                            <img className='note-page-image' src={ image? image.image_url : '0'} alt='img' />
                                        </Box>

                                        <Box mt={3}>
                                            <Box fontSize={20} fontWeight='bold' mx={8} maxWidth='260px'>
                                                <span className='note-user-link' onClick={linkUser}>{note.user.username}</span>
                                            </Box>

                                            <Box mt={2} fontSize={16} mx={8} color='darkgrey'>
                                                {note.category.name}
                                            </Box>

                                            <Box mt={2} fontSize={16} mx={8}>
                                                于 {note.created_date} 分享
                                            </Box>
                                        </Box>

                                        <Box mt={3}>
                                            <Box>
                                                <NoteFavLike noteUserId={note.user.id} />
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Box mt={5} ml={1} mr={4} display='flex' alignItems='center'>
                                            <Box display='flex' fontSize={22} width='80%' fontWeight='bold'>
                                                {note.title}
                                            </Box>

                                            <Box ml={4}>
                                                <ThemeProvider theme={theme}>
                                                    <Button onClick={linkReport} variant="contained" size='small' height={5} color='pink' style={{ borderRadius: 13, width: 100 }}> 
                                                        <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>举报</Box>
                                                    </Button>
                                                </ThemeProvider>
                                            </Box>
                                        </Box>

                                        <Box mt={4} mr={4} sx={{borderTop: '1px solid black'}}>
                                        </Box>
                                        
                                        <Box className='note-description-text' display='flex' mt={4} ml={1} mr={5} alignItems='center' textAlign='left'>
                                            {note.description}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item xs={3.5}>
                            <NoteComments />
                        </Grid>
                    </Grid>
                </Box> : ''
            }
        </Box>
    )
}

export default NoteViewPage