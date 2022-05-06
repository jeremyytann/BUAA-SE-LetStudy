import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState, useEffect } from 'react'
import React from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import NoteComments from '../Components/NoteComments'
import api from '../Api/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './GeneralUser.css'
import NoteFavLike from '../Components/NoteFavLike'
import Cookies from 'js-cookie'

const NoteViewPage = () => {
    const { id } = useParams();
    const [note, setNote] = useState()
    const [image, setImage] = useState([])
    const navigate = useNavigate();
    const [dialog, setDialog] = useState(false)
    const [error, setError] = useState(0);
    let username = Cookies.get('username')

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

            if (data.errorCode === 0) {
                setNote(data.data[0]);
            } else if (data.errorCode === 404) {
                setError(404);
            }
        }

        const fetchNoteImage = async() => {
            const data = await api.noteImageGet(id);
            return data;
        }

        const getNoteImage = async() => {
            const image = await fetchNoteImage();

            if (image !== undefined) {
                setImage(image.data[0]);
            } else {
                setImage([]);
            }
        }

        fetchNote()
        getNoteImage();
    }, [id])
    
    if (error === 404) {
        return <Navigate to='/404' />
    }

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const linkUser = () => {
        navigate(`/profile/${note.user.username}/notes`);
    }

    const linkReport = () => {
        navigate(`/report/create/note/${id}`);
    }

    const linkNoteEdit = () => {
        navigate(`/note/${id}/edit`);
    }

    const noteDelete = async() => {
        const data = await api.noteDelete(id);

        if (data.errorCode === 0) {
            navigate('/notes/all/1');
        }
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
                                                于 {note.created_date.split('T')[0]} 分享
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
                                            { username === note.user.username ? 
                                                <Box display='flex' fontSize={22} width='69%' fontWeight='bold'>
                                                    {note.title}
                                                </Box> :
                                                <Box display='flex' fontSize={22} width='80%' fontWeight='bold'>
                                                    {note.title}
                                                </Box>
                                            }

                                            <Box>
                                                { username === note.user.username ? 
                                                    <Box display='flex'>
                                                        <Box>
                                                            <ThemeProvider theme={theme}>
                                                                <Button onClick={linkNoteEdit} variant="contained" size='small' height={5} color='black' style={{ borderRadius: 13, width: 100 }}> 
                                                                    <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>修改</Box>
                                                                </Button>
                                                            </ThemeProvider>
                                                        </Box>

                                                        <Box ml={2}>
                                                            <ThemeProvider theme={theme}>
                                                                <Button onClick={toggleDialog} variant="contained" size='small' height={5} color='error' style={{ borderRadius: 13, width: 100 }}> 
                                                                    <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>删除</Box>
                                                                </Button>
                                                            </ThemeProvider>
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <Box ml={4}>
                                                        <ThemeProvider theme={theme}>
                                                            <Button onClick={linkReport} variant="contained" size='small' height={5} color='pink' style={{ borderRadius: 13, width: 100 }}> 
                                                                <Box sx={{fontSize: 15, minWidth: '50px', fontWeight: 'bold'}}>举报</Box>
                                                            </Button>
                                                        </ThemeProvider>
                                                    </Box>
                                                }
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

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"删除笔记注意事项"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        你是否确定要删除此笔记？
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>不了</Button>
                    <Button onClick={noteDelete} autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default NoteViewPage