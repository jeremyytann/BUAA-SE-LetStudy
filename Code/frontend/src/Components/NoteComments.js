import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../Api/api'
import { Box, Button, Pagination, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import NoteComment from './NoteComment';

const NoteComments = () => {
    const { id } = useParams();
    const [comments, setComments] = useState()
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [dialog, setDialog] = useState(false);
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [status, setStatus] = useState(false)

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
        const fetchCommentByPage = async() => {
            const data = await api.commentGetByPage(id, page);

            if (data.data.length > 0) {
                setComments(data.data)
                setMaxPage(data.page)
            }
        }

        fetchCommentByPage();
    }, [id, page, status])

    const createComment = async(e) => {
        e.preventDefault();

        if (comment.length === 0) {
            setError('留言内容不能为空哦');
            setDialog(true);
        } else {
            const tempComment = await api.commentCreate(comment, id);
            
            if (tempComment.errorCode === 0) {
                setStatus(!status)
                setPage(1)
                setComment('')
            }
        }
    }
    
    const clearComment = () => {
        setComment('');
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    return (
        <Box borderRadius={10} sx={{backgroundColor: 'white', height: '820px', width: '100%'}}>
            <Box paddingTop={3.5} sx={{fontSize: '40px', fontWeight: 'bold'}}>
                <small>留言</small>
            </Box>

            <Box mx={3} mt={4} sx={{borderTop: '1px solid black'}}>

            </Box>

            <Box mx={4} mt={4} height='55%'>
                { comments !== undefined ? 
                    <Box>
                        <Box height={400} maxHeight={400}>
                            { comments.map((comment, index) => (
                                <NoteComment key={index} comment={comment} />
                            )) }
                        </Box>
                        
                        <Box mt={2}>
                            { maxPage > 0 ?
                                <ThemeProvider theme={theme}>
                                    <Pagination count={maxPage} color='gold' showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                                </ThemeProvider> : ''
                            }
                        </Box>
                    </Box> : 
                    <Box>
                        <Box pt={25} fontSize={24} fontWeight='bold' color='darkgrey'>
                            此处未有任何留言
                        </Box> 
                    </Box>
                }
            </Box>

            <Box mx={3} mt={3} sx={{borderTop: '1px solid black'}}>

            </Box>
            
            <form onSubmit={createComment}>
                <Box mx={3} mt={3} borderRadius={5}>
                    <textarea 
                        className='create-note-comment'
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        type='text'
                        placeholder='输入留言内容' 
                        maxLength='64' required/>             
                </Box>

                <Box mt={2} mx={4} display='flex'>
                    <Box>
                        <ThemeProvider theme={theme}>
                            <Button onClick={createComment} variant="contained" size="small" color='gold' style={{ borderRadius: 13, width: 100, height: 35 }}> 
                                <Box sx={{fontSize: 18, minWidth: '50px', fontWeight: 'bold'}}>提交</Box>
                            </Button>
                        </ThemeProvider>
                    </Box>
                    
                    <Box ml={2}>
                        <ThemeProvider theme={theme}>
                            <Button onClick={clearComment} variant="contained" size="small" color='black' style={{ borderRadius: 13, width: 100, height: 35 }}> 
                                <Box sx={{fontSize: 18, minWidth: '50px', fontWeight: 'bold'}}>消除</Box>
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </form>

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"数据错误"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>知道了</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default NoteComments