import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import '../Pages/GeneralUser.css'
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie'

const NoteComment = ({ comment }) => {
    let date = comment.created_date.split('T')
    let time = date[1].split('.')
    const [dialog, setDialog] = useState(false)
    const [dialog2, setDialog2] = useState(false)
    const navigate = useNavigate();
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
            }
        }
    });

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const toggleDialog2 = () => {
        setDialog2(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }
    
    const closeDialog2 = () => {
        setDialog2(false);
    }

    const linkReport = () => {
        navigate(`/report/create/comment/${comment.id}`);
    }

    const commentDelete = async() => {
        const data = await api.commentDelete(comment.id);

        if (data.errorCode === 0) {
            window.location.reload(false)
        }
    }

    return (
        <Box mb={2.5} height={60} maxHeight={60} width={445} maxWidth={445}>
            <Box mx={2} mt={1} display='flex' alignItems='center'>
                <Box fontSize={16} fontWeight='bold'>
                    { comment.user.username }
                </Box>
                
                <Box ml={2} fontSize={14}>
                    { date[0] }
                </Box>

                <Box ml={1} fontSize={14}>
                    { time[0] }
                </Box>

                { comment.user.username !== username ?
                    <Box onClick={linkReport} ml={1.5} pt={0.5} sx={{cursor: 'pointer'}}>
                        <ReportGmailerrorredRoundedIcon color='error' />
                    </Box> :
                    <Box onClick={toggleDialog2} ml={1.5} pt={0.5} sx={{cursor: 'pointer'}}>
                        <DeleteOutlineIcon color='error' />
                    </Box>
                }
            </Box>
            
            <Box display='flex'>
                <Box className='note-comment-text' mx={2} width={380} display='flex' mt={1.5} fontSize={15}>
                    { comment.description }
                </Box>

                { comment.description.length > 25 ? 
                    <Box mt={1.2} ml={0.8}>
                        <ThemeProvider theme={theme}>
                            <MoreHorizIcon onClick={toggleDialog} color='gold' sx={{cursor: 'pointer'}} />
                        </ThemeProvider>
                    </Box> : ''
                }
            </Box>

            <Dialog
                fullWidth={true}
                open={dialog}
                maxWidth='sm'
                onClose={closeDialog}>
                <DialogTitle id="alert-dialog-title" fontWeight='bold'>
                    { comment.user.username } 的留言
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { comment.description }
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} autoFocus>
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={dialog2}
                maxWidth='sm'
                onClose={closeDialog2}>
                <DialogTitle id="alert-dialog-title">
                    {"删除留言注意事项"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        你是否确定要删除此留言？
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog2}>不了</Button>
                    <Button onClick={commentDelete} autoFocus>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default NoteComment