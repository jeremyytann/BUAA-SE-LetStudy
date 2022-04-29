import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import '../Pages/GeneralUser.css'
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NoteComment = ({ comment }) => {
    let date = comment.created_date.split('T')
    let time = date[1].split('.')
    const [dialog, setDialog] = useState(false)
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

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const closeDialog = () => {
        setDialog(false);
    }

    const linkReport = () => {
        navigate(`/report/create/comment/${comment.id}`);
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

                <Box onClick={linkReport} ml={1.5} pt={0.5} sx={{cursor: 'pointer'}}>
                    <ReportGmailerrorredRoundedIcon color='error' />
                </Box>
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
        </Box>
    )
}

export default NoteComment