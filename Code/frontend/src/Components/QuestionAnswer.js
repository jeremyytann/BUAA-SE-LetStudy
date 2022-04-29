import React from 'react'
import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import '../Pages/GeneralUser.css'
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const QuestionAnswer = ({ answer }) => {
    let date = answer.created_date.split('T')
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
        navigate(`/report/create/answer/${answer.id}`);
    }

    return (
        <Box mx={2} mb={3} height={60}>
            <Box display='flex' alignItems='center' mx={1}>
                <Box fontWeight='bold'>
                    { answer.user.username }
                </Box>
                
                <Box ml={2} fontSize={14}>
                    { date[0] }
                </Box>

                <Box ml={1} fontSize={14}>
                    { time[0] }
                </Box>

                <Box onClick={linkReport} ml={1.5} pt={0.3} sx={{cursor: 'pointer'}}>
                    <ReportGmailerrorredRoundedIcon color='error' />
                </Box>
            </Box>

            <Box display='flex'>
                <Box mx={1} mt={1} height={25} width={1150} className='answer-description-text' display='flex' textAlign='left'>
                    { answer.description }
                </Box>

                { answer.description.length > 70 ? 
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
                    { answer.user.username } 的回答
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { answer.description }
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

export default QuestionAnswer